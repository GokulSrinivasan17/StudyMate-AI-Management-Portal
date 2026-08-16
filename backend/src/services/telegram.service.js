const axios = require('axios');
const env = require('../config/env.config');

const TELEGRAM_API_URL = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}`;

const sendTelegramMessage = async (chatId, messageText) => {
  try {
    if (!env.TELEGRAM_BOT_TOKEN) {
      console.warn('Telegram Token not configured');
      return { success: false, error: 'Telegram Token not configured' };
    }

    // Try HTML mode first for robust rendering
    try {
      const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
      });
      return { success: response.data && response.data.ok, data: response.data };
    } catch (htmlErr) {
      // Fallback without parse_mode if entity parsing fails
      const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
        chat_id: chatId,
        text: messageText,
      });
      return { success: response.data && response.data.ok, data: response.data };
    }
  } catch (error) {
    const errorMsg = error.response?.data?.description || error.message;
    console.error('Failed to send Telegram message:', errorMsg);
    return { success: false, error: errorMsg, botUrl: 'https://t.me/studymateAgent_bot' };
  }
};

const sendStudentRiskAlert = async (chatId, studentName, riskLevel, attendance, cgpa) => {
  const message = `<b>🚨 SmartEdu AI Risk Alert</b>\n\n<b>Student:</b> ${studentName}\n<b>Risk Level:</b> ${riskLevel}\n<b>Attendance Rate:</b> ${attendance}%\n<b>Current CGPA:</b> ${cgpa}\n\n<i>Please review your academic dashboard & schedule counseling.</i>`;
  return sendTelegramMessage(chatId, message);
};

const sendExamScheduleTelegram = async (chatId, studentName, schedule) => {
  const dailySummary = (schedule.dailyPlan || [])
    .map((item) => `📌 <b>${item.day} (${item.date})</b>: ${item.focusSubject}\n  • ${(item.tasks || []).join('\n  • ')}`)
    .join('\n\n');

  const message = `<b>📅 SmartEdu Gemini AI Exam Schedule</b>\n\n<b>Student:</b> ${studentName}\n<b>Schedule:</b> ${schedule.scheduleTitle}\n\n${dailySummary}\n\n<i>Automated study reminders active via SmartEdu AI & Telegram</i>`;

  return sendTelegramMessage(chatId, message);
};

const sendTelegramBroadcast = async (chatIds = [], messageTitle, messageBody) => {
  const formattedMsg = `<b>📢 ${messageTitle}</b>\n\n${messageBody}\n\n<i>Sent via SmartEdu AI Academic Portal</i>`;
  const results = await Promise.all(
    chatIds.map((chatId) => sendTelegramMessage(chatId, formattedMsg))
  );
  return results.filter((r) => r.success).length;
};

module.exports = {
  sendTelegramMessage,
  sendStudentRiskAlert,
  sendExamScheduleTelegram,
  sendTelegramBroadcast,
};
