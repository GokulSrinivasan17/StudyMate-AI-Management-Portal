import React from 'react';
import { useToast } from '../../context/ToastContext';

export const AdminSettings = () => {
  const { addToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    addToast('System settings saved!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Platform Settings</h1>
        <p className="text-xs text-slate-500 font-medium">Configure FastAPI backend URL, JWT authentication parameters, and system backups</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">FastAPI Backend Endpoint</label>
          <input type="text" defaultValue="http://localhost:8000/api" className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-mono text-slate-800" />
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button type="submit" className="bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md">
            Save System Config
          </button>
        </div>
      </form>
    </div>
  );
};
