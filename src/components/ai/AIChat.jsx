import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Mic, Trash2, Bot, User, RefreshCw } from 'lucide-react';
import { aiService } from '../../services/aiService';

export const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello Harish! I am SmartEdu AI Assistant. I've analyzed your academic records, attendance history, and recent midterm scores. How can I assist your learning today?",
      time: "10:00 AM"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const suggestedQuestions = [
    "Why is my performance low?",
    "What are my weakest subjects?",
    "How can I improve my Mathematics score?",
    "What assignments are pending?",
    "How is my attendance?",
    "Predict my next exam performance."
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const res = await aiService.sendChatMessage(query);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: res.reply,
            time: res.timestamp
          }
        ]);
      }, 700);
    } catch {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: "Chat context cleared. How can I assist your studies?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md flex flex-col h-[650px] overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600 rounded-xl shadow-inner">
            <Bot className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base">SmartEdu AI Assistant</h3>
              <span className="bg-purple-500/30 text-purple-200 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-purple-400/40">
                ACTIVE AI MODEL
              </span>
            </div>
            <p className="text-xs text-slate-400">Academic Intelligence & Instant Tutoring</p>
          </div>
        </div>

        <button
          onClick={handleClear}
          title="Clear Chat"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="bg-slate-50 p-3 px-6 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-purple-700 whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Prompt Hints:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-xs bg-white hover:bg-purple-50 hover:text-purple-700 text-slate-600 font-medium px-3 py-1 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-purple-600 text-white'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[75%] p-4 rounded-2xl text-xs leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line font-medium">{msg.text}</div>
              <span
                className={`text-[10px] block mt-1.5 font-mono ${
                  msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                }`}
              >
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none text-xs text-slate-500 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
              <span>SmartEdu AI is calculating answer...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 bg-white border-t border-slate-100 flex items-center gap-3"
      >
        <button
          type="button"
          title="Voice input simulation"
          className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask SmartEdu AI about your performance, assignments, exams..."
          className="flex-1 px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
        />

        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 px-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
