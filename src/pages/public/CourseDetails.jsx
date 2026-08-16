import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { BookOpen, Star, Users, Clock, Award, CheckCircle2, Calendar, FileText, ArrowLeft, Play } from 'lucide-react';

export const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    courseService.getCourseById(courseId).then(data => setCourse(data));
  }, [courseId]);

  if (!course) return <div className="p-12 text-center text-slate-500">Loading course syllabus details...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <button
        onClick={() => navigate('/courses')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Course Catalog
      </button>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center shadow-xl">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white text-xs font-mono font-bold px-3 py-1 rounded-full uppercase">
              {course.code}
            </span>
            <span className="bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
              {course.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold">{course.title}</h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{course.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2 font-medium">
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-indigo-400" /> {course.studentsCount} Students Enrolled</span>
            <span className="flex items-center gap-1.5 text-amber-400 font-bold"><Star className="w-4 h-4 fill-amber-400" /> {course.rating} Rating</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-400" /> {course.duration}</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-purple-400" /> {course.credits} Credits</span>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 space-y-4 text-center">
          <img src={course.thumbnail} alt={course.title} className="w-full h-36 object-cover rounded-xl border border-slate-700" />
          <div className="text-2xl font-bold text-white">{course.price || "Included in Tuition"}</div>

          {isAuthenticated ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  addToast(`Resuming "${course.title}"... Redirecting to Student Dashboard.`, 'info');
                  navigate('/student/dashboard');
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" /> Continue Course
              </button>
              <button
                onClick={() => navigate('/student/assignments')}
                className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs py-2.5 rounded-xl transition-colors"
              >
                Submit Assignment
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                addToast(`Enrolled in ${course.title}!`, 'success');
                navigate('/login');
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-colors"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>

      {/* Syllabus Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" /> Course Modules & Syllabus
            </h2>

            <div className="divide-y divide-slate-100">
              {course.syllabus.map((mod, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {mod.module}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{mod.title}</h4>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{mod.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Course Information</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Instructor:</span>
                <span className="font-bold text-slate-900">{course.teacher}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Department:</span>
                <span className="font-semibold text-slate-900">{course.department}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Prerequisites:</span>
                <span className="font-semibold text-indigo-600">{course.prerequisites?.join(', ')}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Next Scheduled Class:</span>
                <span className="font-bold text-emerald-600">{course.nextClass}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
