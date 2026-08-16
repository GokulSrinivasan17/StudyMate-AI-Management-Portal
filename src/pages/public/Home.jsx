import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen, Users, Award, ShieldCheck, CheckCircle2, TrendingUp, Cpu, Lightbulb } from 'lucide-react';
import { mockCourses } from '../../data/courses';
import { mockTeachers } from '../../data/teachers';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>BUILDATHON 2026 OFFICIAL AI PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Transform Academic Data into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">Student Success</span>
            </h1>

            <p className="text-base text-slate-300 leading-relaxed font-medium">
              SmartEdu AI analyzes attendance patterns, assignment completion trends, and midterm exam performance to detect academic risk early and deliver personalized intervention recommendations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/register"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-xl transition-all flex items-center gap-2 hover:scale-105"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/courses"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-6 py-3.5 rounded-2xl border border-slate-700 transition-colors"
              >
                Explore Catalog
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-4 gap-4 pt-8 border-t border-slate-800 text-left">
              <div>
                <div className="text-2xl font-extrabold text-white">10K+</div>
                <div className="text-[11px] text-slate-400 font-medium">Active Students</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-purple-400">500+</div>
                <div className="text-[11px] text-slate-400 font-medium">Courses</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-amber-400">95%</div>
                <div className="text-[11px] text-slate-400 font-medium">Tracking Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-400">24/7</div>
                <div className="text-[11px] text-slate-400 font-medium">AI Insights</div>
              </div>
            </div>
          </div>

          {/* Abstract AI Dashboard Preview Graphic */}
          <div className="relative">
            <div className="ai-gradient-glow rounded-3xl bg-slate-800 border border-slate-700/80 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">SmartEdu-Predictor-Engine</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">LIVE PREDICTION</span>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-2xl border border-purple-500/30 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" /> Academic Risk Score
                  </span>
                  <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">68/100 (MEDIUM)</span>
                </div>

                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-full w-[68%]" />
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <strong className="text-purple-300 block mb-0.5">AI Recommendation:</strong>
                  Complete Mathematics Assignment 4 before Friday to boost predicted exam score by +15%.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Predicted Grade</span>
                  <span className="text-xl font-bold text-white">Grade A (76%)</span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Weakest Subject</span>
                  <span className="text-xl font-bold text-amber-400">Engineering Maths</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Curriculum Catalog
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Featured Core Courses</h2>
          </div>
          <Link to="/courses" className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-1">
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockCourses.slice(0, 3).map(course => (
            <div key={course.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {course.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                    <span>{course.code}</span>
                    <span className="text-amber-500 font-bold">★ {course.rating}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px]">Instructor</span>
                    <span className="font-semibold text-slate-800">{course.teacher}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Study Tips */}
      <section className="bg-purple-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-purple-800/80 px-3 py-1 rounded-full">
              Smart Educational Insights
            </span>
            <h2 className="text-3xl font-extrabold mt-3">AI-Powered Academic Guidelines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-800/50 p-6 rounded-3xl border border-purple-700/60 space-y-3">
              <div className="p-3 bg-amber-400/20 text-amber-300 rounded-2xl w-fit">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Maintain Attendance Threshold</h3>
              <p className="text-xs text-purple-200 leading-relaxed">
                Our ML models prove keeping subject attendance above 75% correlates with a +18% increase in final examination performance.
              </p>
            </div>

            <div className="bg-purple-800/50 p-6 rounded-3xl border border-purple-700/60 space-y-3">
              <div className="p-3 bg-indigo-400/20 text-indigo-300 rounded-2xl w-fit">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Prioritize High-Weightage Assignments</h3>
              <p className="text-xs text-purple-200 leading-relaxed">
                Submitting pending assignments within 48 hours of release recovers critical internal assessment points and lowers risk flags.
              </p>
            </div>

            <div className="bg-purple-800/50 p-6 rounded-3xl border border-purple-700/60 space-y-3">
              <div className="p-3 bg-emerald-400/20 text-emerald-300 rounded-2xl w-fit">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Interactive What-If Simulation</h3>
              <p className="text-xs text-purple-200 leading-relaxed">
                Use our real-time simulator to model how allocating 2 extra hours of weekly study alters your predicted final grade letter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Faculty */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Expert Mentorship
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Distinguished Academic Faculty</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTeachers.slice(0, 4).map(teacher => (
            <div key={teacher.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-4">
              <img src={teacher.avatar} alt={teacher.name} className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-indigo-200" />
              <div>
                <h3 className="font-bold text-slate-900 text-base">{teacher.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{teacher.title}</p>
                <p className="text-[11px] text-indigo-600 mt-1 font-semibold">{teacher.department}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{teacher.studentsCount} Students</span>
                <span className="text-amber-500 font-bold">★ {teacher.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
