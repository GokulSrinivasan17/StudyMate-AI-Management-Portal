import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';
import { RiskBadge } from '../../components/common/RiskBadge';
import { AIAnalysisModal } from '../../components/ai/AIAnalysisModal';
import { InterventionPlanModal } from '../../components/ai/InterventionPlanModal';
import { Search, Sparkles, User, FilePlus } from 'lucide-react';

export const TeacherStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [interventionOpen, setInterventionOpen] = useState(false);

  useEffect(() => {
    teacherService.getStudents().then(data => setStudents(data));
  }, []);

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase()));

  const handleAnalyze = (s) => {
    setSelectedStudent(s);
    setAnalysisOpen(true);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Class Student Directory</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time attendance scores, risk flags, and deep AI analysis triggers</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search student name or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">ID</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Average Score</th>
                <th className="p-4">Risk Level</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover border" />
                    <div>
                      <span className="font-bold text-slate-900 block">{s.name}</span>
                      <span className="text-[10px] text-slate-400">{s.department}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono">{s.id}</td>
                  <td className="p-4 font-bold">{s.attendance}%</td>
                  <td className="p-4 font-bold">{s.averageScore}%</td>
                  <td className="p-4">
                    <RiskBadge level={s.riskLevel} score={s.riskScore} />
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleAnalyze(s)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                    >
                      AI Analysis
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
