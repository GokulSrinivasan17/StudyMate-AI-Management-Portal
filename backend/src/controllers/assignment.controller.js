const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');
const { getPaginationParams, formatPaginatedResponse } = require('../utils/pagination.utils');

const getAllAssignments = async (req, res, next) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = getPaginationParams(req.query);
    const { courseId } = req.query;

    const where = {};
    if (courseId) where.courseId = courseId;

    const [assignments, total] = await Promise.all([
      prisma.assignment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          course: true,
          _count: { select: { submissions: true } },
        },
      }),
      prisma.assignment.count({ where }),
    ]);

    return ApiResponse.success(res, 'Assignments retrieved successfully', formatPaginatedResponse(assignments, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const createAssignment = async (req, res, next) => {
  try {
    const { title, description, courseId, dueDate, totalMarks, fileUrl } = req.body;

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        courseId,
        dueDate: new Date(dueDate),
        totalMarks,
        fileUrl,
      },
      include: { course: true },
    });

    return ApiResponse.success(res, 'Assignment created successfully', assignment, 201);
  } catch (error) {
    next(error);
  }
};

const submitAssignment = async (req, res, next) => {
  try {
    const { assignmentId, content, fileUrl } = req.body;
    const studentId = req.user.student?.id;

    if (!studentId) {
      return ApiResponse.error(res, 'Only students can submit assignments', 403);
    }

    const submission = await prisma.assignmentSubmission.upsert({
      where: {
        assignmentId_studentId: { assignmentId, studentId },
      },
      update: {
        content,
        fileUrl,
        submissionDate: new Date(),
        status: 'SUBMITTED',
      },
      create: {
        assignmentId,
        studentId,
        content,
        fileUrl,
        status: 'SUBMITTED',
      },
    });

    return ApiResponse.success(res, 'Assignment submitted successfully', submission);
  } catch (error) {
    next(error);
  }
};

const gradeSubmission = async (req, res, next) => {
  try {
    const { submissionId } = req.params;
    const { marksObtained, feedback } = req.body;

    const submission = await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        marksObtained,
        feedback,
        status: 'GRADED',
      },
    });

    return ApiResponse.success(res, 'Submission graded successfully', submission);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAssignments,
  createAssignment,
  submitAssignment,
  gradeSubmission,
};
