import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const PerformanceBarChart = () => {
  const data = [
    { range: '0–20%', count: 1, color: '#ef4444' },
    { range: '21–40%', count: 3, color: '#f97316' },
    { range: '41–60%', count: 12, color: '#f59e0b' },
    { range: '61–80%', count: 24, color: '#6366f1' },
    { range: '81–100%', count: 20, color: '#10b981' }
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Class Performance</span>
          <h3 className="text-base font-bold text-slate-900">Score Range Distribution</h3>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }} />
            <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} name="Students Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
