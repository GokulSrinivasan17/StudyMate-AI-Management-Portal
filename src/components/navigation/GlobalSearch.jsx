import React, { useState } from 'react';
import { Search, BookOpen, User, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockCourses } from '../../data/courses';
import { mockStudents } from '../../data/students';
import { mockAssignments } from '../../data/assignments';

export const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setIsOpen(e.target.value.length > 0);
  };

  const filteredCourses = mockCourses.filter(c => c.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
  const filteredStudents = mockStudents.filter(s => s.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
  const filteredAssignments = mockAssignments.filter(a => a.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3);

  const totalResults = filteredCourses.length + filteredStudents.length + filteredAssignments.length;

  const navigateTo = (path) => {
    setIsOpen(false);
    setQuery('');
    navigate(path);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search students, courses, assignments, AI reports..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200/80 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 z-50 max-h-96 overflow-y-auto p-3 text-xs">
          {totalResults === 0 ? (
            <div className="p-4 text-center text-slate-500">
              No results found matching "{query}"
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCourses.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-indigo-600" /> Courses
                  </div>
                  {filteredCourses.map(course => (
                    <button
                      key={course.id}
                      onClick={() => navigateTo(`/courses/${course.id}`)}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{course.title}</div>
                        <div className="text-[11px] text-slate-500">{course.teacher}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {filteredStudents.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <User className="w-3 h-3 text-purple-600" /> Students
                  </div>
                  {filteredStudents.map(student => (
                    <button
                      key={student.id}
                      onClick={() => navigateTo(`/teacher/students`)}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{student.name}</div>
                        <div className="text-[11px] text-slate-500">{student.department}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                    </button>
                  ))}
                </div>
              )}

              {filteredAssignments.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-emerald-600" /> Assignments
                  </div>
                  {filteredAssignments.map(assignment => (
                    <button
                      key={assignment.id}
                      onClick={() => navigateTo(`/student/assignments`)}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{assignment.title}</div>
                        <div className="text-[11px] text-slate-500">Due: {assignment.dueDate}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
