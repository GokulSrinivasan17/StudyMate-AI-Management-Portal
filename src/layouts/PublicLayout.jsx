import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Sparkles, GraduationCap, BookOpen, Mail, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PublicLayout = () => {
  const { isAuthenticated, user, role } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (role === 'teacher') return '/teacher/dashboard';
    if (role === 'admin') return '/admin/dashboard';
    return '/student/dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl text-white shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                SmartEdu <span className="text-purple-600">AI</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 block -mt-1 tracking-wider uppercase">
                Academic Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-indigo-600 font-bold" : "hover:text-indigo-600 transition-colors"}>
              Home
            </NavLink>
            <NavLink to="/courses" className={({ isActive }) => isActive ? "text-indigo-600 font-bold" : "hover:text-indigo-600 transition-colors"}>
              Courses
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-indigo-600 font-bold" : "hover:text-indigo-600 transition-colors"}>
              Contact
            </NavLink>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => navigate(getDashboardPath())}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2 transition-colors flex items-center gap-1"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Outlet */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <GraduationCap className="w-5 h-5 text-indigo-400" /> SmartEdu AI
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Transforming raw academic data into student success through integrated AI predictive modeling, attendance risk detection, and personalized recommendations.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/courses" className="hover:text-white transition-colors">Course Catalog</Link></li>
              <li><Link to="/student/dashboard" className="hover:text-white transition-colors">Student Analytics</Link></li>
              <li><Link to="/teacher/dashboard" className="hover:text-white transition-colors">Teacher Insights</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white transition-colors">Institutional AI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">For Institutions</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Risk Monitoring</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Intervention Planning</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FastAPI Backend Integration</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BUILDATHON 2026 Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Contact Support</h4>
            <p className="text-slate-400">SmartEdu Institute of Technology</p>
            <p className="text-slate-400 mt-1">Email: support@smartedu.ai</p>
            <p className="text-slate-400 mt-1">Phone: +91 98765 43210</p>
          </div>
        </div>

        <div className="border-t border-slate-800 py-4 text-center text-slate-500 text-[11px]">
          © 2026 SmartEdu AI. All rights reserved. | Buildathon 2026 Official Entry
        </div>
      </footer>
    </div>
  );
};
