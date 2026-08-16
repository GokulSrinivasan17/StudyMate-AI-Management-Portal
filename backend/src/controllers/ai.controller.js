const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');
const {
  generateStudentInsights,
  generateStudentRecommendations,
  generateTeacherInsights,
  askStudentAssistant,
} = require('../services/gemini.service');

const getStudentAiAnalysis = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.user.student?.id;

    if (!studentId) {
      return ApiResponse.error(res, 'Student ID is required', 400);
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: { select: { name: true, email: true } },
        academicRecords: true,
        examResults: true,
        submissions: true,
      },
    });

    if (!student) {
      return ApiResponse.error(res, 'Student not found', 404);
    }

    const insights = await generateStudentInsights(student);
    const recommendations = await generateStudentRecommendations(student);

    // Save insight into DB
    await prisma.aiInsight.create({
      data: {
        userId: req.user.id,
        studentId: student.id,
        insightType: 'RISK_ALERT',
        title: `AI Risk Assessment - ${student.user.name}`,
        summary: insights.summary,
        actionItems: JSON.stringify(insights.actionItems),
        riskScore: insights.riskScore,
        rawDataJson: JSON.stringify({ insights, recommendations }),
      },
    });

    return ApiResponse.success(res, 'AI student analysis generated successfully', {
      studentName: student.user.name,
      rollNo: student.rollNo,
      cgpa: student.cgpa,
      attendanceRate: student.attendanceRate,
      insights,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
};

const getTeacherClassAiAnalysis = async (req, res, next) => {
  try {
    const { classId } = req.params;

    const classRecord = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        course: true,
        attendances: true,
      },
    });

    if (!classRecord) {
      return ApiResponse.error(res, 'Class not found', 404);
    }

    const highRiskCount = await prisma.student.count({
      where: { riskLevel: 'HIGH' },
    });

    const analysis = await generateTeacherInsights({
      className: classRecord.name,
      course: classRecord.course.name,
      atRiskCount: highRiskCount,
    });

    return ApiResponse.success(res, 'Teacher AI class analysis generated', analysis);
  } catch (error) {
    next(error);
  }
};

const chatWithAssistant = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const context = `User Role: ${req.user.role}, Name: ${req.user.name}`;

    const reply = await askStudentAssistant(prompt, context);

    return ApiResponse.success(res, 'AI assistant response generated', {
      prompt,
      reply,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentAiAnalysis,
  getTeacherClassAiAnalysis,
  chatWithAssistant,
};
