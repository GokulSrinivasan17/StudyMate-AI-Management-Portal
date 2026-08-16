import api from './api';
import { mockStudents } from '../data/students';
import { mockTeachers } from '../data/teachers';
import { mockCourses } from '../data/courses';
import { mockAssignments } from '../data/assignments';
import { mockExams } from '../data/exams';
import { mockAiData } from '../data/aiInsights';

export const adminService = {
  getDashboard: async () => {
    try {
      const res = await api.get('/admin/dashboard');
      return res.data;
    } catch {
      return {
        stats: {
          totalStudents: 1250,
          totalTeachers: 48,
          totalCourses: 32,
          totalClasses: 40,
          totalAssignments: 180,
          totalExams: 64,
          atRiskStudents: 14,
          avgInstitutionPerformance: '78.4%'
        },
        riskDistribution: [
          { name: 'Low Risk', value: 1198, color: '#10b981' },
          { name: 'Medium Risk', value: 38, color: '#f59e0b' },
          { name: 'High Risk', value: 10, color: '#ef4444' },
          { name: 'Critical Risk', value: 4, color: '#991b1b' }
        ],
        recentAiMonitoring: mockAiData.adminAiMonitoring
      };
    }
  },

  getStudents: async () => {
    try {
      const res = await api.get('/admin/students');
      return res.data;
    } catch {
      return mockStudents;
    }
  },

  getTeachers: async () => {
    try {
      const res = await api.get('/admin/teachers');
      return res.data;
    } catch {
      return mockTeachers;
    }
  },

  getCourses: async () => {
    try {
      const res = await api.get('/admin/courses');
      return res.data;
    } catch {
      return mockCourses;
    }
  },

  getAiMonitoring: async () => {
    try {
      const res = await api.get('/admin/ai-monitoring');
      return res.data;
    } catch {
      return mockAiData.adminAiMonitoring;
    }
  }
};
