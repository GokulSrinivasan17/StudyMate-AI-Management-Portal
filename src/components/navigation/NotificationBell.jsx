import React, { useState } from 'react';
import { Bell, Check, Sparkles, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useAuth();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Mathematics Assignment Pending",
      message: "Assignment 4: Partial Differential Equations is due in 4 days.",
      type: "warning",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      title: "AI Attendance Alert",
      message: "Your Mathematics attendance (68%) dropped below 75% threshold.",
      type: "ai",
      time: "5 hours ago",
      read: false
    },
    {
      id: 3,
      title: "Exam Marks Published",
      message: "Midterm DBMS Assessment score published: 81/100 (Grade A).",
      type: "success",
      time: "1 day ago",
      read: true
    },
    {
      id: 4,
      title: "High Risk Students Detected",
      message: "7 students are currently flagged as High Academic Risk.",
      type: "alert",
      time: "2 days ago",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
              {unreadCount > 0 && (
                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button
              onClick={markAllRead}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Mark all read
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.map(item => (
              <div
                key={item.id}
                className={`p-4 text-xs transition-colors hover:bg-slate-50 ${
                  !item.read ? 'bg-indigo-50/30' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    {item.type === 'ai' && <Sparkles className="w-4 h-4 text-purple-600" />}
                    {item.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-600" />}
                    {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {item.type === 'alert' && <FileText className="w-4 h-4 text-rose-600" />}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-slate-900">{item.title}</h5>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{item.message}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
