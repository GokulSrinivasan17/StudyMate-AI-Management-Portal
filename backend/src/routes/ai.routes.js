const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
const { aiPromptSchema } = require('../utils/validation.schemas');

router.use(authenticateToken);

router.get('/student-analysis/:studentId?', aiController.getStudentAiAnalysis);
router.get('/class-analysis/:classId', authorizeRoles('ADMIN', 'TEACHER'), aiController.getTeacherClassAiAnalysis);
router.get('/exam-schedule/:studentId?', aiController.generateExamSchedule);
router.post('/exam-schedule/send-reminders', aiController.sendExamReminders);
router.post('/chat', validate(aiPromptSchema), aiController.chatWithAssistant);

module.exports = router;
