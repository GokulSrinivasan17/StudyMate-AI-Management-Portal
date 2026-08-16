import React from 'react';
import { ChevronRight, CalendarCheck, FileText, CheckSquare, Award, Percent, Star, CheckCircle2 } from 'lucide-react';

export const PerformanceFlow = ({ selectedStudent }) => {
  const student = selectedStudent || {
    name: "Harish Kolanjiyappan",
    attendance: "82%",
    assignments: "87%",
    internal: "24/25",
    exam: "68/75",
    finalScore: "92%",
    grade: "A+",
    result: "PASS"
  };

  const stages = [
    { title: 'ATTENDANCE', value: student.attendance, icon: CalendarCheck, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { title: 'ASSIGNMENTS', value: student.assignments, icon: FileText, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { title: 'INTERNAL', value: student.internal, icon: CheckSquare, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { title: 'EXAM', value: student.exam, icon: Award, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { title: 'FINAL SCORE', value: student.finalScore, icon: Percent, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { title: 'GRADE', value: student.grade, icon: Star, color: 'text-purple-700 bg-purple-100 border-purple-300' },
    { title: 'RESULT', value: student.result, icon: CheckCircle2, color: 'text-emerald-800 bg-emerald-100 border-emerald-300' }
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Academic Pipeline</span>
          <h3 className="text-base font-bold text-slate-900">Student Academic Performance Flow ({student.name})</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 items-center">
        {stages.map((stg, idx) => {
          const Icon = stg.icon;
          return (
            <React.Fragment key={idx}>
              <div className={`p-4 rounded-2xl border ${stg.color} flex flex-col items-center justify-center text-center space-y-1 transition-all hover:scale-105 shadow-2xs`}>
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[9px] font-extrabold uppercase tracking-wider block">{stg.title}</span>
                <span className="text-sm font-extrabold font-mono">{stg.value}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
