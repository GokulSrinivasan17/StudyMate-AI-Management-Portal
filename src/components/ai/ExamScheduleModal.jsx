import React, { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, Send, Mail, MessageSquare, CheckCircle2, Clock, BookOpen, Bell } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { useToast } from '../../context/ToastContext';

export const ExamScheduleModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [sendingReminders, setSendingReminders] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [telegramChatId, setTelegramChatId] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [sendTelegram, setSendTelegram] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchSchedule();
    }
  }, [isOpen]);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const data = await aiService.getExamSchedule();
      setSchedule(data);
    } catch {
      addToast('Failed to load Gemini Exam Schedule', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminders = async () => {
    setSendingReminders(true);
    try {
      await aiService.sendExamReminders({
        sendEmail,
        sendTelegram,
        telegramChatId,
      });
      addToast('Exam study reminders dispatched to Email & Telegram Bot!', 'success', 'Reminders Dispatched');
    } catch {
      addToast('Error sending reminders', 'error');
    } finally {
      setSendingReminders(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/30 border border-indigo-400/30 rounded-2xl text-indigo-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Gemini AI Exam Schedule & Reminders</h2>
              <p className="text-xs text-slate-300">Automated day-by-day exam revision plan & Telegram/Email study tracker</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Generating Gemini AI Day-by-Day Exam Revision Schedule...</p>
              <p className="text-xs text-slate-400">Analyzing upcoming exam dates, course credits, and weak areas...</p>
            </div>
          ) : schedule ? (
            <>
              {/* Schedule Title & Summary */}
              <div className="bg-indigo-50/80 border border-indigo-100 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {schedule.scheduleTitle}
                  </span>
                  <span className="text-xs text-indigo-900 font-semibold">Powered by Google Gemini AI</span>
                </div>
                <p className="text-xs text-indigo-950 font-medium leading-relaxed">{schedule.summary}</p>
              </div>

              {/* Day-by-Day Grid */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" /> Day-by-Day Revision Plan
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(schedule.dailyPlan || []).map((plan, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div>
                          <span className="text-[11px] font-bold text-indigo-600 uppercase">{plan.day}</span>
                          <span className="text-xs text-slate-400 font-mono ml-2">({plan.date})</span>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" /> {plan.recommendedDuration}
                        </span>
                      </div>

                      <div className="font-bold text-slate-900 text-xs">
                        Target Subject: <span className="text-indigo-600">{plan.focusSubject}</span>
                      </div>

                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {(plan.tasks || []).map((task, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reminder Channels Config & Trigger */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-400 animate-bounce" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Automated Study Schedule Reminders</h4>
                      <p className="text-xs text-slate-300">Dispatch study alerts via Email & Telegram Bot</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="flex items-center justify-between bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-indigo-400" />
                      <span>Gmail Alert (studymate.hackathon@gmail.com)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={sendEmail}
                      onChange={(e) => setSendEmail(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-sky-400" />
                      <span>Telegram Bot (8721806166:AAGv...)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={sendTelegram}
                      onChange={(e) => setSendTelegram(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <input
                    type="text"
                    placeholder="Enter Telegram Chat ID (optional for bot dispatch)..."
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    className="w-full sm:flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleSendReminders}
                    disabled={sendingReminders}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    {sendingReminders ? (
                      <Sparkles className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Dispatch Reminders Now
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
