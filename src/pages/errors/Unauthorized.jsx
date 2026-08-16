import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export const Unauthorized = () => {
  const { role, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (!isAuthenticated) return '/login';
    if (role === 'teacher') return '/teacher/dashboard';
    if (role === 'admin') return '/admin/dashboard';
    return '/student/dashboard';
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center p-6 space-y-5 animate-fade-in">
      <div className="p-4 bg-rose-100 text-rose-600 rounded-3xl shadow-md animate-bounce">
        <ShieldAlert className="w-12 h-12" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
          403 Access Forbidden
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900">Unauthorized Access</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Your current user role ({role ? role.toUpperCase() : 'Guest'}) does not have permission to view this restricted page.
        </p>
      </div>

      <button
        onClick={() => navigate(getDashboardPath())}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 hover:scale-105"
      >
        <Home className="w-4 h-4" />
        <span>Go to Authorized Dashboard</span>
      </button>
    </div>
  );
};
