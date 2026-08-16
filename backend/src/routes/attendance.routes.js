const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const validate = require('../middleware/validate.middleware');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
const { markAttendanceSchema } = require('../utils/validation.schemas');

router.use(authenticateToken);

router.post('/mark', authorizeRoles('ADMIN', 'TEACHER'), validate(markAttendanceSchema), attendanceController.markBulkAttendance);
router.get('/class/:classId', attendanceController.getClassAttendance);
router.get('/student/:studentId', attendanceController.getStudentAttendance);

module.exports = router;
