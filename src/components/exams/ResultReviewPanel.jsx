import React from 'react';
import { CheckCircle2, AlertCircle, FileCheck, Sparkles } from 'lucide-react';

export const ResultReviewPanel = ({
  totalStudents = 60,
  enteredCount = 60,
  passCount = 56,
  failCount = 4,
  avgScore = 74.8,
  highestScore = 98,
  lowestScore = 31,
  onPublish
}) => {
  const isReady = enteredCount === totalStudents;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-base">Examination Result Review Panel</h3>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
          isReady ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
        }`}>
          {isReady ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
          <span>Status: {isReady ? 'Ready to Publish' : 'Cannot Publish (Incomplete)'}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Students</span>
          <p className="font-extrabold text-slate-900 mt-0.5">{totalStudents}</p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Marks Entered</span>
          <p className="font-extrabold text-indigo-600 mt-0.5">{enteredCount} / {totalStudents}</p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Pending Marks</span>
          <p className="font-extrabold text-slate-900 mt-0.5">{totalStudents - enteredCount}</p>
        </div>

        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
          <span className="text-[10px] text-emerald-800 font-bold uppercase block">Passed</span>
          <p className="font-extrabold text-emerald-700 mt-0.5">{passCount}</p>
        </div>

        <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
          <span className="text-[10px] text-rose-800 font-bold uppercase block">Failed</span>
          <p className="font-extrabold text-rose-700 mt-0.5">{failCount}</p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Class Avg</span>
          <p className="font-extrabold text-slate-900 mt-0.5 font-mono">{avgScore}%</p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Highest Mark</span>
          <p className="font-extrabold text-purple-600 mt-0.5 font-mono">{highestScore}</p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Lowest Mark</span>
          <p className="font-extrabold text-rose-600 mt-0.5 font-mono">{lowestScore}</p>
        </div>
      </div>

      <div className="flex justify-end pt-2 border-t border-slate-100">
        <button
          onClick={onPublish}
          disabled={!isReady}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 hover:scale-105 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Finalize & Publish Exam Results</span>
        </button>
      </div>
    </div>
  );
};
