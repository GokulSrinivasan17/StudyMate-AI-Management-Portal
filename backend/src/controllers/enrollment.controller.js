const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');

const enrollStudent = async (req, res, next) => {
  try {
    const { studentId, courseId } = req.body;

    const existing = await prisma.enrollment.findUnique({
      where: { studentId_courseId: { studentId, courseId } },
    });

    if (existing) {
      return ApiResponse.error(res, 'Student is already enrolled in this course', 400);
    }

    const enrollment = await prisma.enrollment.create({
      data: { studentId, courseId },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        course: true,
      },
    });

    return ApiResponse.success(res, 'Student enrolled successfully', enrollment, 201);
  } catch (error) {
    next(error);
  }
};

const getEnrollmentsByStudent = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: { teacher: { include: { user: { select: { name: true } } } } },
        },
      },
    });

    return ApiResponse.success(res, 'Student enrollments retrieved', enrollments);
  } catch (error) {
    next(error);
  }
};

const dropEnrollment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.enrollment.delete({ where: { id } });
    return ApiResponse.success(res, 'Enrollment dropped successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enrollStudent,
  getEnrollmentsByStudent,
  dropEnrollment,
};
