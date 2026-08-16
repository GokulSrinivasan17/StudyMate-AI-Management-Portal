const axios = require('axios');
const env = require('../config/env.config');

const TELEGRAM_API_URL = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}`;

const sendTelegramMessage = async (chatId, messageText) => {
  try {
    if (!env.TELEGRAM_BOT_TOKEN) {
      console.warn('Telegram Token not configured');
      return false;
    }

    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: chatId,
      text: messageText,
      parse_mode: 'Markdown',
    });

    return response.data && response.data.ok;
  } catch (error) {
    console.error('Failed to send Telegram message:', error.response?.data || error.message);
    return false;
  }
};

const sendStudentRiskAlert = async (chatId, studentName, riskLevel, attendance, cgpa) => {
  const message = `🚨 *SmartEdu AI Risk Alert*

*Student*: ${studentName}
*Risk Level*: ${riskLevel}
*Attendance Rate*: ${attendance}%
*Current CGPA*: ${cgpa}

*Action Required*: Please review your academic dashboard and schedule a counseling session with your faculty advisor immediately.`;

  return sendTelegramMessage(chatId, message);
};

const sendExamScheduleTelegram = async (chatId, studentName, schedule) => {
  const dailySummary = (schedule.dailyPlan || [])
    .map((item) => `📌 *${item.day} (${item.date})*: ${item.focusSubject}\n  • ${(item.tasks || []).join('\n  • ')}`)
    .join('\n\n');

  const message = `📅 *SmartEdu Gemini AI Exam Schedule*

*Student*: ${studentName}
*Schedule*: ${schedule.scheduleTitle}

${dailySummary}

🔔 _Automated study reminders active via SmartEdu AI & Telegram_`;

  return sendTelegramMessage(chatId, message);
};

const sendTelegramBroadcast = async (chatIds = [], messageTitle, messageBody) => {
  const formattedMsg = `📢 *${messageTitle}*\n\n${messageBody}\n\n_Sent via SmartEdu AI Academic Portal_`;
  const results = await Promise.all(
    chatIds.map((chatId) => sendTelegramMessage(chatId, formattedMsg))
  );
  return results.filter(Boolean).length;
};

module.exports = {
  sendTelegramMessage,
  sendStudentRiskAlert,
  sendExamScheduleTelegram,
  sendTelegramBroadcast,
};
