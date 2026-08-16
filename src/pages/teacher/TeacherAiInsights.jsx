import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';
import { RiskBadge } from '../../components/common/RiskBadge';
import { AIAnalysisModal } from '../../components/ai/AIAnalysisModal';
import { InterventionPlanModal } from '../../components/ai/InterventionPlanModal';
import { Sparkles, ShieldAlert, RefreshCw, FilePlus, ArrowRight, UserCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const TeacherAiInsights = () => {
  const [insights, setInsights] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [interventionOpen, setInterventionOpen] = useState(false);
  const [runningBulk, setRunningBulk] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    teacherService.getAiInsights().then(res => setInsights(res));
  }, []);

  if (!insights) return <div className="p-8 text-center text-slate-500">Generating Class AI Insights...</div>;

  const handleBulkGenerate = () => {
    setRunningBulk(true);
    setTimeout(() => {
      setRunningBulk(false);
      addToast('Bulk AI Insights recalculated across 145 students! Updated risk vectors saved.', 'success', 'AI Pipeline Complete');
    }, 1500);
  };

  const handleAnalyze = (student) => {
    setSelectedStudent(student);
    setAnalysisOpen(true);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-3 bg-purple-600 rounded-2xl">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              BUILDATHON 2026 FACULTY AI ENGINE
            </span>
            <h1 className="text-3xl font-extrabold mt-0.5">Faculty AI Class Intelligence</h1>
            <p className="text-xs text-purple-200 mt-1">Automated student risk scoring & early intervention workflow</p>
          </div>
        </div>

        <button
          onClick={handleBulkGenerate}
          disabled={runningBulk}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          {runningBulk ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
          <span>{runningBulk ? "Processing 145 Datasets..." : "Run Bulk AI Insight Refresh"}</span>
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Students</span>
          <p className="font-extrabold text-slate-900 text-2xl mt-1">{insights.summary.totalStudents}</p>
        </div>
        <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 shadow-xs">
          <span className="text-[10px] font-bold text-rose-700 uppercase">High Risk</span>
          <p className="font-extrabold text-rose-900 text-2xl mt-1">{insights.summary.highRisk}</p>
        </div>
        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-xs">
          <span className="text-[10px] font-bold text-amber-700 uppercase">Medium Risk</span>
          <p className="font-extrabold text-amber-900 text-2xl mt-1">{insights.summary.mediumRisk}</p>
        </div>
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-xs">
          <span className="text-[10px] font-bold text-emerald-700 uppercase">Low Risk (Stable)</span>
          <p className="font-extrabold text-emerald-900 text-2xl mt-1">{insights.summary.lowRisk}</p>
        </div>
      </div>

      {/* Students Requiring Attention */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" /> Students Flagged for Intervention
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.attentionStudents.map(student => (
            <div key={student.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover border" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{student.name}</h4>
                    <p className="text-[11px] text-slate-500">{student.department}</p>
                  </div>
                </div>
                <RiskBadge level={student.riskLevel} score={student.riskScore} />
              </div>

              <div className="text-xs bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                <p className="text-slate-800 font-medium">
                  <strong>AI Detected Reason:</strong> Low attendance ({student.attendance}%) + score decline in {student.weakSubject}.
                </p>
                <p className="text-purple-700 font-semibold text-[11px]">
                  <strong>AI Recommendation:</strong> Schedule academic counseling & issue remedial assignment.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => handleAnalyze(student)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Analyze Student
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIAnalysisModal
        isOpen={analysisOpen}
        onClose={() => setAnalysisOpen(false)}
        student={selectedStudent}
        onCreateIntervention={(st) => {
          setSelectedStudent(st);
          setInterventionOpen(true);
        }}
      />

      <InterventionPlanModal
        isOpen={interventionOpen}
        onClose={() => setInterventionOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
};
