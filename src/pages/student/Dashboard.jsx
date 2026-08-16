import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { studentService } from '../../services/studentService';
import { StatCard } from '../../components/common/StatCard';
import { AIInsightCard } from '../../components/ai/AIInsightCard';
import { LiveRiskAnalyzerModal } from '../../components/ai/LiveRiskAnalyzerModal';
import { ExamScheduleModal } from '../../components/ai/ExamScheduleModal';
import {
  Award,
  CalendarCheck,
  FileCheck,
  BarChart2,
  BookOpen,
  ArrowRight,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Calendar,
  Bell,
  Mail,
  Send
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useNavigate } from 'react-router-dom';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [examScheduleOpen, setExamScheduleOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    studentService.getDashboard().then(res => setData(res));
  }, []);

  if (!data) return <div className="p-8 text-center text-slate-500 font-medium">Loading Academic Dashboard...</div>;

  const myCoursesTable = [
    { course: 'Data Structures', teacher: 'Dr. Kumar', progress: 78, attendance: 91, score: 78, isWeak: false },
    { course: 'Database Management', teacher: 'Dr. Priya', progress: 82, attendance: 85, score: 81, isWeak: false },
    { course: 'Mathematics', teacher: 'Dr. Aris', progress: 64, attendance: 68, score: 62, isWeak: true },
    { course: 'Java Programming', teacher: 'Dr. Meena', progress: 88, attendance: 88, score: 84, isWeak: false }
  ];

  const performanceTrendData = [
    { month: 'Jan', score: 72, attendance: 90 },
    { month: 'Feb', score: 75, attendance: 88 },
    { month: 'Mar', score: 79, attendance: 86 },
    { month: 'Apr', score: 74, attendance: 82 },
    { month: 'May', score: 78, attendance: 84 },
    { month: 'Jun', score: 76, attendance: 82 }
  ];

  const subjectPerformanceData = [
    { subject: 'DSA', score: 78, target: 85 },
    { subject: 'DBMS', score: 81, target: 85 },
    { subject: 'Maths', score: 62, target: 75 },
    { subject: 'Java', score: 84, target: 85 },
    { subject: 'AI/ML', score: 86, target: 90 }
  ];

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* Dashboard Hero Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || "Harish"} 👋
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Here's your personal academic performance overview & integrated AI intelligence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setExamScheduleOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 hover:scale-105"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>Gemini AI Exam Schedule</span>
          </button>

          <button
            onClick={() => setLiveModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 animate-pulse hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Run Live AI Risk Analysis</span>
          </button>
        </div>
      </div>

      {/* NEW: Gemini AI Exam Schedule & Reminders Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl border border-indigo-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Powered by Google Gemini AI & Telegram/Email Reminders
          </div>
          <h2 className="text-xl font-extrabold">📅 Gemini AI Exam Schedule & Reminders Engine</h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            Generates day-by-day revision schedules for upcoming exams tailored to your weak subjects, and dispatches daily study task reminders via Gmail SMTP (<code className="text-indigo-300 font-mono">studymate.hackathon@gmail.com</code>) & Telegram Bot (<code className="text-indigo-300 font-mono">8721806166:AAGv...</code>).
          </p>
        </div>

        <button
          onClick={() => setExamScheduleOpen(true)}
          className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs px-6 py-3.5 rounded-2xl transition-all shadow-lg shrink-0 flex items-center gap-2.5 hover:scale-105 active:scale-95 relative z-10"
        >
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span>Launch Exam Schedule & Dispatch Reminders</span>
        </button>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Overall CGPA"
          value="8.04"
          subtext="Rank: Top 15% in Dept"
          icon={Award}
          color="indigo"
          change="+0.12"
          changeType="positive"
        />
        <StatCard
          title="Overall Attendance"
          value="82%"
          subtext="Threshold: 75% required"
          icon={CalendarCheck}
          color="amber"
          change="-4%"
          changeType="negative"
        />
        <StatCard
          title="Average Marks"
          value="76%"
          subtext="Across 5 Core Subjects"
          icon={BarChart2}
          color="purple"
          change="-2%"
          changeType="negative"
        />
        <StatCard
          title="Assignment Rate"
          value="87%"
          subtext="26 of 30 Completed"
          icon={FileCheck}
          color="emerald"
          change="+2%"
          changeType="positive"
        />
      </div>

      {/* AI Academic Insight Hero Card */}
      <AIInsightCard
        data={data.aiInsightCard}
        onTriggerPrediction={() => navigate('/student/prediction')}
      />

      {/* MY COURSES TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" /> My Enrolled Courses Overview
          </h3>
          <button onClick={() => navigate('/student/courses')} className="text-xs font-bold text-indigo-600 hover:underline">
            View All Courses
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Course</th>
                <th className="p-4">Teacher</th>
                <th className="p-4">Syllabus Progress</th>
                <th className="p-4">Attendance %</th>
                <th className="p-4">Current Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {myCoursesTable.map((row, idx) => (
                <tr key={idx} className={`hover:bg-slate-50 ${row.isWeak ? 'bg-amber-50/40' : ''}`}>
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <span>{row.course}</span>
                    {row.isWeak && (
                      <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                        Weak Subject
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-500">{row.teacher}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{row.progress}%</span>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${row.progress}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold">
                    <span className={row.attendance < 75 ? 'text-rose-600 font-bold' : 'text-emerald-600'}>
                      {row.attendance}%
                    </span>
                  </td>
                  <td className="p-4 font-extrabold font-mono text-slate-900">{row.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Academic Progression</span>
              <h3 className="text-base font-bold text-slate-900">Performance & Attendance Trend</h3>
            </div>
            <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-1 rounded-full">
              6 Months Trend
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[50, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '11px' }} />
                <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" name="Avg Score (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">Subject Breakdown</span>
              <h3 className="text-base font-bold text-slate-900">Current Score vs AI Target</h3>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[40, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', border: 'none', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="score" fill="#4f46e5" radius={[6, 6, 0, 0]} name="Current Score (%)" />
                <Bar dataKey="target" fill="#a855f7" radius={[6, 6, 0, 0]} name="AI Target (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LiveRiskAnalyzerModal isOpen={liveModalOpen} onClose={() => setLiveModalOpen(false)} />
      <ExamScheduleModal isOpen={examScheduleOpen} onClose={() => setExamScheduleOpen(false)} />
    </div>
  );
};
