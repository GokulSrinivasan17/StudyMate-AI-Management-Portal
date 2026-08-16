import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { BookOpen, Plus, Users, Star } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    adminService.getCourses().then(data => setCourses(data));
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Institutional Course Catalog</h1>
          <p className="text-xs text-slate-500 font-medium">All department offerings, credit allocations, and assigned lead faculty</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
            <tr>
              <th className="p-4">Course Name</th>
              <th className="p-4">Code</th>
              <th className="p-4">Department</th>
              <th className="p-4">Lead Faculty</th>
              <th className="p-4">Credits</th>
              <th className="p-4">Students</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {courses.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{c.title}</td>
                <td className="p-4 font-mono">{c.code}</td>
                <td className="p-4 text-slate-500">{c.department}</td>
                <td className="p-4 font-semibold">{c.teacher}</td>
                <td className="p-4 font-bold">{c.credits}</td>
                <td className="p-4 font-bold">{c.studentsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
