const express = require('express');
const router = express.Router();
const academicRecordController = require('../controllers/academicRecord.controller');
const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');

router.use(authenticateToken);

router.get('/student/:studentId', academicRecordController.getStudentAcademicRecords);
router.post('/upsert', authorizeRoles('ADMIN', 'TEACHER'), academicRecordController.upsertAcademicRecord);

module.exports = router;
