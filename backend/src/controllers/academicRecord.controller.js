const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');

const getStudentAcademicRecords = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const records = await prisma.academicRecord.findMany({
      where: { studentId },
      orderBy: { semester: 'asc' },
    });

    return ApiResponse.success(res, 'Academic records retrieved', records);
  } catch (error) {
    next(error);
  }
};

const upsertAcademicRecord = async (req, res, next) => {
  try {
    const { studentId, semester, gpa, creditsEarned, totalCredits, backlogs, remarks } = req.body;

    const record = await prisma.academicRecord.upsert({
      where: { studentId_semester: { studentId, semester } },
      update: { gpa, creditsEarned, totalCredits, backlogs, remarks },
      create: { studentId, semester, gpa, creditsEarned, totalCredits, backlogs, remarks },
    });

    // Update student overall CGPA
    const allRecords = await prisma.academicRecord.findMany({ where: { studentId } });
    const totalGpa = allRecords.reduce((acc, r) => acc + r.gpa, 0);
    const avgCgpa = allRecords.length > 0 ? parseFloat((totalGpa / allRecords.length).toFixed(2)) : gpa;

    await prisma.student.update({
      where: { id: studentId },
      data: { cgpa: avgCgpa },
    });

    return ApiResponse.success(res, 'Academic record updated and CGPA recalculated', record);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentAcademicRecords,
  upsertAcademicRecord,
};
