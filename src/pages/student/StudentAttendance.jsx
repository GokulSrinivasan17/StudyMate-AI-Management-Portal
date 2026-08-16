import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { ProgressBar } from '../../components/common/ProgressBar';
import { StatCard } from '../../components/common/StatCard';
import { CalendarCheck, AlertTriangle, CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const StudentAttendance = () => {
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    studentService.getAttendance().then(data => setAttendance(data));
  }, []);

  if (!attendance) return <div className="p-8 text-center text-slate-500">Loading Attendance Analytics...</div>;

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Attendance Intelligence</h1>
        <p className="text-xs text-slate-500 font-medium">Subject-wise tracking, eligibility threshold warnings, and weekly trends</p>
      </div>

      {/* Top 4 Attendance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Overall Attendance" value={`${attendance.overallPercentage}%`} subtext="Threshold: 75%" icon={CalendarCheck} color="amber" />
        <StatCard title="Present Classes" value={attendance.presentClasses} subtext="Total: 120" icon={CheckCircle2} color="emerald" />
        <StatCard title="Absent Classes" value={attendance.absentClasses} subtext="Includes Medical" icon={XCircle} color="rose" />
        <StatCard title="Late Arrivals" value={attendance.lateClasses} subtext="Grace period" icon={Info} color="indigo" />
      </div>

      {/* AI Attendance Warning Banner if Mathematics is < 75 */}
      {attendance.subjects.some(s => s.percentage < 75) && (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl flex items-start gap-4 shadow-sm">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-xs">
            <span className="font-extrabold text-amber-900 uppercase tracking-wider text-[11px] block">
              AI Threshold Warning Flag
            </span>
            <p className="text-amber-900 font-bold text-sm">
              Your Mathematics attendance is currently 68%, below the mandatory 75% examination eligibility requirement.
            </p>
            <p className="text-amber-800">
              AI Recommendation: Attend all 4 upcoming scheduled lectures to raise your subject attendance to 75.5%.
            </p>
          </div>
        </div>
      )}

      {/* Subject Wise Progress Breakdown */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="font-bold text-slate-900 text-lg">Subject-Wise Attendance Breakdown</h3>

        <div className="space-y-5">
          {attendance.subjects.map(sub => (
            <div key={sub.subjectId} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{sub.subjectName}</h4>
                  <p className="text-[11px] text-slate-500">{sub.teacher}</p>
                </div>
                <span className={`font-bold px-2.5 py-1 rounded-full text-[11px] ${
                  sub.percentage >= 85 ? 'bg-emerald-100 text-emerald-800' :
                  sub.percentage >= 75 ? 'bg-indigo-100 text-indigo-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {sub.percentage}% ({sub.present}/{sub.total} Held)
                </span>
              </div>

              <ProgressBar value={sub.percentage} showPercentage={false} />

              {sub.percentage < 75 && (
                <p className="text-[11px] text-amber-700 font-medium bg-amber-50 p-2 rounded-lg border border-amber-200">
                  ⚠️ {sub.aiAlert}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Trend Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Weekly Attendance Trend History</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={attendance.trendHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '11px' }} />
              <Area type="monotone" dataKey="attendance" stroke="#f59e0b" strokeWidth={3} fill="#fef3c7" name="Attendance (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
