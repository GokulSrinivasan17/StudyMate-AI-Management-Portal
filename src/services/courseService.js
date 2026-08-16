import api from './api';
import { mockCourses } from '../data/courses';

export const courseService = {
  getCourses: async () => {
    try {
      const res = await api.get('/courses');
      return res.data;
    } catch {
      return mockCourses;
    }
  },

  getCourseById: async (id) => {
    try {
      const res = await api.get(`/courses/${id}`);
      return res.data;
    } catch {
      return mockCourses.find(c => c.id === id || c.code === id) || mockCourses[0];
    }
  }
};
