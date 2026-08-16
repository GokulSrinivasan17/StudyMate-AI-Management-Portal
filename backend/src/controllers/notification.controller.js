const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');
const { sendMail } = require('../services/email.service');
const { sendTelegramMessage } = require('../services/telegram.service');

const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return ApiResponse.success(res, 'Notifications retrieved', notifications);
  } catch (error) {
    next(error);
  }
};

const sendNotification = async (req, res, next) => {
  try {
    const { userId, title, message, sendEmail, sendTelegram, telegramChatId } = req.body;
    const targetUserId = userId || req.user.id;

    const notification = await prisma.notification.create({
      data: {
        userId: targetUserId,
        title,
        message,
        type: 'ALERT',
      },
    });

    const recipientUser = await prisma.user.findUnique({ where: { id: targetUserId } });

    let emailSent = false;
    let telegramSent = false;

    if (sendEmail && recipientUser?.email) {
      const emailResult = await sendMail({
        to: recipientUser.email,
        subject: `SmartEdu Portal Notification: ${title}`,
        html: `<h3>${title}</h3><p>${message}</p>`,
      });
      emailSent = emailResult.success;
    }

    if (sendTelegram && telegramChatId) {
      telegramSent = await sendTelegramMessage(telegramChatId, `🔔 *${title}*\n\n${message}`);
    }

    return ApiResponse.success(res, 'Notification sent successfully', {
      notification,
      dispatchStatus: { emailSent, telegramSent },
    }, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyNotifications,
  sendNotification,
};
