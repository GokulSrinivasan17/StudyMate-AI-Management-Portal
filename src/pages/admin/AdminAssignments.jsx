import React, { useState, useEffect } from 'react';
import { assignmentService } from '../../services/assignmentService';

export const AdminAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    assignmentService.getAssignments().then(data => setAssignments(data));
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Assignments Oversight</h1>
        <p className="text-xs text-slate-500 font-medium">Institution-wide assignment submission tracking & completion rates</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Assignment Title</th>
              <th className="p-4">Course</th>
              <th className="p-4">Instructor</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {assignments.map(a => (
              <tr key={a.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{a.title}</td>
                <td className="p-4 text-slate-500">{a.courseName}</td>
                <td className="p-4 font-semibold">{a.teacher}</td>
                <td className="p-4 font-mono">{a.dueDate}</td>
                <td className="p-4 font-bold text-emerald-600">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
