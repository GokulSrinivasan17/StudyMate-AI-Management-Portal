import api from './api';
import { mockStudents } from '../data/students';
import { mockCourses } from '../data/courses';
import { mockAssignments } from '../data/assignments';
import { mockAttendance } from '../data/attendance';
import { mockExams } from '../data/exams';
import { mockAiData } from '../data/aiInsights';

export const studentService = {
  getDashboard: async () => {
    try {
      const res = await api.get('/students/dashboard');
      return res.data;
    } catch {
      const student = mockStudents[0];
      return {
        student,
        stats: {
          gpa: student.cgpa,
          attendance: `${student.attendance}%`,
          assignmentCompletion: `${student.assignmentCompletion}%`,
          averageScore: `${student.averageScore}%`
        },
        aiInsightCard: mockAiData.studentScenario,
        enrolledCourses: mockCourses.slice(0, 5),
        recentAssignments: mockAssignments.slice(0, 4)
      };
    }
  },

  getProfile: async () => {
    try {
      const res = await api.get('/students/profile');
      return res.data;
    } catch {
      return mockStudents[0];
    }
  },

  getCourses: async () => {
    try {
      const res = await api.get('/students/courses');
      return res.data;
    } catch {
      return mockCourses;
    }
  },

  getAssignments: async () => {
    try {
      const res = await api.get('/students/assignments');
      return res.data;
    } catch {
      return mockAssignments;
    }
  },

  getAttendance: async () => {
    try {
      const res = await api.get('/students/attendance');
      return res.data;
    } catch {
      return mockAttendance;
    }
  },

  getExams: async () => {
    try {
      const res = await api.get('/students/exams');
      return res.data;
    } catch {
      return mockExams;
    }
  }
};
