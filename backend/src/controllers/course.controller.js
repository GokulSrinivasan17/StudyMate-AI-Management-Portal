const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');
const { getPaginationParams, formatPaginatedResponse } = require('../utils/pagination.utils');

const getAllCourses = async (req, res, next) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = getPaginationParams(req.query);
    const { department, semester, search } = req.query;

    const where = {};
    if (department) where.department = department;
    if (semester) where.semester = parseInt(semester, 10);
    if (search) {
      where.OR = [
        { code: { contains: search } },
        { name: { contains: search } },
      ];
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          teacher: {
            include: { user: { select: { name: true, email: true } } },
          },
          _count: {
            select: { enrollments: true, assignments: true, classes: true },
          },
        },
      }),
      prisma.course.count({ where }),
    ]);

    return ApiResponse.success(res, 'Courses retrieved successfully', formatPaginatedResponse(courses, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          include: { user: { select: { name: true, email: true } } },
        },
        classes: true,
        assignments: true,
        exams: true,
        enrollments: {
          include: {
            student: {
              include: { user: { select: { name: true, email: true } } },
            },
          },
        },
      },
    });

    if (!course) {
      return ApiResponse.error(res, 'Course not found', 404);
    }

    return ApiResponse.success(res, 'Course details retrieved successfully', course);
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { code, name, department, credits, semester, description, teacherId } = req.body;

    const existingCourse = await prisma.course.findUnique({ where: { code } });
    if (existingCourse) {
      return ApiResponse.error(res, 'Course code already exists', 400);
    }

    const course = await prisma.course.create({
      data: {
        code,
        name,
        department,
        credits,
        semester,
        description,
        teacherId,
      },
    });

    return ApiResponse.success(res, 'Course created successfully', course, 201);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.update({
      where: { id },
      data: req.body,
    });

    return ApiResponse.success(res, 'Course updated successfully', course);
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id } });
    return ApiResponse.success(res, 'Course deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
