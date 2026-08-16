import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { ExamHeader } from '../../components/exams/ExamHeader';
import { ExamInfoCard } from '../../components/exams/ExamInfoCard';
import { MarksWorkflow } from '../../components/exams/MarksWorkflow';
import { ExamSummaryCards } from '../../components/exams/ExamSummaryCards';
import { GradeDistributionChart } from '../../components/exams/GradeDistributionChart';
import { PassFailChart } from '../../components/exams/PassFailChart';
import { PerformanceBarChart } from '../../components/exams/PerformanceBarChart';
import { PerformanceFlow } from '../../components/exams/PerformanceFlow';
import { PerformanceRadarChart } from '../../components/exams/PerformanceRadarChart';
import { AIExamInsight } from '../../components/exams/AIExamInsight';
import { ResultReviewPanel } from '../../components/exams/ResultReviewPanel';
import { PublishResultModal } from '../../components/exams/PublishResultModal';
import { GradeBadge } from '../../components/exams/GradeBadge';
import { ResultBadge } from '../../components/exams/ResultBadge';
import { Search, AlertTriangle, CheckCircle2, User, Filter, Download } from 'lucide-react';

export const TeacherExams = () => {
  const { addToast } = useToast();
  const [status, setStatus] = useState('Under Review');
  const [currentStep, setCurrentStep] = useState(4);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Demo Students Data (10 sample rows representing 60 total)
  const [students, setStudents] = useState([
    { id: 'KITCSE001', name: 'Harish Kolanjiyappan', attendance: 82, assignment: 87, internal: 24, examMarks: 68, risk: 'MEDIUM' },
    { id: 'KITCSE002', name: 'Ananya Sharma', attendance: 94, assignment: 95, internal: 25, examMarks: 73, risk: 'LOW' },
    { id: 'KITCSE003', name: 'Rohan Verma', attendance: 96, assignment: 98, internal: 25, examMarks: 73, risk: 'LOW' },
    { id: 'KITCSE004', name: 'Priya Sundaram', attendance: 88, assignment: 90, internal: 23, examMarks: 62, risk: 'LOW' },
    { id: 'KITCSE005', name: 'Karthik Raja', attendance: 64, assignment: 52, internal: 14, examMarks: 17, risk: 'CRITICAL' },
    { id: 'KITCSE006', name: 'Deepak Kumar', attendance: 78, assignment: 80, internal: 21, examMarks: 52, risk: 'MEDIUM' },
    { id: 'KITCSE007', name: 'Divya Nambiar', attendance: 90, assignment: 92, internal: 24, examMarks: 68, risk: 'LOW' },
    { id: 'KITCSE008', name: 'Siddharth Patel', attendance: 85, assignment: 84, internal: 22, examMarks: 58, risk: 'MEDIUM' },
    { id: 'KITCSE009', name: 'Meera Krishnan', attendance: 92, assignment: 91, internal: 24, examMarks: 64, risk: 'LOW' },
    { id: 'KITCSE010', name: 'Vikram Seth', attendance: 70, assignment: 68, internal: 18, examMarks: 34, risk: 'HIGH' },
  ]);

  // Helper grade calculation function
  const computeResult = (internal, examMarks) => {
    const total = Math.min(100, Math.max(0, internal + examMarks));
    const percentage = total;
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C';
    else if (percentage >= 40) grade = 'D';

    const result = percentage >= 40 ? 'PASS' : 'FAIL';
    return { total, percentage, grade, result };
  };

  // Handle Inline Marks Modification with Real-time Validation
  const handleExamMarksChange = (id, newMarks) => {
    const val = parseInt(newMarks, 10);
    if (isNaN(val)) return;

    if (val > 100 || val < 0) {
      addToast('Marks cannot exceed 100 or be less than 0.', 'error', 'Validation Error');
    }

    setStudents(prev =>
      prev.map(st => (st.id === id ? { ...st, examMarks: Math.min(100, Math.max(0, val)), error: val > 100 || val < 0 } : st))
    );
  };

  // Actions
  const handleSaveDraft = () => {
    addToast('Exam marks draft saved locally.', 'success');
  };

  const handleSubmitMarks = () => {
    setCurrentStep(5);
    addToast('Marks submitted for academic audit analysis.', 'success');
  };

  const handleExport = () => {
    addToast('Exam results PDF/Excel report generated.', 'info');
  };

  const filteredStudents = students.filter(
    st => st.name.toLowerCase().includes(searchQuery.toLowerCase()) || st.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* 1. Header with Actions */}
      <ExamHeader
        status={status}
        onSaveDraft={handleSaveDraft}
        onSubmitMarks={handleSubmitMarks}
        onPublish={() => setPublishModalOpen(true)}
        onExport={handleExport}
      />

      {/* 2. Exam Info Horizontal Card */}
      <ExamInfoCard />

      {/* 3. Mark Entry 7-Node Workflow Stepper */}
      <MarksWorkflow currentStep={currentStep} />

      {/* 4. Class Performance Summary Cards */}
      <ExamSummaryCards />

      {/* 5. Marks Entry Table with Inline Editing */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Student Examination Marks Registry</h3>
            <p className="text-xs text-slate-500">Edit exam marks inline to auto-calculate totals, grades, and pass/fail status</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search student or ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-xl text-xs focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">No.</th>
                <th className="p-4">Student ID</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Att. %</th>
                <th className="p-4">Assign %</th>
                <th className="p-4">Internal (25)</th>
                <th className="p-4">Exam Marks (75)</th>
                <th className="p-4">Total</th>
                <th className="p-4">Percentage</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Result</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredStudents.map((st, idx) => {
                const computed = computeResult(st.internal, st.examMarks);
                const isSelected = selectedStudent?.id === st.id;

                return (
                  <tr
                    key={st.id}
                    className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-indigo-50/60' : ''}`}
                  >
                    <td className="p-4 font-mono text-slate-400">0{idx + 1}</td>
                    <td className="p-4 font-mono font-bold text-slate-900">{st.id}</td>
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <span>{st.name}</span>
                      {st.risk === 'CRITICAL' && (
                        <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-rose-600" /> High Risk
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-mono">{st.attendance}%</td>
                    <td className="p-4 font-mono">{st.assignment}%</td>
                    <td className="p-4 font-mono">{st.internal}</td>

                    {/* Inline Marks Input */}
                    <td className="p-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={st.examMarks}
                        onChange={e => handleExamMarksChange(st.id, e.target.value)}
                        className={`w-16 px-2 py-1 font-mono font-bold text-center border rounded-lg focus:outline-none ${
                          st.error ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-indigo-300 bg-indigo-50/30 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'
                        }`}
                      />
                    </td>

                    <td className="p-4 font-extrabold font-mono text-slate-900">{computed.total}</td>
                    <td className="p-4 font-bold font-mono text-indigo-600">{computed.percentage}%</td>
                    <td className="p-4">
                      <GradeBadge grade={computed.grade} />
                    </td>
                    <td className="p-4">
                      <ResultBadge result={computed.result} />
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedStudent({ ...st, ...computed })}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
                      >
                        Inspect Flow
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Charts Grid (Grade Distribution Donut + Pass/Fail Pie) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GradeDistributionChart totalStudents={60} />
        <PassFailChart passCount={56} failCount={4} />
      </div>

      {/* 7. Class Performance Bar Chart */}
      <PerformanceBarChart />

      {/* 8. Performance Flow (Selected or Default Student) */}
      <PerformanceFlow selectedStudent={selectedStudent} />

      {/* 9. Skill Radar Chart */}
      <PerformanceRadarChart student={selectedStudent} />

      {/* 10. AI Exam Insight Card */}
      <AIExamInsight />

      {/* 11. Pre-Publish Review Panel */}
      <ResultReviewPanel
        totalStudents={60}
        enteredCount={60}
        passCount={56}
        failCount={4}
        avgScore={74.8}
        onPublish={() => setPublishModalOpen(true)}
      />

      {/* 12. Animated Publish Result Modal */}
      <PublishResultModal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        onComplete={() => setStatus('Published')}
      />
    </div>
  );
};
