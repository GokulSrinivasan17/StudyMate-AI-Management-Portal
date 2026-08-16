import React from 'react';
import { Award, BookOpen, BarChart2, TrendingUp, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const StudentResults = () => {
  const resultData = [
    { subject: 'Data Structures', internal: 22, assignment: 18, exam: 38, total: 78, grade: 'B+' },
    { subject: 'DBMS', internal: 24, assignment: 18, exam: 39, total: 81, grade: 'A' },
    { subject: 'Engineering Maths', internal: 16, assignment: 10, exam: 36, total: 62, grade: 'C' },
    { subject: 'Java Programming', internal: 23, assignment: 19, exam: 42, total: 84, grade: 'A' },
    { subject: 'AI & ML', internal: 25, assignment: 19, exam: 42, total: 86, grade: 'A+' }
  ];

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Academic Semester Results</h1>
        <p className="text-xs text-slate-500 font-medium">Internal assessment, assignment, and final examination marks breakdown</p>
      </div>

      {/* GPA Header Summary */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-slate-50 p-4 rounded-2xl">
          <span className="text-[10px] font-bold uppercase text-slate-400">Current Semester GPA</span>
          <p className="font-extrabold text-indigo-600 text-2xl mt-0.5">8.15</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl">
          <span className="text-[10px] font-bold uppercase text-slate-400">Overall CGPA</span>
          <p className="font-extrabold text-slate-900 text-2xl mt-0.5">8.04</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl">
          <span className="text-[10px] font-bold uppercase text-slate-400">Credits Earned</span>
          <p className="font-extrabold text-slate-900 text-2xl mt-0.5">22 / 22</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl">
          <span className="text-[10px] font-bold uppercase text-slate-400">Academic Standing</span>
          <p className="font-extrabold text-emerald-600 text-sm mt-1">First Class with Distinction</p>
        </div>
      </div>

      {/* Subject Marks Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Semester IV Marks Matrix</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Subject Name</th>
                <th className="p-4">Internal (25)</th>
                <th className="p-4">Assignment (20)</th>
                <th className="p-4">End Exam (55)</th>
                <th className="p-4">Total (100)</th>
                <th className="p-4">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {resultData.map((res, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{res.subject}</td>
                  <td className="p-4 font-mono">{res.internal}</td>
                  <td className="p-4 font-mono">{res.assignment}</td>
                  <td className="p-4 font-mono">{res.exam}</td>
                  <td className="p-4 font-bold font-mono text-slate-900">{res.total}%</td>
                  <td className="p-4 font-bold">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] ${
                      res.grade.includes('A') ? 'bg-emerald-100 text-emerald-800' :
                      res.grade.includes('B') ? 'bg-indigo-100 text-indigo-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      Grade {res.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
