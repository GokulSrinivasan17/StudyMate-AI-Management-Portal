import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const PerformanceRadarChart = ({ student }) => {
  const selected = student || {
    name: "Harish Kolanjiyappan",
    attendance: 82,
    assignments: 87,
    internal: 96,
    exam: 91,
    overall: 92
  };

  const radarData = [
    { metric: 'Attendance', score: selected.attendance || 82 },
    { metric: 'Assignments', score: selected.assignments || 87 },
    { metric: 'Internal', score: selected.internal || 96 },
    { metric: 'Exam', score: selected.exam || 91 },
    { metric: 'Overall', score: selected.overall || 92 }
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Skill Radar Profile</span>
          <h3 className="text-base font-bold text-slate-900">{selected.name}</h3>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="metric" stroke="#64748b" fontSize={11} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
            <Radar name="Student Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
