import React from 'react';
import { Sparkles, ArrowRight, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';
import { useNavigate } from 'react-router-dom';

export const AIInsightCard = ({ data, onTriggerPrediction }) => {
  const navigate = useNavigate();
  if (!data) return null;

  return (
    <div className="ai-gradient-card p-6 rounded-3xl relative overflow-hidden shadow-xl border border-purple-200/80">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Sparkles className="w-32 h-32 text-purple-600" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-purple-600 text-white p-2 rounded-xl shadow-md">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full">
              AI Academic Intelligence
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
              Personalized Risk Analysis & Strategy
            </h3>
          </div>
        </div>

        <RiskBadge level={data.riskLevel} score={data.riskScore} />
      </div>

      <p className="text-sm text-slate-700 leading-relaxed font-medium mb-5 bg-white/60 p-4 rounded-2xl border border-purple-100">
        {data.summary}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-4 h-4" /> Focus Area / Weak Subject
          </div>
          <p className="text-base font-bold text-slate-900">{data.weakSubject}</p>
          <p className="text-xs text-slate-500 mt-1">Midterm I: 62% | Attendance: 68%</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-amber-500" /> AI Target Outcome
          </div>
          <p className="text-base font-bold text-slate-900">
            Target Exam Score: {data.potentialImprovedScore}% <span className="text-emerald-600 text-xs font-semibold">(+{data.improvementMargin}%)</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">Predicted Grade: {data.predictedGrade} (A-Level potential)</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={() => navigate('/student/ai-recommendations')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <span>View Detailed Recommendations</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {onTriggerPrediction && (
          <button
            onClick={onTriggerPrediction}
            className="bg-white hover:bg-purple-50 text-purple-700 border border-purple-300 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Open What-If Simulator</span>
          </button>
        )}
      </div>
    </div>
  );
};
