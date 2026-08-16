import React from 'react';
import { useToast } from '../../context/ToastContext';
import { Download, FileSpreadsheet, Sparkles, Printer } from 'lucide-react';

export const AdminReports = () => {
  const { addToast } = useToast();

  const handleGenerate = (title) => {
    addToast(`Generating official report: "${title}"... PDF export ready!`, 'success');
  };

  const reportTypes = [
    { title: "Student Performance Summary", desc: "Overall CGPA, fail rates, and top decile rankings" },
    { title: "Class & Section Attendance Report", desc: "Mandatory 75% attendance threshold eligibility log" },
    { title: "Course Performance & Evaluation Report", desc: "Faculty ratings and course completion rates" },
    { title: "AI Risk & Intervention Audit Report", desc: "Flagged students and active teacher intervention logs" }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Institutional Report Center</h1>
        <p className="text-xs text-slate-500 font-medium">Generate, preview, and download official accreditation & academic intelligence reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((rep, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-base text-slate-900">{rep.title}</h3>
            <p className="text-xs text-slate-500">{rep.desc}</p>
            <button
              onClick={() => handleGenerate(rep.title)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
