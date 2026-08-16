const cron = require('node-cron');
const prisma = require('../config/prisma.config');
const { sendExamScheduleEmail } = require('../services/email.service');
const { sendExamScheduleTelegram } = require('../services/telegram.service');
const { generateExamStudySchedule } = require('../services/gemini.service');

const runDailyStudyReminders = async () => {
  console.log('⏰ [CRON] Starting Daily Exam Study Reminder Job...');
  try {
    const students = await prisma.student.findMany({
      include: {
        user: true,
        enrollments: { include: { course: true } },
      },
    });

    const upcomingExams = await prisma.examination.findMany({
      include: { course: true },
      take: 5,
    });

    let successCount = 0;
    for (const student of students) {
      if (!student.user?.email) continue;

      try {
        const schedule = await generateExamStudySchedule(student, upcomingExams);

        // Daily email reminder
        await sendExamScheduleEmail(student.user.email, student.user.name, schedule);
        successCount++;
      } catch (err) {
        console.error(`[CRON] Failed to dispatch daily reminder for student ${student.id}:`, err.message);
      }
    }

    console.log(`⏰ [CRON] Daily Study Reminder Job completed. Dispatched to ${successCount} students.`);
  } catch (error) {
    console.error('[CRON] Daily Study Reminder Job failed:', error.message);
  }
};

const startReminderCron = () => {
  // Schedule to run every morning at 7:00 AM server time
  cron.schedule('0 7 * * *', () => {
    runDailyStudyReminders();
  });
  console.log('✅ Daily Study Reminder Cron Job initialized (0 7 * * *).');
};

module.exports = {
  startReminderCron,
  runDailyStudyReminders,
};
