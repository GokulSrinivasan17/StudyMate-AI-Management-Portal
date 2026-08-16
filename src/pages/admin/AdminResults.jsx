import React from 'react';
import { Award, BarChart3, TrendingUp, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminResults = () => {
  const resultsData = [
    { department: 'Computer Science', passRate: 94, avgScore: 78, highest: 98, lowest: 42 },
    { department: 'AI & Data Science', passRate: 96, avgScore: 82, highest: 99, lowest: 50 },
    { department: 'Information Tech', passRate: 91, avgScore: 74, highest: 95, lowest: 38 },
    { department: 'Electronics Engg', passRate: 88, avgScore: 72, highest: 94, lowest: 35 },
    { department: 'Mechanical Engg', passRate: 90, avgScore: 75, highest: 96, lowest: 40 }
  ];

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Institutional Examination Results</h1>
        <p className="text-xs text-slate-500 font-medium">Department pass percentages, highest/lowest mark ranges, and grade bell curve metrics</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Department Examination Results Matrix</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">Department</th>
                <th className="p-4">Pass Rate (%)</th>
                <th className="p-4">Average Mark</th>
                <th className="p-4">Highest Score</th>
                <th className="p-4">Lowest Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {resultsData.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{r.department}</td>
                  <td className="p-4 font-bold text-emerald-600">{r.passRate}%</td>
                  <td className="p-4 font-bold font-mono">{r.avgScore}%</td>
                  <td className="p-4 font-mono text-purple-600 font-bold">{r.highest}%</td>
                  <td className="p-4 font-mono text-rose-600">{r.lowest}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
