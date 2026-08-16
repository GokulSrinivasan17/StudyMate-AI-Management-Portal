const axios = require('axios');
const env = require('../config/env.config');

const TELEGRAM_API_URL = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}`;

const getOrValidateChatId = async (chatId) => {
  const targetId = chatId || '6640386706';
  try {
    if (!env.TELEGRAM_BOT_TOKEN) {
      console.error('❌ [TELEGRAM ERROR] Missing TELEGRAM_BOT_TOKEN in environment.');
      return { valid: false, error: 'Telegram Bot Token not configured on server.' };
    }

    console.log(`📱 [TELEGRAM] Validating Chat ID ${targetId} via getChat API...`);
    const response = await axios.get(`${TELEGRAM_API_URL}/getChat`, {
      params: { chat_id: targetId },
    });

    if (response.data && response.data.ok) {
      console.log(`✅ [TELEGRAM] getChat Success for ${targetId} (${response.data.result.first_name || 'User'})`);
      return { valid: true, chatId: targetId, chat: response.data.result };
    }

    return { valid: false, error: `Please open ${env.TELEGRAM_BOT_USERNAME} on Telegram and press START first.` };
  } catch (error) {
    const desc = error.response?.data?.description || error.message;
    console.error(`❌ [TELEGRAM ERROR] getChat failed for Chat ID ${targetId}:`, desc);
    return {
      valid: false,
      error: `Please open ${env.TELEGRAM_BOT_USERNAME} on Telegram and press START first.`,
      botUsername: env.TELEGRAM_BOT_USERNAME,
    };
  }
};

const sendTelegramMessage = async (targetChatId, messageText) => {
  const chatId = targetChatId || '6640386706';

  // 1. Validate chat ID first using getChat
  const validation = await getOrValidateChatId(chatId);
  if (!validation.valid) {
    console.error(`❌ [TELEGRAM ERROR] Validation failed: ${validation.error}`);
    return { success: false, error: validation.error, botUsername: env.TELEGRAM_BOT_USERNAME };
  }

  console.log(`📱 [TELEGRAM] Sending message to Chat ID ${chatId}...`);

  try {
    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: chatId,
      text: messageText,
      parse_mode: 'HTML',
    });

    const isOk = response.data && response.data.ok;
    const msgId = response.data?.result?.message_id;

    if (isOk) {
      console.log(`✅ [TELEGRAM SUCCESS] Message delivered! Message ID: ${msgId}, Chat ID: ${chatId}`);
      return {
        success: true,
        messageId: msgId,
        chatId,
        data: response.data,
      };
    } else {
      console.error(`❌ [TELEGRAM ERROR] API returned ok=false:`, response.data);
      return {
        success: false,
        error: response.data?.description || 'Telegram API delivery failed.',
      };
    }
  } catch (error) {
    const desc = error.response?.data?.description || error.message;
    console.error(`❌ [TELEGRAM ERROR] sendMessage API failed:`, desc);
    return {
      success: false,
      error: desc,
      botUsername: env.TELEGRAM_BOT_USERNAME,
    };
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
