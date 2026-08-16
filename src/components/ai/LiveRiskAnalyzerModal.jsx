import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Sparkles, CheckCircle2, RefreshCw, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { aiService } from '../../services/aiService';

export const LiveRiskAnalyzerModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);

  const stepsList = [
    "Ingesting student attendance logs & threshold benchmarks...",
    "Scanning midterm exam scores & subject delta trends...",
    "Checking assignment completion & overdue deadlines...",
    "Executing SmartEdu Neural Risk Model & generating recommendations..."
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setResult(null);

      const interval = setInterval(() => {
        setStep(prev => {
          if (prev < stepsList.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 500);

      aiService.runLiveAnalysis().then(res => {
        setTimeout(() => {
          setResult(res);
        }, 2200);
      });

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Live Academic Risk Analysis Engine" maxWidth="max-w-2xl">
      <div className="space-y-6">
        <div className="bg-purple-900 text-white p-6 rounded-2xl relative overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                BUILDATHON 2026 AI DEMO PIPELINE
              </span>
              <h4 className="text-lg font-bold">Real-Time Academic Risk Evaluation</h4>
            </div>
          </div>
        </div>

        {/* Progress Pipeline */}
        {!result ? (
          <div className="space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
            {stepsList.map((st, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs">
                {idx < step ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : idx === step ? (
                  <RefreshCw className="w-5 h-5 text-purple-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className={idx <= step ? "font-semibold text-slate-900" : "text-slate-400"}>
                  {st}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between text-xs font-semibold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Analysis Execution Complete ({result.executionTimeMs}ms)
              </span>
              <span className="font-mono text-[11px] text-emerald-700">Model: SmartEdu-Predictor-v2.4</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400">Target Student</span>
                <p className="font-bold text-slate-900 text-sm mt-1">{result.studentName}</p>
                <p className="text-xs text-slate-500 mt-0.5">Computer Science & Engineering</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <span className="text-[10px] font-bold uppercase text-amber-700">Detected Risk Level</span>
                <div className="flex items-center gap-2 mt-1">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span className="font-extrabold text-amber-900 text-base">{result.riskLevel} ({result.riskScore}/100)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <span className="font-bold uppercase text-purple-700 text-[10px] block mb-1">Primary Academic Concern</span>
              <p className="font-bold text-slate-900">{result.weakSubject}</p>
              <p className="text-slate-600 mt-1">{result.recommendation}</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors"
              >
                Close & View Results
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
