import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';
import { StatCard } from '../../components/common/StatCard';
import { RiskBadge } from '../../components/common/RiskBadge';
import { AIAnalysisModal } from '../../components/ai/AIAnalysisModal';
import { InterventionPlanModal } from '../../components/ai/InterventionPlanModal';
import { Users, CalendarCheck, BarChart2, AlertTriangle, Sparkles, ArrowRight, FilePlus } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export const TeacherDashboard = () => {
  const [data, setData] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [interventionOpen, setInterventionOpen] = useState(false);

  useEffect(() => {
    teacherService.getDashboard().then(res => setData(res));
  }, []);

  if (!data) return <div className="p-8 text-center text-slate-500">Loading Faculty Intelligence Dashboard...</div>;

  const classData = [
    { class: 'CSE 2A', attendance: 86, avgScore: 78, riskCount: 2 },
    { class: 'CSE 3B', attendance: 89, avgScore: 82, riskCount: 1 },
    { class: 'IT 2A', attendance: 82, avgScore: 74, riskCount: 3 }
  ];

  const handleAnalyze = (student) => {
    setSelectedStudent(student);
    setAnalysisOpen(true);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Good morning, Professor 👋</h1>
          <p className="text-xs text-slate-500 font-medium">Class intelligence, attendance trends & AI intervention triggers</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Students" value={data.stats.totalStudents} subtext="Across 2 Sections" icon={Users} color="indigo" />
        <StatCard title="Average Attendance" value={data.stats.averageAttendance} subtext="Target >=85%" icon={CalendarCheck} color="emerald" />
        <StatCard title="Average Class Score" value={data.stats.averageScore} subtext="Midterm Average" icon={BarChart2} color="purple" />
        <StatCard title="At-Risk Students" value={data.stats.atRiskStudents} subtext="Requires Attention" icon={AlertTriangle} color="rose" />
      </div>

      {/* Class Performance Recharts Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-lg">Class Section Comparison (Attendance vs Score)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="class" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="attendance" fill="#10b981" radius={[6, 6, 0, 0]} name="Avg Attendance (%)" />
              <Bar dataKey="avgScore" fill="#9333ea" radius={[6, 6, 0, 0]} name="Avg Midterm Score (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Students Requiring Attention */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" /> Students Flagged by AI Risk Model
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.studentsAtRisk.map(s => (
            <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-full object-cover border" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{s.name}</h4>
                  <p className="text-[11px] text-slate-500">{s.department} | {s.year}</p>
                  <p className="text-[10px] text-rose-600 font-bold mt-0.5">Weak: {s.weakSubject}</p>
                </div>
              </div>

              <div className="text-right space-y-2">
                <RiskBadge level={s.riskLevel} score={s.riskScore} />
                <button
                  onClick={() => handleAnalyze(s)}
                  className="block bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                >
                  Analyze & Intervene
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AIAnalysisModal
        isOpen={analysisOpen}
        onClose={() => setAnalysisOpen(false)}
        student={selectedStudent}
        onCreateIntervention={(st) => {
          setSelectedStudent(st);
          setInterventionOpen(true);
        }}
      />

      <InterventionPlanModal
        isOpen={interventionOpen}
        onClose={() => setInterventionOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
};
