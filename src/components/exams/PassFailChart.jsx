import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const PassFailChart = ({ passCount = 56, failCount = 4 }) => {
  const total = passCount + failCount || 60;
  const passPercent = ((passCount / total) * 100).toFixed(1);
  const failPercent = ((failCount / total) * 100).toFixed(1);

  const data = [
    { name: 'PASS', count: passCount, color: '#10b981' },
    { name: 'FAIL', count: failCount, color: '#ef4444' }
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-base">Pass vs Fail Ratio</h3>
        <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
          {passPercent}% Pass Rate
        </span>
      </div>

      <div className="h-60 w-full relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={6}
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }} />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl font-extrabold text-emerald-600 font-mono">{passPercent}%</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pass Rate</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
        <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 flex items-center justify-between">
          <span className="text-emerald-900 font-bold">PASS:</span>
          <span className="font-mono text-emerald-700 font-extrabold">{passCount} ({passPercent}%)</span>
        </div>
        <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100 flex items-center justify-between">
          <span className="text-rose-900 font-bold">FAIL:</span>
          <span className="font-mono text-rose-700 font-extrabold">{failCount} ({failPercent}%)</span>
        </div>
      </div>
    </div>
  );
};
