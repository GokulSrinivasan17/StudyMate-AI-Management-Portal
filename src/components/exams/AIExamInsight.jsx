import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';

export const AIExamInsight = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 rounded-3xl border border-indigo-900/60 shadow-xl space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-purple-600/40 border border-purple-400/40 rounded-xl">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
              SMARTEDU AI ENGINE INSIGHT
            </span>
            <h3 className="text-lg font-extrabold text-white">Class Examination Academic Insight</h3>
          </div>
        </div>

        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> +8.4% Score Gain
        </span>
      </div>

      <p className="text-xs text-purple-100 font-medium leading-relaxed">
        "Class performance is above the previous assessment by <span className="text-amber-300 font-bold">8.4%</span>. Overall student engagement in assignment submissions positively correlated with end assessment success."
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-indigo-900/60">
        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <span className="text-[10px] text-purple-300 font-bold uppercase block">Top Performing Area</span>
          <p className="font-extrabold text-white mt-0.5">Data Structures</p>
        </div>

        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <span className="text-[10px] text-amber-300 font-bold uppercase block">Requiring Attention</span>
          <p className="font-extrabold text-amber-300 mt-0.5">4 Students</p>
        </div>

        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <span className="text-[10px] text-emerald-300 font-bold uppercase block">Overall Failure Risk</span>
          <p className="font-extrabold text-emerald-400 mt-0.5">Low (6.7%)</p>
        </div>

        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <span className="text-[10px] text-purple-300 font-bold uppercase block">Recommended Action</span>
          <p className="text-[11px] text-slate-200 mt-0.5">Provide additional practice materials for students below 50%.</p>
        </div>
      </div>
    </div>
  );
};
