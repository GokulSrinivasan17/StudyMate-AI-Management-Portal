const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');
const env = require('../config/env.config');
const {
  generateStudentInsights,
  generateStudentRecommendations,
  generateTeacherInsights,
  generateExamStudySchedule,
  askStudentAssistant,
} = require('../services/gemini.service');
const { sendExamScheduleEmail } = require('../services/email.service');
const { sendExamScheduleTelegram } = require('../services/telegram.service');

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

const generateExamSchedule = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.user.student?.id;

    if (!studentId) {
      return ApiResponse.error(res, 'Student ID required', 400);
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        user: { select: { name: true, email: true } },
        enrollments: { include: { course: true } },
      },
    });

    if (!student) {
      return ApiResponse.error(res, 'Student not found', 404);
    }

    const upcomingExams = await prisma.examination.findMany({
      include: { course: true },
      take: 5,
    });

    const schedule = await generateExamStudySchedule(student, upcomingExams);

    await prisma.aiInsight.create({
      data: {
        userId: req.user.id,
        studentId: student.id,
        insightType: 'EXAM_SCHEDULE',
        title: schedule.scheduleTitle,
        summary: schedule.summary,
        actionItems: JSON.stringify(schedule.reminders),
        rawDataJson: JSON.stringify(schedule),
      },
    });

    return ApiResponse.success(res, 'Gemini AI Exam Schedule generated successfully', {
      studentName: student.user.name,
      schedule,
    });
  } catch (error) {
    next(error);
  }
};

const sendExamReminders = async (req, res, next) => {
  try {
    const { studentId, recipientEmail, telegramChatId, sendEmail, sendTelegram } = req.body;
    const sId = studentId || req.user.student?.id;

    if (!sId) {
      return ApiResponse.error(res, 'Student ID required', 400);
    }

    const student = await prisma.student.findUnique({
      where: { id: sId },
      include: { user: true },
    });

    if (!student) {
      return ApiResponse.error(res, 'Student not found', 404);
    }

    const upcomingExams = await prisma.examination.findMany({
      include: { course: true },
    });

    const schedule = await generateExamStudySchedule(student, upcomingExams);

    let emailResult = { success: false, error: 'Email dispatch skipped by user' };
    let telegramResult = { success: false, error: 'Telegram dispatch skipped by user' };

    const emailTarget = (recipientEmail && recipientEmail.trim()) || student.user.email || 'poovarasan420122@gmail.com';
    const chatTarget = (telegramChatId && telegramChatId.trim()) || '6640386706';

    if (sendEmail !== false && emailTarget) {
      emailResult = await sendExamScheduleEmail(emailTarget, student.user.name, schedule);
    }

    if (sendTelegram !== false && chatTarget) {
      telegramResult = await sendExamScheduleTelegram(chatTarget, student.user.name, schedule);
    }

    return ApiResponse.success(res, `Exam study schedule reminders processed`, {
      studentName: student.user.name,
      recipientEmail: emailTarget,
      telegramChatId: chatTarget,
      emailStatus: {
        sent: Boolean(emailResult.success),
        provider: emailResult.provider || null,
        messageId: emailResult.messageId || null,
        error: emailResult.error || null,
      },
      telegramStatus: {
        sent: Boolean(telegramResult.success),
        messageId: telegramResult.messageId || null,
        chatId: telegramResult.chatId || chatTarget,
        error: telegramResult.error || null,
        botUrl: `https://t.me/${env.TELEGRAM_BOT_USERNAME.replace('@', '')}`,
      },
      scheduleTitle: schedule.scheduleTitle,
    });
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
  generateExamSchedule,
  sendExamReminders,
  chatWithAssistant,
};
