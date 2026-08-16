import React from 'react';
import { Check, Users, Edit3, ShieldCheck, Award, BarChart2, Eye, Send } from 'lucide-react';

export const MarksWorkflow = ({ currentStep = 4 }) => {
  const steps = [
    { number: 1, label: 'Students', icon: Users },
    { number: 2, label: 'Marks Entry', icon: Edit3 },
    { number: 3, label: 'Validation', icon: ShieldCheck },
    { number: 4, label: 'Grading', icon: Award },
    { number: 5, label: 'Analysis', icon: BarChart2 },
    { number: 6, label: 'Review', icon: Eye },
    { number: 7, label: 'Publish', icon: Send }
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs overflow-x-auto">
      <div className="flex items-center justify-between min-w-[700px] relative px-4">
        {/* Background Connecting Line */}
        <div className="absolute top-5 left-12 right-12 h-1 bg-slate-100 -z-0" />
        
        {/* Animated Active Line */}
        <div
          className="absolute top-5 left-12 h-1 bg-gradient-to-r from-emerald-500 via-indigo-600 to-purple-600 transition-all duration-700 ease-in-out -z-0"
          style={{ width: `${Math.min(100, Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100))}%` }}
        />

        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs transition-all duration-500 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                    : isCurrent
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-lg shadow-indigo-300 scale-110'
                    : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </div>

              <span
                className={`text-[11px] font-bold mt-2 tracking-wide transition-colors ${
                  isCurrent ? 'text-indigo-600 font-extrabold' : isCompleted ? 'text-emerald-700 font-semibold' : 'text-slate-400'
                }`}
              >
                {step.number}. {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
