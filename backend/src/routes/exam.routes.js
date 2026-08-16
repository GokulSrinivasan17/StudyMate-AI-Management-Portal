const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
const { createExamSchema, submitExamResultsSchema } = require('../utils/validation.schemas');

router.use(authenticateToken);

router.get('/', examController.getAllExams);
router.post('/', authorizeRoles('ADMIN', 'TEACHER'), validate(createExamSchema), examController.createExam);
router.post('/results', authorizeRoles('ADMIN', 'TEACHER'), validate(submitExamResultsSchema), examController.submitExamResults);
router.get('/student/:studentId', examController.getStudentExamResults);

module.exports = router;
