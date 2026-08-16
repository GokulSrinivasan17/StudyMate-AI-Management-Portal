const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
const { createTeacherSchema } = require('../utils/validation.schemas');

router.use(authenticateToken);

router.get('/', authorizeRoles('ADMIN', 'TEACHER'), teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);
router.post('/', authorizeRoles('ADMIN'), validate(createTeacherSchema), teacherController.createTeacher);
router.put('/:id', authorizeRoles('ADMIN', 'TEACHER'), teacherController.updateTeacher);
router.delete('/:id', authorizeRoles('ADMIN'), teacherController.deleteTeacher);

module.exports = router;
