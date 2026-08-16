import React from 'react';
import { Save, Send, Sparkles, Download, CheckCircle2, Circle } from 'lucide-react';

export const ExamHeader = ({ status = 'Under Review', onSaveDraft, onSubmitMarks, onPublish, onExport }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Exam Marks Entry & Grading</h1>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            status === 'Published' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
            status === 'Under Review' ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' :
            'bg-slate-100 text-slate-700 border border-slate-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              status === 'Published' ? 'bg-emerald-500 animate-ping' :
              status === 'Under Review' ? 'bg-indigo-600 animate-pulse' :
              'bg-slate-400'
            }`} />
            <span>● {status}</span>
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Enter, analyze and finalize student examination results.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={onSaveDraft}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs transition-all flex items-center gap-1.5"
        >
          <Save className="w-4 h-4 text-slate-500" />
          <span>Save Draft</span>
        </button>

        <button
          onClick={onSubmitMarks}
          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-indigo-200 transition-all flex items-center gap-1.5"
        >
          <Send className="w-4 h-4 text-indigo-600" />
          <span>Submit Marks</span>
        </button>

        <button
          onClick={onPublish}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>Publish Results</span>
        </button>

        <button
          onClick={onExport}
          className="bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs transition-all flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Results</span>
        </button>
      </div>
    </div>
  );
};
