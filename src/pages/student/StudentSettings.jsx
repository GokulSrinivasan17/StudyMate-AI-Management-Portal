import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Settings, Bell, Shield, Lock, Moon, Sun, Check } from 'lucide-react';

export const StudentSettings = () => {
  const { addToast } = useToast();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [aiAlerts, setAiAlerts] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Account preferences updated!', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Student Settings</h1>
        <p className="text-xs text-slate-500 font-medium">Manage notifications, security, and interface preferences</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-xs">
        {/* Notification Settings */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" /> Notifications & Alerts
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <div>
                <span className="font-semibold text-slate-900 block">AI Threshold Warning Alerts</span>
                <span className="text-[11px] text-slate-500">Notify when attendance drops below 75%</span>
              </div>
              <input type="checkbox" checked={aiAlerts} onChange={e => setAiAlerts(e.target.checked)} className="w-4 h-4 rounded text-indigo-600" />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer">
              <div>
                <span className="font-semibold text-slate-900 block">Email Notifications</span>
                <span className="text-[11px] text-slate-500">Receive weekly academic progress digest</span>
              </div>
              <input type="checkbox" checked={emailAlerts} onChange={e => setEmailAlerts(e.target.checked)} className="w-4 h-4 rounded text-indigo-600" />
            </label>
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-600" /> Security & Password
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md">
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
