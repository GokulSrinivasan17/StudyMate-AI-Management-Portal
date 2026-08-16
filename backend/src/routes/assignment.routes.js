const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
const { createAssignmentSchema, submitAssignmentSchema, gradeSubmissionSchema } = require('../utils/validation.schemas');

router.use(authenticateToken);

router.get('/', assignmentController.getAllAssignments);
router.post('/', authorizeRoles('ADMIN', 'TEACHER'), validate(createAssignmentSchema), assignmentController.createAssignment);
router.post('/submit', authorizeRoles('STUDENT'), validate(submitAssignmentSchema), assignmentController.submitAssignment);
router.put('/submissions/:submissionId/grade', authorizeRoles('ADMIN', 'TEACHER'), validate(gradeSubmissionSchema), assignmentController.gradeSubmission);

module.exports = router;
