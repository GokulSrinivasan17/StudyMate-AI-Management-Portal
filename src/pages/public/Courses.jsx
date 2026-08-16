import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCourses } from '../../data/courses';
import { Search, Filter, BookOpen, Star, Clock, Users, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const navigate = useNavigate();
  const { addToast } = useToast();

  const categories = ['All', 'Core Computer Science', 'Mathematics', 'Software Development', 'Artificial Intelligence', 'Networking'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  let filtered = mockCourses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesLev = selectedLevel === 'All' || c.level.includes(selectedLevel);
    return matchesSearch && matchesCat && matchesLev;
  });

  if (sortBy === 'Rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'Newest') {
    filtered.sort((a, b) => b.id.localeCompare(a.id));
  } else {
    filtered.sort((a, b) => b.studentsCount - a.studentsCount);
  }

  const handleEnroll = (courseTitle) => {
    addToast(`Enrolled in "${courseTitle}"! Access granted in Student Portal.`, 'success', 'Enrollment Complete');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Academic Curriculum
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900">Explore SmartEdu Courses</h1>
        <p className="text-slate-600 text-sm">
          Filter through our accredited engineering courses with real-time academic risk monitoring and AI predictive analysis.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search course title or keyword..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>)}
            </select>
          </div>

          <div>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            >
              {levels.map(lev => <option key={lev} value={lev}>{lev === 'All' ? 'All Difficulty Levels' : lev}</option>)}
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            >
              <option value="Popular">Sort by: Popularity</option>
              <option value="Rating">Sort by: Highest Rated</option>
              <option value="Newest">Sort by: Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map(course => (
          <div key={course.id} className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="relative h-48 overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                {course.code}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.studentsCount} Students</span>
                  <span className="text-amber-500 font-bold flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating}</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">{course.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Details
                </button>
                <button
                  onClick={() => handleEnroll(course.title)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
