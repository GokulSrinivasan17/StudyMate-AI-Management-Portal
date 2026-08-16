import React from 'react';
import { RiskBadge } from '../common/RiskBadge';
import { ShieldAlert, TrendingDown, CheckCircle2, Info } from 'lucide-react';

export const AIRiskCard = ({ riskScore = 68, riskLevel = "MEDIUM", factors = [], confidence = "94.2%" }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Academic Risk Engine</span>
          <h3 className="text-lg font-bold text-slate-900">Student Risk Score & Factors</h3>
        </div>
        <RiskBadge level={riskLevel} score={riskScore} />
      </div>

      {/* Visual Risk Gauge Meter */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-slate-600 font-semibold mb-2">
          <span>0 (Low Risk)</span>
          <span className="font-mono text-indigo-600 font-bold">Confidence: {confidence}</span>
          <span>100 (Critical Risk)</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
          <div
            className={`h-full transition-all duration-700 rounded-full ${
              riskLevel === 'CRITICAL' ? 'bg-rose-600' :
              riskLevel === 'HIGH' ? 'bg-red-500' :
              riskLevel === 'MEDIUM' ? 'bg-amber-500' :
              'bg-emerald-500'
            }`}
            style={{ width: `${riskScore}%` }}
          />
        </div>
      </div>

      {/* Risk Factors Breakdown */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Contributing Factors Breakdown
        </h4>
        {factors.map((f, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div className="shrink-0 mt-0.5">
              {f.impact < 0 ? (
                <TrendingDown className="w-4 h-4 text-rose-500" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>{f.factor || f.name}</span>
                <span className={f.impact < 0 ? "text-rose-600 font-mono" : "text-emerald-600 font-mono"}>
                  {f.impact > 0 ? `+${f.impact}%` : `${f.impact}%`}
                </span>
              </div>
              {f.description && <p className="text-slate-500 mt-0.5 text-[11px]">{f.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
