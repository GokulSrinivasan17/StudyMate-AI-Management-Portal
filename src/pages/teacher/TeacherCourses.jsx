import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';
import { BookOpen, Plus, Users, Star, Edit, Trash2 } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    teacherService.getCourses().then(data => setCourses(data));
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const newC = {
      id: `CRS-${Date.now()}`,
      title: newTitle,
      code: `CS${Math.floor(400 + Math.random() * 50)}`,
      category: "Computer Science",
      rating: 5.0,
      studentsCount: 60,
      thumbnail: "https://images.unsplash.com/photo-1516116211223-4c714194d23d?w=600&auto=format&fit=crop&q=80"
    };
    setCourses([newC, ...courses]);
    addToast(`Course "${newTitle}" created successfully!`, 'success');
    setModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Managed Faculty Courses</h1>
          <p className="text-xs text-slate-500 font-medium">Curriculum management, syllabus scheduling, and student rosters</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(c => (
          <div key={c.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{c.code}</span>
                <h3 className="font-bold text-base text-slate-900 mt-1">{c.title}</h3>
              </div>
              <span className="text-amber-500 text-xs font-bold">★ {c.rating}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
              <span><Users className="w-3.5 h-3.5 inline mr-1" /> {c.studentsCount} Students Enrolled</span>
              <button
                onClick={() => addToast(`Opening management portal for "${c.title}"`, 'info')}
                className="text-purple-600 font-bold hover:underline"
              >
                Manage Course
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Course">
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Course Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Advanced Machine Learning Systems"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 font-semibold text-slate-600">Cancel</button>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md">Create</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
