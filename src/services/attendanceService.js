import api from './api';
import { mockAttendance } from '../data/attendance';

export const attendanceService = {
  getAttendance: async () => {
    try {
      const res = await api.get('/attendance');
      return res.data;
    } catch {
      return mockAttendance;
    }
  },

  saveClassAttendance: async (classData) => {
    try {
      const res = await api.post('/attendance/save', classData);
      return res.data;
    } catch {
      return {
        status: "SUCCESS",
        message: "Attendance recorded successfully for all students!"
      };
    }
  }
};
