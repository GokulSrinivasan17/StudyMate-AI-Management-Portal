const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');
const { getPaginationParams, formatPaginatedResponse } = require('../utils/pagination.utils');
const { hashPassword } = require('../utils/password.utils');

const getAllTeachers = async (req, res, next) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = getPaginationParams(req.query);
    const { department, search } = req.query;

    const where = {};
    if (department) where.department = department;
    if (search) {
      where.OR = [
        { employeeId: { contains: search } },
        { user: { name: { contains: search } } },
        { user: { email: { contains: search } } },
      ];
    }

    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          user: {
            select: { id: true, name: true, email: true, phone: true, avatar: true },
          },
          courses: true,
        },
      }),
      prisma.teacher.count({ where }),
    ]);

    return ApiResponse.success(res, 'Teachers retrieved successfully', formatPaginatedResponse(teachers, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getTeacherById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const teacher = await prisma.teacher.findFirst({
      where: { OR: [{ id }, { userId: id }] },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true, avatar: true },
        },
        courses: {
          include: {
            classes: true,
            assignments: true,
          },
        },
        classes: true,
      },
    });

    if (!teacher) {
      return ApiResponse.error(res, 'Teacher not found', 404);
    }

    return ApiResponse.success(res, 'Teacher details retrieved successfully', teacher);
  } catch (error) {
    next(error);
  }
};

const createTeacher = async (req, res, next) => {
  try {
    const { email, password, name, employeeId, department, qualification, designation, specialization } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return ApiResponse.error(res, 'User with this email already exists', 400);
    }

    const hashedPassword = await hashPassword(password);

    const teacher = await prisma.teacher.create({
      data: {
        employeeId,
        department,
        qualification,
        designation,
        specialization,
        user: {
          create: {
            email,
            password: hashedPassword,
            name,
            role: 'TEACHER',
          },
        },
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    return ApiResponse.success(res, 'Teacher created successfully', teacher, 201);
  } catch (error) {
    next(error);
  }
};

const updateTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const teacher = await prisma.teacher.update({
      where: { id },
      data: updateData,
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    return ApiResponse.success(res, 'Teacher updated successfully', teacher);
  } catch (error) {
    next(error);
  }
};

const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;

    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher) {
      return ApiResponse.error(res, 'Teacher not found', 404);
    }

    await prisma.user.delete({ where: { id: teacher.userId } });

    return ApiResponse.success(res, 'Teacher account deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
