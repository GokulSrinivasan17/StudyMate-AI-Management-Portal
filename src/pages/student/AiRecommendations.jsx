import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { RiskBadge } from '../../components/common/RiskBadge';
import { AIRiskCard } from '../../components/ai/AIRiskCard';
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, ShieldAlert, Target, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExamScheduleModal } from '../../components/ai/ExamScheduleModal';

export const AiRecommendations = () => {
  const [aiData, setAiData] = useState(null);
  const [showFactors, setShowFactors] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    studentService.getDashboard().then(res => {
      setAiData(res.aiInsightCard);
      setRecommendations(res.aiInsightCard.recommendedActions || []);
    });
  }, []);

  if (!aiData) return <div className="p-8 text-center text-slate-500">Generating AI Recommendations...</div>;

  const toggleRecommendation = (id) => {
    setRecommendations(prev =>
      prev.map(r => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Visual Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="p-3 bg-purple-600 rounded-2xl">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              SMARTEDU AI SUITE
            </span>
            <h1 className="text-3xl font-extrabold mt-0.5">AI Academic Intelligence & Action Center</h1>
            <p className="text-xs text-purple-200 mt-1">Personalized academic risk mitigation plan for Harish Kolanjiyappan</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-slate-900 hover:bg-purple-50 font-bold text-xs px-5 py-3 rounded-2xl transition-all shadow-lg flex items-center gap-2 hover:scale-105 shrink-0"
        >
          <Calendar className="w-4 h-4 text-purple-600" />
          <span>Generate Gemini AI Exam Schedule</span>
        </button>
      </div>

      {/* Top 2 Cards: Risk Meter + Target Score */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AIRiskCard
          riskScore={aiData.riskScore}
          riskLevel={aiData.riskLevel}
          factors={aiData.primaryFactors}
          confidence={aiData.confidence}
        />

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Predicted AI Outcome</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">Endterm Mathematics Prediction</h3>

            <div className="mt-4 p-5 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-purple-700 font-semibold block">Current Score Projection</span>
                <span className="text-2xl font-extrabold text-slate-900">{aiData.currentPredictedScore}% (Grade B)</span>
              </div>
              <ArrowRight className="w-6 h-6 text-purple-400" />
              <div>
                <span className="text-xs text-emerald-700 font-semibold block">Target Score After Action</span>
                <span className="text-2xl font-extrabold text-emerald-600">{aiData.potentialImprovedScore}% (Grade A)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>AI Exam Schedule & Reminders</span>
            </button>
            <button
              onClick={() => navigate('/student/prediction')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>What-If Predictor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Section: "Why am I at risk?" */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowFactors(!showFactors)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-base">Why am I at Medium Risk? (Factor Breakdown)</h3>
          </div>
          {showFactors ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {showFactors && (
          <div className="p-6 pt-0 border-t border-slate-100 space-y-3">
            {aiData.primaryFactors.map((f, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800">{f.description}</span>
                <span className={f.impact < 0 ? 'text-rose-600 font-bold font-mono' : 'text-emerald-600 font-bold font-mono'}>
                  {f.impact > 0 ? `+${f.impact}%` : `${f.impact}%`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actionable Recommendations Checklist */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" /> AI Actionable Strategy Checklist
        </h3>

        <div className="space-y-3">
          {recommendations.map(rec => (
            <div
              key={rec.id}
              onClick={() => toggleRecommendation(rec.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                rec.completed
                  ? 'bg-emerald-50/50 border-emerald-200 opacity-60'
                  : 'bg-slate-50 hover:bg-purple-50/50 border-slate-200/80'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={rec.completed}
                  onChange={() => {}}
                  className="mt-1 rounded border-slate-300 text-purple-600 focus:ring-purple-500 w-4 h-4 cursor-pointer"
                />
                <div>
                  <h4 className={`font-bold text-xs ${rec.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {rec.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{rec.description}</p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full block">
                  {rec.impact}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">{rec.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ExamScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
