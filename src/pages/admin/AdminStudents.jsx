import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { RiskBadge } from '../../components/common/RiskBadge';
import { Search, Plus, Download, Edit, Trash2 } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Computer Science and Engineering');
  const { addToast } = useToast();

  useEffect(() => {
    adminService.getStudents().then(data => setStudents(data));
  }, []);

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase()));

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newS = {
      id: `STU-2026-${Math.floor(100 + Math.random() * 900)}`,
      name,
      department,
      year: "1st Year",
      attendance: 85,
      cgpa: 8.0,
      riskLevel: "LOW",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    };
    setStudents([newS, ...students]);
    addToast(`Added student "${name}" to directory!`, 'success');
    setModalOpen(false);
    setName('');
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    addToast('Student record deleted.', 'info');
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Student Directory Management</h1>
          <p className="text-xs text-slate-500 font-medium">Institution-wide student CRUD, department filters, and AI risk status</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => addToast('Exporting student directory CSV...', 'info')} className="bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl border flex items-center gap-1.5">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={() => setModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search student or department..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-xl text-xs" />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">ID</th>
                <th className="p-4">Department</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">CGPA</th>
                <th className="p-4">Risk Level</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover border" />
                    <span className="font-bold text-slate-900">{s.name}</span>
                  </td>
                  <td className="p-4 font-mono">{s.id}</td>
                  <td className="p-4 text-slate-500">{s.department}</td>
                  <td className="p-4 font-bold">{s.attendance}%</td>
                  <td className="p-4 font-bold">{s.cgpa}</td>
                  <td className="p-4"><RiskBadge level={s.riskLevel} score={s.riskScore} /></td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleDelete(s.id)} className="p-1 text-rose-500 hover:bg-rose-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Student">
        <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
            <input type="text" required placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Department</label>
            <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl">
              <option value="Computer Science and Engineering">Computer Science and Engineering</option>
              <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600">Cancel</button>
            <button type="submit" className="bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md">Add Student</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
