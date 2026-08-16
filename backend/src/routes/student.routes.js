const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken, authorizeRoles, restrictToSelfOrAdmin } = require('../middleware/auth.middleware');
const { createStudentSchema, updateStudentSchema } = require('../utils/validation.schemas');

router.use(authenticateToken);

router.get('/', authorizeRoles('ADMIN', 'TEACHER'), studentController.getAllStudents);
router.get('/:id', restrictToSelfOrAdmin, studentController.getStudentById);
router.post('/', authorizeRoles('ADMIN'), validate(createStudentSchema), studentController.createStudent);
router.put('/:id', restrictToSelfOrAdmin, validate(updateStudentSchema), studentController.updateStudent);
router.delete('/:id', authorizeRoles('ADMIN'), studentController.deleteStudent);

module.exports = router;
