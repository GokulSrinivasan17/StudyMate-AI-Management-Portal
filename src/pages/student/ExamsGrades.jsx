import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { Award, Calendar, AlertTriangle, CheckCircle2, TrendingDown, Sparkles, Bell } from 'lucide-react';
import { RiskBadge } from '../../components/common/RiskBadge';
import { ExamScheduleModal } from '../../components/ai/ExamScheduleModal';

export const ExamsGrades = () => {
  const [exams, setExams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    studentService.getExams().then(data => setExams(data));
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Exams & Grade History</h1>
          <p className="text-xs text-slate-500 font-medium">Midterm assessments, endterm schedule, and grade feedback</p>
        </div>

        {/* Gemini AI Exam Schedule & Reminders Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition-all flex items-center gap-2.5 hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
          <span>Gemini AI Exam Schedule & Reminders</span>
        </button>
      </div>

      {/* Grade Cards Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">DSA Grade</span>
          <div className="text-2xl font-extrabold text-slate-900">78% <span className="text-sm font-bold text-indigo-600">(Grade B+)</span></div>
          <p className="text-[10px] text-emerald-600 font-semibold">Low Risk</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">DBMS Grade</span>
          <div className="text-2xl font-extrabold text-slate-900">81% <span className="text-sm font-bold text-indigo-600">(Grade A)</span></div>
          <p className="text-[10px] text-emerald-600 font-semibold">Low Risk</p>
        </div>

        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-amber-700 uppercase">Mathematics Grade</span>
          <div className="text-2xl font-extrabold text-amber-900">62% <span className="text-sm font-bold text-amber-700">(Grade C)</span></div>
          <p className="text-[10px] text-rose-600 font-bold">⚠️ High Risk Dip</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Java Grade</span>
          <div className="text-2xl font-extrabold text-slate-900">84% <span className="text-sm font-bold text-indigo-600">(Grade A)</span></div>
          <p className="text-[10px] text-emerald-600 font-semibold">Low Risk</p>
        </div>
      </div>

      {/* Banner Highlight */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl border border-indigo-900 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Powered by Google Gemini AI
          </div>
          <h3 className="text-lg font-bold">Automated Upcoming Exam Study Schedule</h3>
          <p className="text-xs text-slate-300">
            Let Gemini AI build your day-by-day revision plan for upcoming midterms and send study reminders to your Email & Telegram Bot.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
        >
          <Calendar className="w-4 h-4 text-indigo-600" /> View Schedule & Set Reminders
        </button>
      </div>

      {/* Exam Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Examination Records</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-4">Exam Title</th>
                <th className="p-4">Course</th>
                <th className="p-4">Date</th>
                <th className="p-4">Marks</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Risk Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {exams.map(ex => (
                <tr key={ex.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{ex.examTitle}</td>
                  <td className="p-4 text-slate-500">{ex.courseName}</td>
                  <td className="p-4 font-mono">{ex.date}</td>
                  <td className="p-4 font-mono">{ex.obtainedMarks !== null ? `${ex.obtainedMarks}/100` : '-'}</td>
                  <td className="p-4 font-bold">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] ${
                      ex.grade === 'A+' || ex.grade === 'A' ? 'bg-emerald-100 text-emerald-800' :
                      ex.grade === 'B+' || ex.grade === 'B' ? 'bg-indigo-100 text-indigo-800' :
                      ex.grade === 'C' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {ex.grade}
                    </span>
                  </td>
                  <td className="p-4">
                    <RiskBadge level={ex.riskLevel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <ExamScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
