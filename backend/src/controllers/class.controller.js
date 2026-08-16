const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');
const { getPaginationParams, formatPaginatedResponse } = require('../utils/pagination.utils');

const getAllClasses = async (req, res, next) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = getPaginationParams(req.query);
    const { department, semester, courseId } = req.query;

    const where = {};
    if (department) where.department = department;
    if (semester) where.semester = parseInt(semester, 10);
    if (courseId) where.courseId = courseId;

    const [classes, total] = await Promise.all([
      prisma.class.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          course: true,
          teacher: {
            include: { user: { select: { name: true, email: true } } },
          },
        },
      }),
      prisma.class.count({ where }),
    ]);

    return ApiResponse.success(res, 'Classes retrieved successfully', formatPaginatedResponse(classes, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const getClassById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const classRecord = await prisma.class.findUnique({
      where: { id },
      include: {
        course: true,
        teacher: { include: { user: { select: { name: true, email: true } } } },
        attendances: {
          include: { student: { include: { user: { select: { name: true, rollNo: true } } } } },
        },
      },
    });

    if (!classRecord) {
      return ApiResponse.error(res, 'Class not found', 404);
    }

    return ApiResponse.success(res, 'Class details retrieved', classRecord);
  } catch (error) {
    next(error);
  }
};

const createClass = async (req, res, next) => {
  try {
    const classRecord = await prisma.class.create({
      data: req.body,
      include: { course: true },
    });

    return ApiResponse.success(res, 'Class created successfully', classRecord, 201);
  } catch (error) {
    next(error);
  }
};

const updateClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const classRecord = await prisma.class.update({
      where: { id },
      data: req.body,
    });

    return ApiResponse.success(res, 'Class updated successfully', classRecord);
  } catch (error) {
    next(error);
  }
};

const deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.class.delete({ where: { id } });
    return ApiResponse.success(res, 'Class deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
