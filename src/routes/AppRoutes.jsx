import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { StudentLayout } from '../layouts/StudentLayout';
import { TeacherLayout } from '../layouts/TeacherLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Protected Route Guard
import { ProtectedRoute } from '../components/navigation/ProtectedRoute';

// Public Pages
import { Home } from '../pages/public/Home';
import { Courses } from '../pages/public/Courses';
import { CourseDetails } from '../pages/public/CourseDetails';
import { Contact } from '../pages/public/Contact';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';

// Student Pages
import { StudentDashboard } from '../pages/student/Dashboard';
import { Profile } from '../pages/student/Profile';
import { StudentCourses } from '../pages/student/StudentCourses';
import { StudentAssignments } from '../pages/student/StudentAssignments';
import { StudentAttendance } from '../pages/student/StudentAttendance';
import { ExamsGrades } from '../pages/student/ExamsGrades';
import { StudentResults } from '../pages/student/StudentResults';
import { MyProgress } from '../pages/student/MyProgress';
import { AiRecommendations } from '../pages/student/AiRecommendations';
import { WhatIfPrediction } from '../pages/student/WhatIfPrediction';
import { AiAssistantPage } from '../pages/student/AiAssistantPage';
import { StudentReports } from '../pages/student/StudentReports';
import { StudentSettings } from '../pages/student/StudentSettings';

// Teacher Pages
import { TeacherDashboard } from '../pages/teacher/TeacherDashboard';
import { TeacherCourses } from '../pages/teacher/TeacherCourses';
import { TeacherClasses } from '../pages/teacher/TeacherClasses';
import { TeacherAttendance } from '../pages/teacher/TeacherAttendance';
import { TeacherAssignments } from '../pages/teacher/TeacherAssignments';
import { TeacherExams } from '../pages/teacher/TeacherExams';
import { TeacherStudents } from '../pages/teacher/TeacherStudents';
import { TeacherAiInsights } from '../pages/teacher/TeacherAiInsights';
import { TeacherReports } from '../pages/teacher/TeacherReports';
import { TeacherSettings } from '../pages/teacher/TeacherSettings';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminStudents } from '../pages/admin/AdminStudents';
import { AdminTeachers } from '../pages/admin/AdminTeachers';
import { AdminCourses } from '../pages/admin/AdminCourses';
import { AdminClasses } from '../pages/admin/AdminClasses';
import { AdminAttendance } from '../pages/admin/AdminAttendance';
import { AdminAssignments } from '../pages/admin/AdminAssignments';
import { AdminExams } from '../pages/admin/AdminExams';
import { AdminGrades } from '../pages/admin/AdminGrades';
import { AdminResults } from '../pages/admin/AdminResults';
import { AdminReports } from '../pages/admin/AdminReports';
import { AdminAnalytics } from '../pages/admin/AdminAnalytics';
import { AdminAiMonitoring } from '../pages/admin/AdminAiMonitoring';
import { AdminSettings } from '../pages/admin/AdminSettings';

// Errors
import { NotFound } from '../pages/errors/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Student Protected Portal */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="exams" element={<ExamsGrades />} />
          <Route path="results" element={<StudentResults />} />
          <Route path="progress" element={<MyProgress />} />
          <Route path="ai-recommendations" element={<AiRecommendations />} />
          <Route path="prediction" element={<WhatIfPrediction />} />
          <Route path="assistant" element={<AiAssistantPage />} />
          <Route path="reports" element={<StudentReports />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>
      </Route>

      {/* Teacher Protected Portal */}
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="classes" element={<TeacherClasses />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="assignments" element={<TeacherAssignments />} />
          <Route path="exams" element={<TeacherExams />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="ai-insights" element={<TeacherAiInsights />} />
          <Route path="reports" element={<TeacherReports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<TeacherSettings />} />
        </Route>
      </Route>

      {/* Admin Protected Portal */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="classes" element={<AdminClasses />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="assignments" element={<AdminAssignments />} />
          <Route path="exams" element={<AdminExams />} />
          <Route path="grades" element={<AdminGrades />} />
          <Route path="results" element={<AdminResults />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="ai-monitoring" element={<AdminAiMonitoring />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
