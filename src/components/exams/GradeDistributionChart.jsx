import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const GradeDistributionChart = ({ distribution, totalStudents = 60 }) => {
  const data = distribution || [
    { name: 'A+', count: 8, color: '#10b981' },
    { name: 'A', count: 12, color: '#059669' },
    { name: 'B+', count: 15, color: '#6366f1' },
    { name: 'B', count: 14, color: '#4f46e5' },
    { name: 'C', count: 7, color: '#f59e0b' },
    { name: 'D', count: 3, color: '#f97316' },
    { name: 'F', count: 1, color: '#ef4444' }
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-base">Grade Distribution</h3>
        <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
          A+ to F Scale
        </span>
      </div>

      <div className="h-60 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={4}
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }} />
          </PieChart>
        </ResponsiveContainer>

        {/* Donut Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-extrabold text-slate-900 font-mono">{totalStudents}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Students</span>
        </div>
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-4 gap-1.5 text-[11px] font-semibold text-slate-700">
        {data.map(item => (
          <div key={item.name} className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-lg">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="font-bold">{item.name}:</span>
            <span className="font-mono text-slate-500">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
