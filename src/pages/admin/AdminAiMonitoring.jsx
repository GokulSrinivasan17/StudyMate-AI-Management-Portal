import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { RiskBadge } from '../../components/common/RiskBadge';
import { Sparkles, Cpu, Activity, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const AdminAiMonitoring = () => {
  const [monitoring, setMonitoring] = useState(null);

  useEffect(() => {
    adminService.getAiMonitoring().then(res => setMonitoring(res));
  }, []);

  if (!monitoring) return <div className="p-8 text-center text-slate-500">Connecting to AI Monitoring Hub...</div>;

  return (
    <div className="space-y-8 pb-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="p-3 bg-purple-600 rounded-2xl">
            <Cpu className="w-8 h-8 text-amber-300" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              BUILDATHON 2026 AI SYSTEM HUB
            </span>
            <h1 className="text-3xl font-extrabold mt-0.5">AI Neural Model System Monitoring</h1>
            <p className="text-xs text-purple-200 mt-1">Real-time prediction logs, accuracy metrics, and inference load</p>
          </div>
        </div>

        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400 animate-spin" /> {monitoring.modelStatus}
        </span>
      </div>

      {/* Model Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
        <div className="bg-white p-5 rounded-2xl border shadow-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Active Model</span>
          <p className="font-extrabold text-slate-900 text-sm mt-1">{monitoring.modelName}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border shadow-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Predictions Generated</span>
          <p className="font-extrabold text-purple-600 text-base mt-1">{monitoring.totalPredictionsGenerated}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border shadow-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Students Analyzed</span>
          <p className="font-extrabold text-slate-900 text-base mt-1">{monitoring.studentsAnalyzed}</p>
        </div>
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-xs">
          <span className="text-[10px] text-emerald-700 font-bold uppercase">Model Accuracy</span>
          <p className="font-extrabold text-emerald-900 text-base mt-1">{monitoring.modelAccuracy}</p>
        </div>
      </div>

      {/* AI Activity Timeline Log */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" /> Real-Time AI Prediction Stream
          </h3>
          <span className="text-xs text-slate-400 font-mono">Last Sync: {monitoring.lastUpdated}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Risk Flag</th>
                <th className="p-4">Model Confidence</th>
                <th className="p-4">Primary Factor</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {monitoring.recentLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{log.studentName}</td>
                  <td className="p-4"><RiskBadge level={log.riskLevel} /></td>
                  <td className="p-4 font-mono text-purple-600 font-bold">{log.confidence}</td>
                  <td className="p-4 text-slate-500">{log.primaryFactor}</td>
                  <td className="p-4 text-slate-400 font-mono">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
