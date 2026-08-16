import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { Sliders, Sparkles, TrendingUp, Award, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';
import { RiskBadge } from '../../components/common/RiskBadge';

export const WhatIfPrediction = () => {
  const [attendance, setAttendance] = useState(68);
  const [targetAttendance, setTargetAttendance] = useState(88);
  const [studyHours, setStudyHours] = useState(6);
  const [assignmentEffort, setAssignmentEffort] = useState(90);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState({
    originalScore: 62,
    predictedScore: 78,
    gain: 16,
    predictedGrade: 'A',
    riskLevel: 'LOW',
    confidence: "95.6%",
    factors: [
      "Attendance improvement from 68% to 88% (+6% Exam Boost)",
      "Dedicated 6 hrs weekly Mathematics practice (+7% Exam Boost)",
      "Assignment 4 completion with 90% accuracy (+3% Exam Boost)"
    ]
  });

  const handleRunPrediction = async () => {
    setLoading(true);
    try {
      const res = await aiService.predictPerformance({
        attendance,
        targetAttendance,
        currentScore: 62,
        studyHours,
        assignmentEffort
      });
      setPrediction(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">What-If Academic Predictor</h1>
        <p className="text-xs text-slate-500 font-medium">Simulate how attendance, study hours, and assignment effort alter your upcoming exam grade</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Input Sliders Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" /> Simulation Input Parameters
          </h3>

          <div className="space-y-5 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1.5">
                <span>Target Attendance:</span>
                <span className="text-indigo-600 font-mono font-bold text-sm">{targetAttendance}%</span>
              </div>
              <input
                type="range"
                min="68"
                max="100"
                value={targetAttendance}
                onChange={e => setTargetAttendance(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-[10px] text-slate-400">Current attendance is 68%. Mandatory exam threshold is 75%.</span>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1.5">
                <span>Weekly Study Hours:</span>
                <span className="text-indigo-600 font-mono font-bold text-sm">{studyHours} hrs/week</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={studyHours}
                onChange={e => setStudyHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-[10px] text-slate-400">Dedicated self-study time outside of class lectures.</span>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1.5">
                <span>Target Assignment Score:</span>
                <span className="text-indigo-600 font-mono font-bold text-sm">{assignmentEffort}/100</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={assignmentEffort}
                onChange={e => setAssignmentEffort(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-[10px] text-slate-400">Expected submission accuracy for Assignment 4.</span>
            </div>
          </div>

          <button
            onClick={handleRunPrediction}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
            <span>{loading ? "Calculating Neural Model..." : "Predict My Performance"}</span>
          </button>
        </div>

        {/* Animated Result Card */}
        <div className="ai-gradient-card p-8 rounded-3xl border border-purple-200/80 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Predicted Simulation Result
              </span>
              <RiskBadge level={prediction.riskLevel} />
            </div>

            <div>
              <span className="text-xs text-slate-500 font-medium">Target Exam Grade Jump</span>
              <div className="flex items-center gap-4 mt-2">
                <div>
                  <span className="text-slate-400 text-xs block">Current</span>
                  <span className="text-3xl font-extrabold text-slate-900">{prediction.originalScore}%</span>
                </div>
                <ArrowRight className="w-8 h-8 text-purple-500 animate-pulse" />
                <div>
                  <span className="text-emerald-600 text-xs font-bold block">Predicted</span>
                  <span className="text-4xl font-extrabold text-emerald-600">{prediction.predictedScore}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 p-4 rounded-2xl border border-purple-100 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">Predicted Impact Factors:</span>
              <ul className="space-y-1.5 text-slate-700">
                {prediction.factors.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-purple-200/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Model Confidence: {prediction.confidence}</span>
            <span className="font-extrabold text-purple-700">Potential Improvement: +{prediction.gain}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
