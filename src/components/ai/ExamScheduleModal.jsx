import React, { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, Send, Mail, MessageSquare, CheckCircle2, Clock, BookOpen, Bell, ExternalLink, AlertCircle, AlertTriangle } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const ExamScheduleModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const defaultEmail = user?.email || 'poovarasan420122@gmail.com';
  const defaultChatId = '6640386706';

  const [loading, setLoading] = useState(false);
  const [sendingReminders, setSendingReminders] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState(defaultEmail);
  const [telegramChatId, setTelegramChatId] = useState(defaultChatId);
  const [sendEmail, setSendEmail] = useState(true);
  const [sendTelegram, setSendTelegram] = useState(true);
  const [dispatchResult, setDispatchResult] = useState(null);
  const [dispatchError, setDispatchError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchSchedule();
      setDispatchResult(null);
      setDispatchError(null);
      if (!recipientEmail) setRecipientEmail(defaultEmail);
      if (!telegramChatId) setTelegramChatId(defaultChatId);
    }
  }, [isOpen, user]);

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
    if (!sendEmail && !sendTelegram) {
      addToast('Please enable at least Email or Telegram reminder channel', 'warning');
      return;
    }

    const targetEmail = recipientEmail.trim() || defaultEmail;
    const targetChat = telegramChatId.trim() || defaultChatId;

    setSendingReminders(true);
    setDispatchResult(null);
    setDispatchError(null);

    try {
      const res = await aiService.sendExamReminders({
        recipientEmail: targetEmail,
        sendEmail,
        sendTelegram,
        telegramChatId: targetChat,
      });

      if (res?.success === false) {
        const errorMsg = res?.message || res?.error || 'Failed to dispatch reminders. Please check your inputs.';
        setDispatchError(errorMsg);
        addToast(errorMsg, 'error', 'Dispatch Failed');
      } else {
        const resData = res?.data || res;
        setDispatchResult(resData);
        addToast('Exam study reminders processed!', 'success', 'Dispatch Completed');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Error dispatching reminders';
      setDispatchError(errorMsg);
      addToast(errorMsg, 'error', 'Dispatch Error');
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
              <h2 className="text-xl font-bold">Gemini AI Exam Schedule & Reminders Engine</h2>
              <p className="text-xs text-slate-300">Automated day-by-day exam revision plan powered by Gmail SMTP & Telegram Bot</p>
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

              {/* ERROR CARD IF DISPATCH FAILED */}
              {dispatchError && (
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-start gap-3 text-rose-900 text-xs animate-fade-in">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-sm block">Dispatch Error</strong>
                    <p className="mt-0.5 text-rose-800">{dispatchError}</p>
                  </div>
                </div>
              )}

              {/* DISPATCH RESULT FEEDBACK CARD */}
              {dispatchResult && (
                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Exam Schedule Reminders Processed!</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Email Status */}
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-indigo-600" /> Email Status
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          dispatchResult.emailStatus?.sent ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {dispatchResult.emailStatus?.sent
                            ? (dispatchResult.emailStatus?.provider || 'Sent')
                            : 'Failed'}
                        </span>
                      </div>
                      <p className="text-slate-600 font-mono text-[11px] truncate">Target: {dispatchResult.recipientEmail}</p>

                      {dispatchResult.emailStatus?.error && (
                        <p className="text-[11px] text-rose-600 font-medium">{dispatchResult.emailStatus.error}</p>
                      )}

                      {dispatchResult.emailStatus?.previewUrl && (
                        <a
                          href={dispatchResult.emailStatus.previewUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline pt-1"
                        >
                          <span>View Live Email Preview</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {/* Telegram Status */}
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-sky-500" /> Telegram Bot
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          dispatchResult.telegramStatus?.sent ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {dispatchResult.telegramStatus?.sent ? 'Delivered 🚀' : 'Bot Standby'}
                        </span>
                      </div>
                      <p className="text-slate-600 font-mono text-[11px]">Chat ID: {dispatchResult.telegramChatId || '6640386706'}</p>

                      {dispatchResult.telegramStatus?.messageId && (
                        <p className="text-[10px] text-emerald-700 font-mono">Telegram Message ID: #{dispatchResult.telegramStatus.messageId}</p>
                      )}
                      
                      <a
                        href="https://t.me/studymateAgent_bot"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline pt-1"
                      >
                        <span>Open @studymateAgent_bot</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* USER INPUT & REMINDER DISPATCH SECTION */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-5 shadow-xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-400 animate-bounce" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Dispatch Exam Schedule & Daily Reminders</h4>
                      <p className="text-xs text-slate-400">Provide your target Email & Telegram Chat ID to receive automated study alerts</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email Input Field */}
                  <div className="space-y-2 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-indigo-400" /> Target Email Address
                      </label>
                      <input
                        type="checkbox"
                        checked={sendEmail}
                        onChange={(e) => setSendEmail(e.target.checked)}
                        className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="e.g. poovarasan420122@gmail.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>

                  {/* Telegram Input Field */}
                  <div className="space-y-2 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-sky-400" /> Telegram Chat ID
                      </label>
                      <input
                        type="checkbox"
                        checked={sendTelegram}
                        onChange={(e) => setSendTelegram(e.target.checked)}
                        className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 6640386706"
                      value={telegramChatId}
                      onChange={(e) => setTelegramChatId(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Telegram messages sent directly to <a href="https://t.me/studymateAgent_bot" target="_blank" rel="noreferrer" className="text-sky-400 underline font-bold">@studymateAgent_bot</a> (Chat ID: 6640386706).</span>
                  </div>

                  <button
                    onClick={handleSendReminders}
                    disabled={sendingReminders}
                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs px-8 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {sendingReminders ? (
                      <Sparkles className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{sendingReminders ? 'Dispatching...' : 'Dispatch Reminders Now'}</span>
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
