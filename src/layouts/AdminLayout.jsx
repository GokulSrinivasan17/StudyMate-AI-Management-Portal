import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GlobalSearch } from '../components/navigation/GlobalSearch';
import { NotificationBell } from '../components/navigation/NotificationBell';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  Layers,
  CalendarCheck,
  FileText,
  Award,
  BarChart3,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Students', path: '/admin/students', icon: GraduationCap },
    { label: 'Teachers', path: '/admin/teachers', icon: Users },
    { label: 'Courses', path: '/admin/courses', icon: BookOpen },
    { label: 'Classes', path: '/admin/classes', icon: Layers },
    { label: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
    { label: 'Assignments', path: '/admin/assignments', icon: FileText },
    { label: 'Exams', path: '/admin/exams', icon: Award },
    { label: 'Results', path: '/admin/results', icon: BarChart3 },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'AI Monitoring', path: '/admin/ai-monitoring', icon: Sparkles, badge: 'AI' },
    { label: 'Reports', path: '/admin/reports', icon: FileSpreadsheet },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 p-4 shrink-0 shadow-xl">
          <div className="flex items-center gap-2.5 px-3 py-3.5 mb-4 text-white font-extrabold text-lg border-b border-slate-800">
            <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight">SmartEdu AI</span>
              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Dean / Admin Portal</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar text-xs">
            {adminNavItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white font-bold shadow-md'
                        : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-purple-500/30 text-purple-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-purple-400/30">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
        )}

        <aside
          className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 p-4 transform transition-transform duration-300 flex flex-col ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-3 py-3 mb-4 text-white font-extrabold border-b border-slate-800">
            <span>SmartEdu Admin</span>
            <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto text-xs">
            {adminNavItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all ${
                      isActive ? 'bg-emerald-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-400'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs sticky top-0 z-30">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>

            <GlobalSearch />

            <div className="flex items-center gap-4">
              <NotificationBell />

              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  alt={user?.name || "Admin"}
                  className="w-9 h-9 rounded-full object-cover border-2 border-emerald-200"
                />
                <div className="hidden sm:block text-xs text-left">
                  <p className="font-bold text-slate-900 leading-tight">{user?.name || "Dean"}</p>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Administrator
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
