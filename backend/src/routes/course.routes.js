const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
const { createCourseSchema } = require('../utils/validation.schemas');

router.use(authenticateToken);

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', authorizeRoles('ADMIN', 'TEACHER'), validate(createCourseSchema), courseController.createCourse);
router.put('/:id', authorizeRoles('ADMIN', 'TEACHER'), courseController.updateCourse);
router.delete('/:id', authorizeRoles('ADMIN'), courseController.deleteCourse);

module.exports = router;
