import api from './api';
import { mockTeachers } from '../data/teachers';
import { mockStudents } from '../data/students';
import { mockCourses } from '../data/courses';
import { mockAssignments } from '../data/assignments';
import { mockAiData } from '../data/aiInsights';

export const teacherService = {
  getDashboard: async () => {
    try {
      const res = await api.get('/teacher/dashboard');
      return res.data;
    } catch {
      return {
        teacher: mockTeachers[0],
        stats: {
          totalStudents: 145,
          averageAttendance: '84%',
          averageScore: '76%',
          atRiskStudents: 3,
          pendingAssignments: 14,
          upcomingExams: 2
        },
        studentsAtRisk: mockStudents.filter(s => s.riskLevel === 'HIGH' || s.riskLevel === 'CRITICAL' || s.riskLevel === 'MEDIUM')
      };
    }
  },

  getStudents: async () => {
    try {
      const res = await api.get('/teacher/students');
      return res.data;
    } catch {
      return mockStudents;
    }
  },

  getCourses: async () => {
    try {
      const res = await api.get('/teacher/courses');
      return res.data;
    } catch {
      return mockCourses.filter(c => c.teacherId === 'TCH-2026-001' || c.teacher === 'Dr. Aris Thorne');
    }
  },

  getClasses: async () => {
    try {
      const res = await api.get('/teacher/classes');
      return res.data;
    } catch {
      return [
        { id: "CLS-1", name: "CSE 2nd Year - Sec A", course: "Data Structures & Algorithms", studentsCount: 65, avgAttendance: 86, avgScore: 78, riskCount: 2 },
        { id: "CLS-2", name: "CSE 3rd Year - Sec B", course: "Artificial Intelligence & ML", studentsCount: 80, avgAttendance: 89, avgScore: 82, riskCount: 1 }
      ];
    }
  },

  getAiInsights: async () => {
    try {
      const res = await api.get('/teacher/ai-insights');
      return res.data;
    } catch {
      return {
        summary: {
          totalStudents: 145,
          highRisk: 2,
          mediumRisk: 4,
          lowRisk: 139,
          avgPerformance: 76.5
        },
        attentionStudents: mockStudents.filter(s => s.riskLevel !== 'LOW'),
        interventions: mockAiData.activeInterventions
      };
    }
  }
};
