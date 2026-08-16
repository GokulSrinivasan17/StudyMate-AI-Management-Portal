const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma.config');
const env = require('../config/env.config');
const ApiResponse = require('../utils/apiResponse.utils');
const { hashPassword, comparePassword } = require('../utils/password.utils');
const { sendWelcomeEmail } = require('../services/email.service');

const register = async (req, res, next) => {
  try {
    const { email, password, name, role, phone, department, rollNo, employeeId } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return ApiResponse.error(res, 'User with this email already exists', 400);
    }

    const hashedPassword = await hashPassword(password);
    const userRole = role || 'STUDENT';

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: userRole,
        phone,
      },
    });

    if (userRole === 'STUDENT') {
      const generateRollNo = rollNo || `ROLL-${Date.now().toString().slice(-6)}`;
      await prisma.student.create({
        data: {
          userId: user.id,
          rollNo: generateRollNo,
          department: department || 'Computer Science & Engineering',
        },
      });
    } else if (userRole === 'TEACHER') {
      const generateEmpId = employeeId || `EMP-${Date.now().toString().slice(-6)}`;
      await prisma.teacher.create({
        data: {
          userId: user.id,
          employeeId: generateEmpId,
          department: department || 'Computer Science & Engineering',
        },
      });
    }

    // Send welcome email asynchronously
    sendWelcomeEmail(user.email, user.name, user.role).catch((err) =>
      console.warn('Welcome email error:', err.message)
    );

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      createdAt: user.createdAt,
    };

    return ApiResponse.success(res, 'User registered successfully', { user: userResponse, token }, 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        teacher: true,
      },
    });

    if (!user) {
      return ApiResponse.error(res, 'Invalid email or password', 401);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return ApiResponse.error(res, 'Invalid email or password', 401);
    }

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      student: user.student,
      teacher: user.teacher,
    };

    return ApiResponse.success(res, 'Login successful', { user: userResponse, token });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        student: {
          include: {
            academicRecords: true,
          },
        },
        teacher: true,
      },
    });

    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }

    const { password, ...userWithoutPassword } = user;
    return ApiResponse.success(res, 'Current user retrieved', userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
