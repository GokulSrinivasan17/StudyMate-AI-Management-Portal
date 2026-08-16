import React from 'react';
import { Award, TrendingUp, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';

export const MyProgress = () => {
  const radarData = [
    { subject: 'Data Structures', score: 78, fullMark: 100 },
    { subject: 'DBMS', score: 81, fullMark: 100 },
    { subject: 'Engineering Maths', score: 62, fullMark: 100 },
    { subject: 'Java Programming', score: 84, fullMark: 100 },
    { subject: 'AI & ML', score: 86, fullMark: 100 }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Academic Progress & Skill Radar</h1>
        <p className="text-xs text-slate-500 font-medium">Multi-dimensional subject analysis and skill strengths</p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-200 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Strongest Subject</span>
          <h3 className="text-xl font-extrabold text-emerald-950">Artificial Intelligence & ML</h3>
          <p className="text-xs text-emerald-800 font-semibold">Average Score: 86% | Top Decile</p>
        </div>

        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Focus Area (Weakest)</span>
          <h3 className="text-xl font-extrabold text-amber-950">Advanced Engineering Mathematics</h3>
          <p className="text-xs text-amber-800 font-semibold">Average Score: 62% | Dip Flagged</p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-200 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Most Improved Subject</span>
          <h3 className="text-xl font-extrabold text-indigo-950">Data Structures & Algorithms</h3>
          <p className="text-xs text-indigo-800 font-semibold">+12% Gain over 2 Months</p>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Skill Matrix</span>
            <h3 className="text-lg font-bold text-slate-900">Student Competency Profile</h3>
          </div>
          <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            Radar Visualization
          </span>
        </div>

        <div className="h-80 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="75%">
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="Harish Competency" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
