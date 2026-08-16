import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { mockStudents } from '../data/students';
import { mockTeachers } from '../data/teachers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('smartedu_user');
    return savedUser ? JSON.parse(savedUser) : mockStudents[0]; // Default to Harish Kolanjiyappan
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('smartedu_role') || 'student';
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('smartedu_token') || 'demo_token_123';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('smartedu_user', JSON.stringify(user));
      localStorage.setItem('smartedu_role', user.role || role);
    } else {
      localStorage.removeItem('smartedu_user');
      localStorage.removeItem('smartedu_role');
      localStorage.removeItem('smartedu_token');
    }
  }, [user, role]);

  const login = async (email, password, inputRole) => {
    const res = await authService.login(email, password, inputRole);
    setUser(res.user);
    setRole(res.user.role || inputRole);
    setToken(res.token);
    localStorage.setItem('smartedu_token', res.token);
    return res.user;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    setUser(res.user);
    setRole(res.user.role);
    setToken(res.token);
    localStorage.setItem('smartedu_token', res.token);
    return res.user;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.clear();
  };

  const switchDemoRole = (targetRole) => {
    if (targetRole === 'student') {
      const studentUser = mockStudents[0]; // Harish Kolanjiyappan
      setUser(studentUser);
      setRole('student');
      setToken(`demo_student_token_${Date.now()}`);
    } else if (targetRole === 'teacher') {
      const teacherUser = mockTeachers[0]; // Dr. Aris Thorne
      setUser(teacherUser);
      setRole('teacher');
      setToken(`demo_teacher_token_${Date.now()}`);
    } else if (targetRole === 'admin') {
      const adminUser = {
        id: "ADM-2026-001",
        name: "Dean / System Administrator",
        email: "admin@smartedu.ai",
        role: "admin",
        department: "Office of Academic Affairs",
        college: "SmartEdu Institute of Technology",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      };
      setUser(adminUser);
      setRole('admin');
      setToken(`demo_admin_token_${Date.now()}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || role,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchDemoRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
