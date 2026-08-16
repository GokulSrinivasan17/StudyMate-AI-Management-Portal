const prisma = require('../config/prisma.config');
const ApiResponse = require('../utils/apiResponse.utils');

const getAdminDashboardStats = async (req, res, next) => {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalCourses,
      totalClasses,
      highRiskStudents,
      mediumRiskStudents,
      lowRiskStudents,
      recentAiInsights,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.course.count(),
      prisma.class.count(),
      prisma.student.count({ where: { riskLevel: 'HIGH' } }),
      prisma.student.count({ where: { riskLevel: 'MEDIUM' } }),
      prisma.student.count({ where: { riskLevel: 'LOW' } }),
      prisma.aiInsight.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    ]);

    const avgAttendance = await prisma.student.aggregate({
      _avg: { attendanceRate: true, cgpa: true },
    });

    return ApiResponse.success(res, 'Admin dashboard overview statistics', {
      counts: {
        students: totalStudents,
        teachers: totalTeachers,
        courses: totalCourses,
        classes: totalClasses,
      },
      riskDistribution: {
        high: highRiskStudents,
        medium: mediumRiskStudents,
        low: lowRiskStudents,
      },
      averages: {
        attendanceRate: parseFloat((avgAttendance._avg.attendanceRate || 0).toFixed(1)),
        cgpa: parseFloat((avgAttendance._avg.cgpa || 0).toFixed(2)),
      },
      recentAiInsights,
    });
  } catch (error) {
    next(error);
  }
};

const getRiskAnalysisReport = async (req, res, next) => {
  try {
    const riskStudents = await prisma.student.findMany({
      where: {
        OR: [{ riskLevel: 'HIGH' }, { riskLevel: 'MEDIUM' }],
      },
      include: {
        user: { select: { name: true, email: true, phone: true } },
        academicRecords: true,
      },
      orderBy: { attendanceRate: 'asc' },
    });

    return ApiResponse.success(res, 'Risk analysis report generated', {
      totalFlagged: riskStudents.length,
      students: riskStudents,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminDashboardStats,
  getRiskAnalysisReport,
};
