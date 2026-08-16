import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { StatCard } from '../../components/common/StatCard';
import { RiskBadge } from '../../components/common/RiskBadge';
import {
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  FileText,
  Award,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    adminService.getDashboard().then(res => setData(res));
  }, []);

  if (!data) return <div className="p-8 text-center text-slate-500">Loading Institutional Intelligence Dashboard...</div>;

  const growthData = [
    { month: 'Jan', students: 1100, passRate: 92 },
    { month: 'Feb', students: 1150, passRate: 93 },
    { month: 'Mar', students: 1180, passRate: 91 },
    { month: 'Apr', students: 1220, passRate: 94 },
    { month: 'May', students: 1250, passRate: 95 }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Institutional Executive Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium">System-wide academic intelligence, student growth, and AI model oversight</p>
        </div>
      </div>

      {/* Top 8 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={data.stats.totalStudents} subtext="Enrolled across 5 Depts" icon={GraduationCap} color="indigo" />
        <StatCard title="Total Faculty" value={data.stats.totalTeachers} subtext="Active Professors" icon={Users} color="emerald" />
        <StatCard title="Total Courses" value={data.stats.totalCourses} subtext="Accredited Modules" icon={BookOpen} color="purple" />
        <StatCard title="Active Classes" value={data.stats.totalClasses} subtext="Sections" icon={Layers} color="amber" />
        <StatCard title="Assignments" value={data.stats.totalAssignments} subtext="Issued this Term" icon={FileText} color="indigo" />
        <StatCard title="Exams Conducted" value={data.stats.totalExams} subtext="Midterms & Quizzes" icon={Award} color="emerald" />
        <StatCard title="At-Risk Students" value={data.stats.atRiskStudents} subtext="Requires Intervention" icon={AlertTriangle} color="rose" />
        <StatCard title="Inst. Average" value={data.stats.avgInstitutionPerformance} subtext="Overall Performance" icon={TrendingUp} color="purple" />
      </div>

      {/* Recharts Risk Distribution & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Donut Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Institution Risk Distribution</h3>
            <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              AI CLASSIFIED
            </span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low Risk (1198)</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium Risk (38)</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> High Risk (10)</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-900" /> Critical (4)</div>
          </div>
        </div>

        {/* Student Growth Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Student Enrollment & Pass Rate Growth</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="students" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Total Students" />
                <Bar dataKey="passRate" fill="#10b981" radius={[6, 6, 0, 0]} name="Pass Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
