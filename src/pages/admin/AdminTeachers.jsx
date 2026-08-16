import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Users, Plus, Star } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('Assistant Professor');
  const { addToast } = useToast();

  useEffect(() => {
    adminService.getTeachers().then(data => setTeachers(data));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const newT = {
      id: `TCH-2026-${Math.floor(100 + Math.random() * 900)}`,
      name,
      title,
      department: "Computer Science and Engineering",
      studentsCount: 90,
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    };
    setTeachers([newT, ...teachers]);
    addToast(`Added faculty member "${name}"`, 'success');
    setModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Faculty & Teacher Directory</h1>
          <p className="text-xs text-slate-500 font-medium">Manage academic professors, course assignments, and performance ratings</p>
        </div>

        <button onClick={() => setModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Faculty Member
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
            <tr>
              <th className="p-4">Faculty Name</th>
              <th className="p-4">ID</th>
              <th className="p-4">Title</th>
              <th className="p-4">Department</th>
              <th className="p-4">Students Mentored</th>
              <th className="p-4">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {teachers.map(t => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover border" />
                  <span className="font-bold text-slate-900">{t.name}</span>
                </td>
                <td className="p-4 font-mono">{t.id}</td>
                <td className="p-4">{t.title}</td>
                <td className="p-4 text-slate-500">{t.department}</td>
                <td className="p-4 font-bold">{t.studentsCount}</td>
                <td className="p-4 text-amber-500 font-bold">★ {t.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Faculty Member">
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Faculty Name *</label>
            <input type="text" required placeholder="Dr. Jane Doe" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600">Cancel</button>
            <button type="submit" className="bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md">Add Faculty</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
