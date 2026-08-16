import React from 'react';
import { CalendarCheck, AlertTriangle, Users, Building } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { mockStudents } from '../../data/students';

export const AdminAttendance = () => {
  const lowAttendanceStudents = mockStudents.filter(s => s.attendance < 75);

  const deptAttendance = [
    { dept: 'AI & DS', attendance: 86 },
    { dept: 'MECH', attendance: 84 },
    { dept: 'CSE', attendance: 82 },
    { dept: 'IT', attendance: 80 },
    { dept: 'ECE', attendance: 78 }
  ];

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Institutional Attendance Oversight</h1>
        <p className="text-xs text-slate-500 font-medium">Department-wide attendance tracking and mandatory 75% eligibility compliance audit</p>
      </div>

      {/* Overview Stat Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-slate-50 p-4 rounded-2xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Overall Inst. Attendance</span>
          <p className="font-extrabold text-emerald-600 text-2xl mt-0.5">84.2%</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Mandatory Threshold</span>
          <p className="font-extrabold text-slate-900 text-2xl mt-0.5">75.0%</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
          <span className="text-[10px] font-bold text-amber-700 uppercase">Students Below 75%</span>
          <p className="font-extrabold text-amber-900 text-2xl mt-0.5">34 Students</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Department Attendance Averages</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptAttendance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="dept" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }} />
              <Bar dataKey="attendance" fill="#10b981" radius={[6, 6, 0, 0]} name="Avg Attendance (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Attendance Audit Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> Low Attendance Flagged Students (&lt;75%)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">ID</th>
                <th className="p-4">Department</th>
                <th className="p-4">Attendance %</th>
                <th className="p-4">Exam Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {lowAttendanceStudents.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{s.name}</td>
                  <td className="p-4 font-mono">{s.id}</td>
                  <td className="p-4 text-slate-500">{s.department}</td>
                  <td className="p-4 font-bold text-rose-600">{s.attendance}%</td>
                  <td className="p-4 font-bold text-amber-700 bg-amber-50 rounded-full w-fit">Pending Remedial</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
