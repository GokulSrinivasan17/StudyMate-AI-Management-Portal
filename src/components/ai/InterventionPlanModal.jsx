import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useToast } from '../../context/ToastContext';
import { FileCheck, Calendar, User, AlertCircle } from 'lucide-react';

export const InterventionPlanModal = ({ isOpen, onClose, student }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    problem: student ? `Low attendance & score decline in ${student.weakSubject || 'Mathematics'}` : '',
    actionPlan: 'Mandatory remedial tutorial lab sessions & weekly progress tracking.',
    priority: 'HIGH',
    deadline: '2026-08-30',
    notes: 'Assign student mentor for peer learning support.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast(`Academic Intervention Plan created for ${student?.name || 'Student'}!`, 'success', 'Intervention Created');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Academic Intervention Plan" maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-purple-700 uppercase">Target Student</span>
            <p className="font-bold text-purple-950 text-sm">{student?.name || 'Harish Kolanjiyappan'}</p>
          </div>
          <span className="text-purple-700 font-mono font-semibold">{student?.id || 'STU-2026-001'}</span>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Identified Academic Problem</label>
          <input
            type="text"
            required
            value={formData.problem}
            onChange={e => setFormData({ ...formData, problem: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Recommended Action Plan</label>
          <textarea
            rows={3}
            required
            value={formData.actionPlan}
            onChange={e => setFormData({ ...formData, actionPlan: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Priority Level</label>
            <select
              value={formData.priority}
              onChange={e => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            >
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Deadline</label>
            <input
              type="date"
              required
              value={formData.deadline}
              onChange={e => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Teacher Instructions / Notes</label>
          <input
            type="text"
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button type="button" onClick={onClose} className="px-4 py-2 font-semibold text-slate-600">
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-md"
          >
            <FileCheck className="w-4 h-4" /> Save Intervention Plan
          </button>
        </div>
      </form>
    </Modal>
  );
};
