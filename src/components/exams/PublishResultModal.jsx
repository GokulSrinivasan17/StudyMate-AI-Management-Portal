import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Sparkles, CheckCircle2, Loader2, Award, ShieldCheck } from 'lucide-react';

export const PublishResultModal = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(0);
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState(false);

  const steps = [
    "Validating marks integrity...",
    "Calculating grades & CGPA impacts...",
    "Generating class analytics & risk logs...",
    "Saving results to official registry...",
    "Publishing results to student portal..."
  ];

  const handleStartPublish = () => {
    setPublishing(true);
    setStep(0);

    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setPublishing(false);
          setSuccess(true);
          if (onComplete) onComplete();
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  const handleClose = () => {
    setPublishing(false);
    setSuccess(false);
    setStep(0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Publish Examination Results" size="md">
      {!publishing && !success && (
        <div className="space-y-5 text-center p-2">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-3xl mx-auto w-fit">
            <Sparkles className="w-10 h-10 text-amber-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Confirm Results Publication</h3>
            <p className="text-xs text-slate-500 mt-1">
              You are about to publish results for <strong className="text-slate-900">60 Students</strong> in <strong className="text-slate-900">Data Structures (CS2304)</strong>. This will notify enrolled students and update institutional analytics.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 text-xs">
            <button onClick={handleClose} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl">
              Cancel
            </button>
            <button
              onClick={handleStartPublish}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Confirm & Publish</span>
            </button>
          </div>
        </div>
      )}

      {publishing && (
        <div className="space-y-6 text-center py-6">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <Loader2 className="w-14 h-14 text-indigo-600 animate-spin" />
            <Sparkles className="w-6 h-6 text-amber-400 absolute" />
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-base">{steps[step]}</h4>
            <p className="text-xs text-slate-400">Step {step + 1} of {steps.length}</p>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-500"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {success && (
        <div className="space-y-5 text-center py-6 animate-fade-in">
          <div className="p-4 bg-emerald-100 text-emerald-600 rounded-3xl mx-auto w-fit animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-xl">✓ Results Published Successfully</h3>
            <p className="text-xs text-slate-500 mt-1">
              Examination marks have been finalized and published to the Student Portal & Institutional Records.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Done & Close
          </button>
        </div>
      )}
    </Modal>
  );
};
