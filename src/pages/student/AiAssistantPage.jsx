import React from 'react';
import { AIChat } from '../../components/ai/AIChat';

export const AiAssistantPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">SmartEdu AI Assistant</h1>
        <p className="text-xs text-slate-500 font-medium">Interactive tutoring & instant query resolver powered by academic ML algorithms</p>
      </div>

      <AIChat />
    </div>
  );
};
