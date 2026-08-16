import api from './api';
import { mockExams } from '../data/exams';

export const examService = {
  getExams: async () => {
    try {
      const res = await api.get('/exams');
      return res.data;
    } catch {
      return mockExams;
    }
  }
};
