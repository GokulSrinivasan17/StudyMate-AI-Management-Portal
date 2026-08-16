import { mockStudents } from '../data/students';
import { mockAttendance } from '../data/attendance';
import { mockExams } from '../data/exams';
import { mockAiData } from '../data/aiInsights';

export const reportService = {
  generateStudentReport: async (studentId = "STU-2026-001") => {
    const student = mockStudents.find(s => s.id === studentId) || mockStudents[0];
    return {
      generatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      reportTitle: "Student Academic Performance & Intelligence Report",
      institution: "SmartEdu Institute of Technology",
      student,
      attendanceSummary: mockAttendance,
      examSummary: mockExams,
      aiAnalysis: mockAiData.studentScenario
    };
  }
};
