import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Mail, Phone, Building, Award, Calendar, Lock, Edit, Check } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Harish Kolanjiyappan",
    email: user?.email || "student@smartedu.ai",
    phone: user?.phone || "+91 98765 43210",
    department: user?.department || "Computer Science and Engineering",
    year: user?.year || "2nd Year",
    semester: user?.semester || "4th Semester",
    college: user?.college || "SmartEdu Institute of Technology"
  });

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    addToast('Profile information updated successfully!', 'success', 'Profile Saved');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Student Profile</h1>
          <p className="text-xs text-slate-500 font-medium">Manage academic identification & personal details</p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
        >
          {editing ? <Check className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
          <span>{editing ? "Editing Mode" : "Edit Profile"}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-center space-y-3 md:border-r border-slate-100 pr-4">
          <img src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"} alt={formData.name} className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-indigo-100 shadow-md" />
          <div>
            <h3 className="font-bold text-lg text-slate-900">{formData.name}</h3>
            <p className="text-xs text-indigo-600 font-bold mt-0.5">{user?.id || "STU-2026-001"}</p>
            <span className="inline-block bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-2">
              CGPA: {user?.cgpa || 8.04}
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="md:col-span-2 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                disabled={!editing}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-80"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled={!editing}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                disabled={!editing}
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-80"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Year & Semester</label>
              <input
                type="text"
                disabled={!editing}
                value={`${formData.year} - ${formData.semester}`}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-80"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">College Institution</label>
            <input
              type="text"
              disabled={!editing}
              value={formData.college}
              onChange={e => setFormData({ ...formData, college: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-80"
            />
          </div>

          {editing && (
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
