const ApiResponse = require('../utils/apiResponse.utils');
const { sendExamScheduleEmail } = require('../services/email.service');
const { sendExamScheduleTelegram, getOrValidateChatId } = require('../services/telegram.service');

const testEmailNotification = async (req, res, next) => {
  try {
    const { email } = req.body;
    const targetEmail = email || req.user.email;

    if (!targetEmail) {
      return ApiResponse.error(res, 'Target email address required', 400);
    }

    const mockSchedule = {
      scheduleTitle: 'Test AI Exam Revision Plan',
      summary: 'Verification test email sent from SmartEdu Notification Controller.',
      dailyPlan: [
        {
          day: 'Day 1',
          date: '2026-08-18',
          focusSubject: 'Data Structures & Algorithms',
          recommendedDuration: '2 Hours',
          tasks: ['Verify Email Transport', 'Check HTML Layout formatting'],
        },
      ],
    };

    const result = await sendExamScheduleEmail(targetEmail, req.user.name, mockSchedule);

    if (!result.success) {
      return ApiResponse.error(res, result.error || 'Failed to send email, please check the address', 400);
    }

    return ApiResponse.success(res, `Test email sent successfully to ${targetEmail}`, {
      recipient: targetEmail,
      status: result,
    });
  } catch (error) {
    next(error);
  }
};

const testTelegramNotification = async (req, res, next) => {
  try {
    const { telegramChatId } = req.body;

    if (!telegramChatId) {
      return ApiResponse.error(res, 'Telegram Chat ID required', 400);
    }

    const validation = await getOrValidateChatId(telegramChatId);
    if (!validation.valid) {
      return ApiResponse.error(res, validation.error, 400);
    }

    const mockSchedule = {
      scheduleTitle: 'Test AI Exam Revision Plan',
      summary: 'Verification test message sent from SmartEdu Notification Controller.',
      dailyPlan: [
        {
          day: 'Day 1',
          date: '2026-08-18',
          focusSubject: 'Data Structures & Algorithms',
          recommendedDuration: '2 Hours',
          tasks: ['Verify Telegram Bot Dispatch', 'Check Telegram Chat ID'],
        },
      ],
    };

    const result = await sendExamScheduleTelegram(telegramChatId, req.user.name, mockSchedule);

    if (!result.success) {
      return ApiResponse.error(res, result.error || 'Failed to send Telegram message', 400);
    }

    return ApiResponse.success(res, `Test Telegram message sent to Chat ID ${telegramChatId}`, {
      chatId: telegramChatId,
      status: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  testEmailNotification,
  testTelegramNotification,
};
