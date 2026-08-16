const axios = require('axios');
const env = require('../config/env.config');

const TELEGRAM_API_URL = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}`;

const getOrValidateChatId = async (chatId) => {
  try {
    if (!env.TELEGRAM_BOT_TOKEN) {
      return { valid: false, error: 'Telegram Bot Token not configured on server.' };
    }

    if (!chatId) {
      return { valid: false, error: 'Telegram Chat ID is required.' };
    }

    const response = await axios.get(`${TELEGRAM_API_URL}/getChat`, {
      params: { chat_id: chatId },
    });

    if (response.data && response.data.ok) {
      return { valid: true, chat: response.data.result };
    }

    return { valid: false, error: `Please open ${env.TELEGRAM_BOT_USERNAME} and press START first.` };
  } catch (error) {
    const desc = error.response?.data?.description || error.message;
    console.error(`Telegram getChat validation failed for Chat ID ${chatId}:`, desc);
    return {
      valid: false,
      error: `Please open ${env.TELEGRAM_BOT_USERNAME} on Telegram and press START first.`,
      botUsername: env.TELEGRAM_BOT_USERNAME,
    };
  }
};

const sendTelegramMessage = async (chatId, messageText) => {
  try {
    const validation = await getOrValidateChatId(chatId);
    if (!validation.valid) {
      return { success: false, error: validation.error, botUsername: env.TELEGRAM_BOT_USERNAME };
    }

    try {
      const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
      });
      return { success: response.data && response.data.ok, data: response.data };
    } catch (htmlErr) {
      // Fallback without parse_mode
      const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
        chat_id: chatId,
        text: messageText,
      });
      return { success: response.data && response.data.ok, data: response.data };
    }
  } catch (error) {
    const errorMsg = error.response?.data?.description || error.message;
    console.error('Failed to send Telegram message:', errorMsg);
    return { success: false, error: errorMsg, botUsername: env.TELEGRAM_BOT_USERNAME };
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
  getOrValidateChatId,
  sendTelegramMessage,
  sendStudentRiskAlert,
  sendExamScheduleTelegram,
  sendTelegramBroadcast,
};
