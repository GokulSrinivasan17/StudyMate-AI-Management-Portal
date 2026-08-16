import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

export const RiskBadge = ({ level = "LOW", score }) => {
  const normLevel = (level || "").toUpperCase();

  const getStyle = () => {
    switch (normLevel) {
      case "CRITICAL":
        return {
          bg: "bg-rose-100 text-rose-900 border-rose-300",
          icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />,
          label: "CRITICAL RISK"
        };
      case "HIGH":
        return {
          bg: "bg-red-100 text-red-800 border-red-300",
          icon: <ShieldAlert className="w-3.5 h-3.5 text-red-600" />,
          label: "HIGH RISK"
        };
      case "MEDIUM":
        return {
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
          label: "MEDIUM RISK"
        };
      default:
        return {
          bg: "bg-emerald-100 text-emerald-800 border-emerald-300",
          icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
          label: "LOW RISK"
        };
    }
  };

  const style = getStyle();

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg}`}>
      {style.icon}
      <span>{style.label}</span>
      {score !== undefined && (
        <span className="ml-1 opacity-80 border-l border-slate-300 pl-1.5 font-mono text-[11px]">
          {score}/100
        </span>
      )}
    </span>
  );
};
