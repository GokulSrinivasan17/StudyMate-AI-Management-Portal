const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');

router.use(authenticateToken);
router.use(authorizeRoles('ADMIN', 'TEACHER'));

router.get('/admin-stats', reportController.getAdminDashboardStats);
router.get('/risk-analysis', reportController.getRiskAnalysisReport);

module.exports = router;
