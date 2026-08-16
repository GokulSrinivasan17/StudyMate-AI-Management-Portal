import React from 'react';
import { BookOpen, Calendar, Users, Award, GraduationCap, Building } from 'lucide-react';

export const ExamInfoCard = ({ info }) => {
  const data = info || {
    examName: "Internal Assessment 2",
    course: "Data Structures",
    courseCode: "CS2304",
    className: "CSE - II Year A",
    department: "Computer Science and Engineering",
    semester: "Semester IV",
    examDate: "20 Aug 2026",
    maxMarks: 100,
    teacher: "Dr. Aris",
    studentsCount: 60
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Award className="w-32 h-32 text-indigo-400" />
      </div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Exam Name</span>
          <p className="font-extrabold text-white text-sm">{data.examName}</p>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Course & Code</span>
          <p className="font-bold text-indigo-300">{data.course}</p>
          <span className="font-mono text-[10px] bg-indigo-900/60 text-indigo-200 px-2 py-0.5 rounded mt-0.5 inline-block">
            {data.courseCode}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Class Section</span>
          <p className="font-bold text-white">{data.className}</p>
          <span className="text-[10px] text-slate-400 block">{data.department}</span>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Exam Date</span>
          <p className="font-bold text-emerald-400 font-mono">{data.examDate}</p>
          <span className="text-[10px] text-slate-400">{data.semester}</span>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Maximum Marks</span>
          <p className="font-extrabold text-amber-400 font-mono text-base">{data.maxMarks} Marks</p>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Students Enrolled</span>
          <p className="font-bold text-white text-base">{data.studentsCount} Students</p>
          <span className="text-[10px] text-slate-400">Faculty: {data.teacher}</span>
        </div>
      </div>
    </div>
  );
};
