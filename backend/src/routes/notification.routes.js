const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
const { sendNotificationSchema } = require('../utils/validation.schemas');

router.use(authenticateToken);

router.get('/', notificationController.getMyNotifications);
router.post('/send', authorizeRoles('ADMIN', 'TEACHER'), validate(sendNotificationSchema), notificationController.sendNotification);

module.exports = router;
