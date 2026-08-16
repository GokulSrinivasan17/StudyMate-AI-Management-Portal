const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const studentRoutes = require('./student.routes');
const teacherRoutes = require('./teacher.routes');
const courseRoutes = require('./course.routes');
const classRoutes = require('./class.routes');
const enrollmentRoutes = require('./enrollment.routes');
const assignmentRoutes = require('./assignment.routes');
const attendanceRoutes = require('./attendance.routes');
const examRoutes = require('./exam.routes');
const academicRecordRoutes = require('./academicRecord.routes');
const aiRoutes = require('./ai.routes');
const reportRoutes = require('./report.routes');
const notificationRoutes = require('./notification.routes');

router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/courses', courseRoutes);
router.use('/classes', classRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/exams', examRoutes);
router.use('/academic-records', academicRecordRoutes);
router.use('/ai', aiRoutes);
router.use('/reports', reportRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
