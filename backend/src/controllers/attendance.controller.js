const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');

const markBulkAttendance = async (req, res, next) => {
  try {
    const { classId, date, attendances } = req.body;
    const attendanceDate = new Date(date);

    const records = await prisma.$transaction(
      attendances.map((item) =>
        prisma.attendance.upsert({
          where: {
            classId_studentId_date: {
              classId,
              studentId: item.studentId,
              date: attendanceDate,
            },
          },
          update: {
            status: item.status,
            remarks: item.remarks,
          },
          create: {
            classId,
            studentId: item.studentId,
            date: attendanceDate,
            status: item.status,
            remarks: item.remarks,
          },
        })
      )
    );

    // Recalculate attendance percentage for all modified students
    const studentIds = [...new Set(attendances.map((a) => a.studentId))];
    for (const sId of studentIds) {
      const allAttendance = await prisma.attendance.findMany({ where: { studentId: sId } });
      const presentCount = allAttendance.filter((a) => a.status === 'PRESENT').length;
      const rate = allAttendance.length > 0 ? (presentCount / allAttendance.length) * 100 : 100.0;
      
      const riskLevel = rate < 75 ? 'HIGH' : rate < 85 ? 'MEDIUM' : 'LOW';
      await prisma.student.update({
        where: { id: sId },
        data: { attendanceRate: parseFloat(rate.toFixed(1)), riskLevel },
      });
    }

    return ApiResponse.success(res, `Bulk attendance marked for ${records.length} students`, records);
  } catch (error) {
    next(error);
  }
};

const getClassAttendance = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const { date } = req.query;

    const where = { classId };
    if (date) where.date = new Date(date);

    const attendances = await prisma.attendance.findMany({
      where,
      include: {
        student: {
          include: { user: { select: { name: true, rollNo: true } } },
        },
      },
      orderBy: { date: 'desc' },
    });

    return ApiResponse.success(res, 'Class attendance retrieved', attendances);
  } catch (error) {
    next(error);
  }
};

const getStudentAttendance = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const attendances = await prisma.attendance.findMany({
      where: { studentId },
      include: { class: { include: { course: true } } },
      orderBy: { date: 'desc' },
    });

    const total = attendances.length;
    const present = attendances.filter((a) => a.status === 'PRESENT').length;
    const rate = total > 0 ? ((present / total) * 100).toFixed(1) : 100.0;

    return ApiResponse.success(res, 'Student attendance history retrieved', {
      rate: parseFloat(rate),
      totalClasses: total,
      presentClasses: present,
      records: attendances,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  markBulkAttendance,
  getClassAttendance,
  getStudentAttendance,
};
