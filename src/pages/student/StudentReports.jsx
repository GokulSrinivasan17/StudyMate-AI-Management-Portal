import React, { useState, useEffect } from 'react';
import { reportService } from '../../services/reportService';
import { useToast } from '../../context/ToastContext';
import { Download, Printer, FileSpreadsheet, Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';
import { RiskBadge } from '../../components/common/RiskBadge';

export const StudentReports = () => {
  const [report, setReport] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    reportService.generateStudentReport().then(res => setReport(res));
  }, []);

  const handleDownloadPDF = () => {
    addToast('Generating PDF Report... Download started for "SmartEdu_Academic_Report_Harish.pdf"', 'success', 'Report Exported');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!report) return <div className="p-8 text-center text-slate-500">Generating Academic Intelligence Report...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Academic Report Center</h1>
          <p className="text-xs text-slate-500 font-medium">Download or print your official AI academic evaluation report</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print Report
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* Report Document Preview Box */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg space-y-8 print:shadow-none print:border-none">
        {/* Report Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">{report.institution}</h2>
              <p className="text-xs text-indigo-600 font-bold">{report.reportTitle}</p>
              <span className="text-[10px] text-slate-400 font-mono">Date Generated: {report.generatedAt}</span>
            </div>
          </div>
          <RiskBadge level={report.aiAnalysis.riskLevel} score={report.aiAnalysis.riskScore} />
        </div>

        {/* Student Data Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Student Name</span>
            <span className="font-bold text-slate-900">{report.student.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Student ID</span>
            <span className="font-mono font-bold text-slate-900">{report.student.id}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Department</span>
            <span className="font-semibold text-slate-900">{report.student.department}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Current CGPA</span>
            <span className="font-extrabold text-indigo-600">{report.student.cgpa}</span>
          </div>
        </div>

        {/* Academic Performance Summary */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Subject Performance Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Subject Name</th>
                  <th className="p-3">Attendance %</th>
                  <th className="p-3">Assignment %</th>
                  <th className="p-3">Midterm Score</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="p-3 font-bold">Data Structures & Algorithms</td>
                  <td className="p-3">91%</td>
                  <td className="p-3">88%</td>
                  <td className="p-3">78%</td>
                  <td className="p-3 text-emerald-600 font-bold">Stable</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Database Management Systems</td>
                  <td className="p-3">85%</td>
                  <td className="p-3">92%</td>
                  <td className="p-3">81%</td>
                  <td className="p-3 text-emerald-600 font-bold">Stable</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="p-3 font-bold text-amber-900">Advanced Engineering Mathematics</td>
                  <td className="p-3 text-rose-600 font-bold">68% ⚠️</td>
                  <td className="p-3">0% (Pending)</td>
                  <td className="p-3 text-amber-700 font-bold">62%</td>
                  <td className="p-3 text-rose-600 font-bold">Attention Required</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Object Oriented Java</td>
                  <td className="p-3">88%</td>
                  <td className="p-3">85%</td>
                  <td className="p-3">84%</td>
                  <td className="p-3 text-emerald-600 font-bold">Stable</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Artificial Intelligence & ML</td>
                  <td className="p-3">86%</td>
                  <td className="p-3">95%</td>
                  <td className="p-3">86%</td>
                  <td className="p-3 text-emerald-600 font-bold">Excellent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendations Summary */}
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 space-y-3 text-xs">
          <h4 className="font-bold text-purple-950 text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" /> AI Executive Recommendations
          </h4>
          <p className="text-purple-900 leading-relaxed font-medium">
            {report.aiAnalysis.summary}
          </p>
          <ul className="space-y-1.5 text-purple-800 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600" /> Attend 4 upcoming Mathematics lectures to restore 75% exam eligibility.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600" /> Complete Assignment 4 on Partial Differential Equations before Friday.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
