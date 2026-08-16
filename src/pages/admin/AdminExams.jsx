import React, { useState, useEffect } from 'react';
import { examService } from '../../services/examService';

export const AdminExams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    examService.getExams().then(data => setExams(data));
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Exams & Assessment Oversight</h1>
        <p className="text-xs text-slate-500 font-medium">Institution examination schedules, pass percentages, and average scores</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Exam Title</th>
              <th className="p-4">Course</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total Marks</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {exams.map(e => (
              <tr key={e.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{e.examTitle}</td>
                <td className="p-4 text-slate-500">{e.courseName}</td>
                <td className="p-4 font-mono">{e.date}</td>
                <td className="p-4 font-bold">{e.totalMarks}</td>
                <td className="p-4 font-bold text-indigo-600">{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
