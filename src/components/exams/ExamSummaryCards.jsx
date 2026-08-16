import React from 'react';
import { BarChart2, TrendingUp, TrendingDown, CheckCircle2, XCircle, Award } from 'lucide-react';

export const ExamSummaryCards = ({ metrics }) => {
  const data = metrics || {
    classAverage: 74.8,
    highestMark: 98,
    lowestMark: 31,
    passPercentage: 93.3,
    failPercentage: 6.7,
    medianScore: 76
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Class Average</span>
        <div className="text-xl font-extrabold text-slate-900 font-mono">{data.classAverage}%</div>
        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
          <TrendingUp className="w-3 h-3" /> +8.4% vs last exam
        </span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Highest Mark</span>
        <div className="text-xl font-extrabold text-purple-600 font-mono">{data.highestMark}/100</div>
        <span className="text-[10px] text-purple-600 font-semibold">Grade A+ (KITCSE003)</span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Lowest Mark</span>
        <div className="text-xl font-extrabold text-rose-600 font-mono">{data.lowestMark}/100</div>
        <span className="text-[10px] text-rose-600 font-semibold">Grade F (KITCSE005)</span>
      </div>

      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Pass Rate</span>
        <div className="text-xl font-extrabold text-emerald-900 font-mono">{data.passPercentage}%</div>
        <span className="text-[10px] text-emerald-700 font-semibold">56 of 60 Students</span>
      </div>

      <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 shadow-2xs space-y-1">
        <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">Fail Rate</span>
        <div className="text-xl font-extrabold text-rose-900 font-mono">{data.failPercentage}%</div>
        <span className="text-[10px] text-rose-700 font-semibold">4 Students Flagged</span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Median Score</span>
        <div className="text-xl font-extrabold text-indigo-600 font-mono">{data.medianScore}%</div>
        <span className="text-[10px] text-indigo-600 font-semibold">Grade B+ Center</span>
      </div>
    </div>
  );
};
