import React from 'react';
import { useToast } from '../../context/ToastContext';

export const TeacherSettings = () => {
  const { addToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Faculty preferences saved successfully!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Faculty Settings</h1>
        <p className="text-xs text-slate-500 font-medium">Manage alert thresholds, office hours, and notification preferences</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">AI Risk Alert Sensitivity</label>
          <select className="w-full px-3 py-2 bg-slate-50 border rounded-xl">
            <option>High Sensitivity (Flag students below 75% attendance)</option>
            <option>Standard Sensitivity (Flag students below 70% attendance)</option>
          </select>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button type="submit" className="bg-purple-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md">
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
