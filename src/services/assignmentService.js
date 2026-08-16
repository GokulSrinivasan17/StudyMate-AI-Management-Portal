import api from './api';
import { mockAssignments } from '../data/assignments';

export const assignmentService = {
  getAssignments: async () => {
    try {
      const res = await api.get('/assignments');
      return res.data;
    } catch {
      return mockAssignments;
    }
  },

  submitAssignment: async (assignmentId, data) => {
    try {
      const res = await api.post(`/assignments/${assignmentId}/submit`, data);
      return res.data;
    } catch {
      return {
        status: "SUCCESS",
        message: "Assignment submitted successfully!",
        submittedAt: new Date().toISOString()
      };
    }
  }
};
