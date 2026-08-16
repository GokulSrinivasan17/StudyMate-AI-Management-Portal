const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
const { createEnrollmentSchema } = require('../utils/validation.schemas');

router.use(authenticateToken);

router.post('/', authorizeRoles('ADMIN', 'TEACHER'), validate(createEnrollmentSchema), enrollmentController.enrollStudent);
router.get('/student/:studentId', enrollmentController.getEnrollmentsByStudent);
router.delete('/:id', authorizeRoles('ADMIN'), enrollmentController.dropEnrollment);

module.exports = router;
