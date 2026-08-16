import React from 'react';

export const GradeBadge = ({ grade = 'B' }) => {
  const getStyle = () => {
    switch (grade) {
      case 'A+':
        return 'bg-emerald-500 text-white shadow-emerald-200';
      case 'A':
        return 'bg-emerald-600 text-white shadow-emerald-200';
      case 'B+':
        return 'bg-indigo-600 text-white shadow-indigo-200';
      case 'B':
        return 'bg-indigo-500 text-white shadow-indigo-200';
      case 'C':
        return 'bg-amber-500 text-white shadow-amber-200';
      case 'D':
        return 'bg-orange-500 text-white shadow-orange-200';
      case 'F':
        return 'bg-rose-600 text-white shadow-rose-200';
      default:
        return 'bg-slate-500 text-white';
    }
  };

  return (
    <span className={`inline-flex items-center justify-center font-extrabold font-mono text-xs px-2.5 py-1 rounded-lg shadow-sm transition-all duration-300 transform scale-105 ${getStyle()}`}>
      Grade {grade}
    </span>
  );
};
