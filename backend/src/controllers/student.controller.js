const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');
const { getPaginationParams, formatPaginatedResponse } = require('../utils/pagination.utils');
const { hashPassword } = require('../utils/password.utils');

const getAllStudents = async (req, res, next) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = getPaginationParams(req.query);
    const { department, semester, riskLevel, search } = req.query;

    const where = {};
    if (department) where.department = department;
    if (semester) where.semester = parseInt(semester, 10);
    if (riskLevel) where.riskLevel = riskLevel;
    if (search) {
      where.OR = [
        { rollNo: { contains: search } },
        { user: { name: { contains: search } } },
        { user: { email: { contains: search } } },
      ];
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          user: {
            select: { id: true, name: true, email: true, phone: true, avatar: true, createdAt: true },
          },
        },
      }),
      prisma.student.count({ where }),
    ]);

    return ApiResponse.success(res, 'Students retrieved successfully', formatPaginatedResponse(students, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findFirst({
      where: { OR: [{ id }, { userId: id }] },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true, avatar: true },
        },
        enrollments: {
          include: { course: true },
        },
        academicRecords: true,
        examResults: {
          include: { exam: { include: { course: true } } },
        },
        submissions: {
          include: { assignment: { include: { course: true } } },
        },
      },
    });

    if (!student) {
      return ApiResponse.error(res, 'Student not found', 404);
    }

    return ApiResponse.success(res, 'Student details retrieved successfully', student);
  } catch (error) {
    next(error);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const { email, password, name, rollNo, department, semester, section, batch, parentName, parentPhone, parentEmail } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return ApiResponse.error(res, 'User with this email already exists', 400);
    }

    const hashedPassword = await hashPassword(password);

    const student = await prisma.student.create({
      data: {
        rollNo,
        department,
        semester,
        section,
        batch,
        parentName,
        parentPhone,
        parentEmail,
        user: {
          create: {
            email,
            password: hashedPassword,
            name,
            role: 'STUDENT',
          },
        },
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return ApiResponse.success(res, 'Student created successfully', student, 201);
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const student = await prisma.student.update({
      where: { id },
      data: updateData,
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    return ApiResponse.success(res, 'Student updated successfully', student);
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      return ApiResponse.error(res, 'Student not found', 404);
    }

    await prisma.user.delete({ where: { id: student.userId } });

    return ApiResponse.success(res, 'Student and associated user account deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
