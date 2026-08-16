import api from './api';
import { mockStudents } from '../data/students';
import { mockTeachers } from '../data/teachers';

export const authService = {
  login: async (email, password, role) => {
    try {
      const response = await api.post('/auth/login', { email, password, role });
      return response.data;
    } catch {
      // Mock Fallback
      let foundUser = null;
      if (role === 'student' || email.includes('student')) {
        foundUser = mockStudents.find(s => s.email.toLowerCase() === email.toLowerCase()) || mockStudents[0];
      } else if (role === 'teacher' || email.includes('teacher')) {
        foundUser = mockTeachers.find(t => t.email.toLowerCase() === email.toLowerCase()) || mockTeachers[0];
      } else if (role === 'admin' || email.includes('admin')) {
        foundUser = {
          id: "ADM-2026-001",
          name: "Dean / System Administrator",
          email: "admin@smartedu.ai",
          role: "admin",
          department: "Office of Academic Affairs",
          college: "SmartEdu Institute of Technology",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        };
      } else {
        foundUser = mockStudents[0];
      }

      const mockResult = {
        token: `mock_jwt_token_${foundUser.id}_${Date.now()}`,
        user: foundUser
      };
      return mockResult;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch {
      const mockUser = {
        id: `STU-2026-${Math.floor(100 + Math.random() * 900)}`,
        name: userData.fullName || userData.name,
        email: userData.email,
        role: userData.role || 'student',
        department: userData.department || 'Computer Science and Engineering',
        college: userData.college || 'SmartEdu Institute of Technology',
        cgpa: 8.0,
        attendance: 85,
        riskLevel: 'LOW',
        riskScore: 20,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      };
      return {
        token: `mock_jwt_token_${mockUser.id}`,
        user: mockUser
      };
    }
  }
};
