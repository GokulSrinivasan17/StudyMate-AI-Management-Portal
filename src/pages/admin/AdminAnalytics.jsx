import React, { useState } from 'react';
import { Filter, BarChart3, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminAnalytics = () => {
  const [department, setDepartment] = useState('All');
  const [semester, setSemester] = useState('All');

  const deptData = [
    { dept: 'CSE', gpa: 8.2, attendance: 86, riskRate: 4 },
    { font: 'AIDS', gpa: 8.5, attendance: 89, riskRate: 2 },
    { dept: 'IT', gpa: 7.8, attendance: 82, riskRate: 6 },
    { dept: 'ECE', gpa: 7.6, attendance: 80, riskRate: 8 },
    { dept: 'MECH', gpa: 7.4, attendance: 84, riskRate: 5 }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Advanced Institution Analytics</h1>
        <p className="text-xs text-slate-500 font-medium">Multi-dimensional academic metrics, risk rate analysis, and department comparisons</p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Department Filter</label>
          <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl">
            <option value="All">All Departments</option>
            <option value="CSE">Computer Science</option>
            <option value="AIDS">AI & Data Science</option>
            <option value="IT">Information Technology</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Semester Filter</label>
          <select value={semester} onChange={e => setSemester(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl">
            <option value="All">All Semesters</option>
            <option value="4">Semester 4</option>
            <option value="6">Semester 6</option>
            <option value="8">Semester 8</option>
          </select>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Department Average CGPA Comparison</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="dept" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[5, 10]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }} />
              <Bar dataKey="gpa" fill="#10b981" radius={[6, 6, 0, 0]} name="Average CGPA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
