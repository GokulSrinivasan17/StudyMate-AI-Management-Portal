import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { GraduationCap, LogIn, Eye, EyeOff, Lock, Mail, RefreshCw } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('student@smartedu.ai');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedUser = await login(email, password, role);
      addToast(`Welcome back, ${loggedUser.name}!`, 'success', 'Login Successful');
      if (role === 'teacher') navigate('/teacher/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/student/dashboard');
    } catch {
      addToast('Login failed. Please check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-8 space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="p-3.5 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl text-white shadow-lg mx-auto w-fit animate-float">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">SmartEdu AI Portal</h2>
          <p className="text-xs text-slate-500 font-medium">Log in to your academic portal workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher / Faculty</option>
              <option value="admin">Administrator / Dean</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            <span>{loading ? "Authenticating..." : `Login as ${role.toUpperCase()}`}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
