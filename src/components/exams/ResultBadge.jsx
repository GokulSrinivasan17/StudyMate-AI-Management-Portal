import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const ResultBadge = ({ result = 'PASS' }) => {
  const isPass = result === 'PASS';

  return (
    <span className={`inline-flex items-center gap-1 font-bold text-[11px] px-2.5 py-1 rounded-full border shadow-2xs ${
      isPass ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
    }`}>
      {isPass ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-600" />}
      <span>{result}</span>
    </span>
  );
};
