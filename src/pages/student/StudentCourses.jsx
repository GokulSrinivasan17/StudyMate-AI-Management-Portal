import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { BookOpen, Calendar, ArrowRight, Star, Clock } from 'lucide-react';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useNavigate } from 'react-router-dom';

export const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    studentService.getCourses().then(data => setCourses(data));
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">My Enrolled Courses</h1>
        <p className="text-xs text-slate-500 font-medium">Track completion progress, syllabus schedules, and upcoming tests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">
                  {course.code}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">{course.title}</h3>
                <p className="text-xs text-slate-500">{course.teacher}</p>
              </div>
              <span className="text-amber-500 text-xs font-bold">★ {course.rating}</span>
            </div>

            <ProgressBar value={course.progress || 75} label="Syllabus Completion" />

            <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-semibold text-slate-800">Next Lecture:</span>
                <span>{course.nextClass}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-semibold text-slate-800">Next Task:</span>
                <span className="text-indigo-600 font-medium">{course.nextAssignment}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/courses/${course.id}`)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
