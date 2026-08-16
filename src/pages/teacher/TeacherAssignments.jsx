import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';
import { assignmentService } from '../../services/assignmentService';
import { Plus, FileText, CheckCircle2, Clock } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const TeacherAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('2026-08-28');
  const [description, setDescription] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    assignmentService.getAssignments().then(data => setAssignments(data));
  }, []);

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const newAsn = {
      id: `ASN-2026-${Math.floor(100 + Math.random() * 900)}`,
      title,
      courseName: "Data Structures & Algorithms",
      teacher: "Dr. Aris Thorne",
      dueDate,
      maxMarks: 100,
      status: "Pending",
      description,
      priority: "Medium"
    };
    setAssignments([newAsn, ...assignments]);
    addToast(`Assignment "${title}" posted to students!`, 'success', 'Assignment Published');
    setModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Assignment Management</h1>
          <p className="text-xs text-slate-500 font-medium">Create coursework, review student submissions, and assign grades</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assignments.map(asn => (
          <div key={asn.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded">
                {asn.courseName}
              </span>
              <h3 className="font-bold text-base text-slate-900">{asn.title}</h3>
              <p className="text-xs text-slate-500 max-w-2xl">{asn.description}</p>
              <div className="text-[11px] text-slate-400 font-medium">Due Date: {asn.dueDate} | Max Marks: {asn.maxMarks}</div>
            </div>

            <button
              onClick={() => addToast(`Reviewing submissions for "${asn.title}"`, 'info')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-4 py-2 rounded-xl"
            >
              Grade Submissions
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Assignment">
        <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Assignment Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Unit 4 Graph Traversals & Shortest Path"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Due Date *</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description & Instructions *</label>
            <textarea
              rows={3}
              required
              placeholder="Detailed instructions for students..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600">Cancel</button>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md">Publish Assignment</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
