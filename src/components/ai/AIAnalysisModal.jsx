import React from 'react';
import { Modal } from '../common/Modal';
import { RiskBadge } from '../common/RiskBadge';
import { Sparkles, AlertCircle, FilePlus, UserCheck, ShieldAlert } from 'lucide-react';

export const AIAnalysisModal = ({ isOpen, onClose, student, onCreateIntervention }) => {
  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`AI Deep Analysis — ${student.name}`} maxWidth="max-w-3xl">
      <div className="space-y-6 text-xs">
        {/* Profile Brief */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover border" />
            <div>
              <h4 className="font-bold text-sm text-slate-900">{student.name}</h4>
              <p className="text-slate-500 text-[11px]">{student.department} | {student.year}</p>
              <p className="text-slate-400 text-[10px]">ID: {student.id}</p>
            </div>
          </div>
          <RiskBadge level={student.riskLevel} score={student.riskScore} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="bg-slate-100/80 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Attendance</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{student.attendance}%</p>
          </div>
          <div className="bg-slate-100/80 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Score</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{student.averageScore}%</p>
          </div>
          <div className="bg-slate-100/80 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase">CGPA</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{student.cgpa}</p>
          </div>
          <div className="bg-slate-100/80 p-3 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Assignments</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{student.assignmentCompletion}%</p>
          </div>
        </div>

        {/* Factors Breakdown */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <h5 className="font-bold text-slate-900 mb-3 flex items-center gap-1.5 text-xs">
            <Sparkles className="w-4 h-4 text-purple-600" /> AI Risk Vector Factors
          </h5>
          <div className="space-y-2">
            {(student.factors || [
              { name: "Attendance dip in core subjects", impact: -15 },
              { name: "Overdue assignment submission", impact: -10 }
            ]).map((f, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs">
                <span className="font-medium text-slate-800">{f.name || f.factor}</span>
                <span className={`font-mono font-bold ${f.impact < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {f.impact > 0 ? `+${f.impact}%` : `${f.impact}%`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Actionable Guidance */}
        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
          <h5 className="font-bold text-purple-950 mb-1">Recommended Teacher Action</h5>
          <p className="text-purple-800 leading-relaxed font-medium">
            Schedule academic counseling to resolve attendance gaps in {student.weakSubject || 'Engineering Mathematics'}. Assign targeted practice problems for internal mark recovery.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onCreateIntervention) onCreateIntervention(student);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md"
          >
            <FilePlus className="w-4 h-4" /> Create Intervention Plan
          </button>
        </div>
      </div>
    </Modal>
  );
};
