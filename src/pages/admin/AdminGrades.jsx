import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminGrades = () => {
  const gradeDistribution = [
    { grade: 'A+', count: 185, color: '#10b981' },
    { grade: 'A', count: 420, color: '#059669' },
    { grade: 'B+', count: 310, color: '#6366f1' },
    { grade: 'B', count: 180, color: '#4f46e5' },
    { grade: 'C', count: 95, color: '#f59e0b' },
    { grade: 'D', count: 40, color: '#ef4444' },
    { grade: 'F', count: 20, color: '#991b1b' }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Institutional Grade Analytics</h1>
        <p className="text-xs text-slate-500 font-medium">Grade bell curve distribution across all departments (A+ to F)</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Grade Distribution Breakdown (1250 Students)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="grade" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }} />
              <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Student Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
