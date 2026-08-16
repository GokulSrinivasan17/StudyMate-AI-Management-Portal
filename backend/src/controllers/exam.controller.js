const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');
const { getPaginationParams, formatPaginatedResponse } = require('../utils/pagination.utils');

const getAllExams = async (req, res, next) => {
  try {
    const { page, limit, skip, sortBy, sortOrder } = getPaginationParams(req.query);
    const { courseId } = req.query;

    const where = {};
    if (courseId) where.courseId = courseId;

    const [exams, total] = await Promise.all([
      prisma.examination.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { course: true },
      }),
      prisma.examination.count({ where }),
    ]);

    return ApiResponse.success(res, 'Examinations retrieved successfully', formatPaginatedResponse(exams, total, page, limit));
  } catch (error) {
    next(error);
  }
};

const createExam = async (req, res, next) => {
  try {
    const { title, courseId, examDate, examType, maxMarks, roomNo } = req.body;

    const exam = await prisma.examination.create({
      data: {
        title,
        courseId,
        examDate: new Date(examDate),
        examType,
        maxMarks,
        roomNo,
      },
      include: { course: true },
    });

    return ApiResponse.success(res, 'Exam created successfully', exam, 201);
  } catch (error) {
    next(error);
  }
};

const submitExamResults = async (req, res, next) => {
  try {
    const { examId, results } = req.body;

    const savedResults = await prisma.$transaction(
      results.map((item) =>
        prisma.examResult.upsert({
          where: {
            examId_studentId: { examId, studentId: item.studentId },
          },
          update: {
            marksObtained: item.marksObtained,
            grade: item.grade || (item.marksObtained >= 90 ? 'A+' : item.marksObtained >= 80 ? 'A' : item.marksObtained >= 70 ? 'B' : 'C'),
            remarks: item.remarks,
          },
          create: {
            examId,
            studentId: item.studentId,
            marksObtained: item.marksObtained,
            grade: item.grade || (item.marksObtained >= 90 ? 'A+' : item.marksObtained >= 80 ? 'A' : item.marksObtained >= 70 ? 'B' : 'C'),
            remarks: item.remarks,
          },
        })
      )
    );

    return ApiResponse.success(res, `Exam results submitted for ${savedResults.length} students`, savedResults);
  } catch (error) {
    next(error);
  }
};

const getStudentExamResults = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const results = await prisma.examResult.findMany({
      where: { studentId },
      include: {
        exam: { include: { course: true } },
      },
    });

    return ApiResponse.success(res, 'Student exam results retrieved', results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllExams,
  createExam,
  submitExamResults,
  getStudentExamResults,
};
