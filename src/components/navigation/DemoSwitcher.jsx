import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, User, GraduationCap, ShieldCheck, Zap } from 'lucide-react';

export const DemoSwitcher = ({ onTriggerLiveAnalysis }) => {
  const { role, switchDemoRole } = useAuth();

  return (
    <div className="bg-slate-900 text-white py-2 px-4 flex flex-wrap items-center justify-between text-xs border-b border-slate-800 shadow-md z-40 sticky top-0">
      <div className="flex items-center gap-2 font-medium">
        <span className="bg-indigo-600 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase flex items-center gap-1">
          <Zap className="w-3 h-3 text-amber-300 fill-amber-300" /> BUILDATHON 2026 DEMO
        </span>
        <span className="hidden sm:inline text-slate-300">Quick Persona Switcher:</span>
      </div>

      <div className="flex items-center gap-2 my-1 sm:my-0">
        <button
          onClick={() => switchDemoRole('student')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
            role === 'student'
              ? 'bg-indigo-600 text-white font-semibold shadow-sm ring-2 ring-indigo-400'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Student (Harish)</span>
        </button>

        <button
          onClick={() => switchDemoRole('teacher')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
            role === 'teacher'
              ? 'bg-purple-600 text-white font-semibold shadow-sm ring-2 ring-purple-400'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Teacher (Dr. Aris)</span>
        </button>

        <button
          onClick={() => switchDemoRole('admin')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
            role === 'admin'
              ? 'bg-emerald-600 text-white font-semibold shadow-sm ring-2 ring-emerald-400'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin (Dean)</span>
        </button>

        {onTriggerLiveAnalysis && (
          <button
            onClick={onTriggerLiveAnalysis}
            className="ml-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm transition-all animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Live AI Risk Analysis</span>
          </button>
        )}
      </div>
    </div>
  );
};
