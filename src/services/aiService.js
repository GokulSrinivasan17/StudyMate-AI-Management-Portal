import api from './api';
import { mockAiData } from '../data/aiInsights';

export const aiService = {
  getRiskAnalysis: async (studentId = "STU-2026-001") => {
    try {
      const res = await api.get(`/ai/risk/${studentId}`);
      return res.data;
    } catch {
      return mockAiData.studentScenario;
    }
  },

  predictPerformance: async (inputs) => {
    try {
      const res = await api.post('/ai/predict', inputs);
      return res.data;
    } catch {
      // Calculate frontend mock math prediction
      const { attendance = 80, targetAttendance = 90, currentScore = 68, studyHours = 4, assignmentEffort = 80 } = inputs;
      
      const attendanceDelta = (targetAttendance - attendance) * 0.3;
      const hoursDelta = (studyHours - 2) * 1.5;
      const effortDelta = (assignmentEffort - 50) * 0.1;
      
      const gain = Math.min(25, Math.max(2, Math.round(attendanceDelta + hoursDelta + effortDelta)));
      const predictedScore = Math.min(98, Math.round(currentScore + gain));
      
      let predictedGrade = 'B+';
      if (predictedScore >= 90) predictedGrade = 'A+';
      else if (predictedScore >= 80) predictedGrade = 'A';
      else if (predictedScore >= 70) predictedGrade = 'B+';
      else if (predictedScore >= 60) predictedGrade = 'B';
      else if (predictedScore >= 50) predictedGrade = 'C';
      else predictedGrade = 'D';

      let riskLevel = 'LOW';
      if (predictedScore < 60) riskLevel = 'HIGH';
      else if (predictedScore < 75) riskLevel = 'MEDIUM';

      return {
        originalScore: currentScore,
        predictedScore,
        gain,
        predictedGrade,
        riskLevel,
        confidence: "95.6%",
        factors: [
          `Attendance improvement to ${targetAttendance}% (+${Math.round(attendanceDelta)}%)`,
          `Weekly dedicated study of ${studyHours} hrs (+${Math.round(hoursDelta)}%)`,
          `Assignment effort score of ${assignmentEffort}/100 (+${Math.round(effortDelta)}%)`
        ]
      };
    }
  },

  sendChatMessage: async (message) => {
    try {
      const res = await api.post('/ai/chat', { message });
      return res.data;
    } catch {
      const query = message.toLowerCase();
      let bestMatch = mockAiData.chatbotKnowledge.find(k => 
        k.questionKeywords.some(kw => query.includes(kw))
      );

      const reply = bestMatch 
        ? bestMatch.response 
        : "SmartEdu AI analyzed your query regarding academic performance. Your current CGPA is 8.04 with 82% overall attendance. To optimize your learning curve, focus on Mathematics Unit 3 Fourier Integrals and submit pending Assignment 4.";

      return {
        reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
  },

  runLiveAnalysis: async () => {
    // Simulated step-by-step AI data execution for live demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "SUCCESS",
          executionTimeMs: 420,
          studentName: "Harish Kolanjiyappan",
          analyzedModules: ["Attendance Records", "Midterm Exams", "Assignment Submissions", "Class Engagement"],
          riskScore: 68,
          riskLevel: "MEDIUM",
          weakSubject: "Advanced Engineering Mathematics",
          primaryFactorsCount: 4,
          recommendation: "Submit Assignment 4 & complete Unit 3 practice problem set before Friday."
        });
      }, 1500);
    });
  }
};
