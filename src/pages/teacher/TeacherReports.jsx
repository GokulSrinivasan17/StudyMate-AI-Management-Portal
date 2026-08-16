import React from 'react';
import { useToast } from '../../context/ToastContext';
import { Printer, Download, FileSpreadsheet, Sparkles } from 'lucide-react';

export const TeacherReports = () => {
  const { addToast } = useToast();

  const handleDownload = () => {
    addToast('Class Performance Report exported successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Faculty Report Generator</h1>
          <p className="text-xs text-slate-500 font-medium">Export class section attendance, test performance, and risk intervention logs</p>
        </div>

        <button onClick={handleDownload} className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5">
          <Download className="w-4 h-4" /> Download PDF Report
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-xs">
        <h3 className="font-bold text-slate-900 text-base">Class Performance Summary Preview</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-50 p-4 rounded-2xl border">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Enrolled</span>
            <span className="font-extrabold text-slate-900 text-lg">145 Students</span>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
            <span className="text-[10px] text-emerald-700 font-bold uppercase block">Avg Attendance</span>
            <span className="font-extrabold text-emerald-900 text-lg">84%</span>
          </div>
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
            <span className="text-[10px] text-purple-700 font-bold uppercase block">Avg Score</span>
            <span className="font-extrabold text-purple-900 text-lg">76%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
