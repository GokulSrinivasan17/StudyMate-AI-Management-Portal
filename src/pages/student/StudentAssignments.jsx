import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { assignmentService } from '../../services/assignmentService';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { FileText, Upload, CheckCircle2, Clock, AlertTriangle, FileUp } from 'lucide-react';

export const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedAsn, setSelectedAsn] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [submissionText, setSubmissionText] = useState('');
  const [fileName, setFileName] = useState('');

  const { addToast } = useToast();

  useEffect(() => {
    studentService.getAssignments().then(data => setAssignments(data));
  }, []);

  const filtered = assignments.filter(asn => {
    if (activeTab === 'All') return true;
    return asn.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handleOpenSubmit = (asn) => {
    setSelectedAsn(asn);
    setSubmissionText('');
    setFileName('');
    setUploadModalOpen(true);
  };

  const handleCompleteSubmission = (e) => {
    e.preventDefault();
    if (!selectedAsn) return;

    assignmentService.submitAssignment(selectedAsn.id, { text: submissionText, file: fileName }).then(() => {
      setAssignments(prev =>
        prev.map(a => (a.id === selectedAsn.id ? { ...a, status: 'Submitted', score: null } : a))
      );
      addToast(`Assignment "${selectedAsn.title}" submitted successfully!`, 'success', 'Submission Uploaded');
      setUploadModalOpen(false);
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Academic Assignments</h1>
        <p className="text-xs text-slate-500 font-medium">Manage pending coursework, submit assignments, and review feedback</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        {['All', 'Pending', 'Submitted', 'Overdue', 'Completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Assignment List Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map(asn => (
          <div key={asn.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                  {asn.courseName}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    asn.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                    asn.status === 'Submitted' ? 'bg-indigo-100 text-indigo-800' :
                    asn.status === 'Overdue' ? 'bg-rose-100 text-rose-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {asn.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{asn.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{asn.description}</p>
              
              <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                <span>Instructor: {asn.teacher}</span>
                <span>Due Date: {asn.dueDate}</span>
                {asn.score !== null && <span className="text-emerald-600 font-bold">Score: {asn.score}/{asn.maxMarks}</span>}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              {asn.status === 'Pending' || asn.status === 'Overdue' ? (
                <button
                  onClick={() => handleOpenSubmit(asn)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>Submit Now</span>
                </button>
              ) : (
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 bg-slate-100 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Submitted
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      <Modal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} title={`Submit Assignment — ${selectedAsn?.title}`}>
        <form onSubmit={handleCompleteSubmission} className="space-y-4 text-xs">
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <h4 className="font-bold text-slate-900">{selectedAsn?.title}</h4>
            <p className="text-slate-600 mt-1">{selectedAsn?.description}</p>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Text Response / Notes</label>
            <textarea
              rows={3}
              placeholder="Enter your response summary or step-by-step notes..."
              value={submissionText}
              onChange={e => setSubmissionText(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Upload File (PDF / Code / ZIP)</label>
            <input
              type="file"
              onChange={e => setFileName(e.target.files[0]?.name || 'submitted_file.pdf')}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={() => setUploadModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600">
              Cancel
            </button>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md">
              Confirm Submission
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
