import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';
import { Users, CalendarCheck, BarChart2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TeacherClasses = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    teacherService.getClasses().then(data => setClasses(data));
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Class Sections Oversight</h1>
        <p className="text-xs text-slate-500 font-medium">Batch metrics, section performance, and attendance recording</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded">
                  {cls.course}
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-1">{cls.name}</h3>
              </div>
              <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> {cls.riskCount} At Risk
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Students</span>
                <span className="font-bold text-slate-900 text-sm">{cls.studentsCount}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Avg Attendance</span>
                <span className="font-bold text-emerald-600 text-sm">{cls.avgAttendance}%</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Avg Score</span>
                <span className="font-bold text-purple-600 text-sm">{cls.avgScore}%</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/teacher/attendance')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Mark Attendance for Section</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
