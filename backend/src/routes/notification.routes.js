const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.use(authenticateToken);

router.post('/test-email', notificationController.testEmailNotification);
router.post('/test-telegram', notificationController.testTelegramNotification);

module.exports = router;
