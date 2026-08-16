import React, { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacherService';
import { attendanceService } from '../../services/attendanceService';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, Save, Users, Calendar } from 'lucide-react';

export const TeacherAttendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('Data Structures & Algorithms');
  const [selectedClass, setSelectedClass] = useState('CSE 2nd Year - Sec A');
  const [date, setDate] = useState('2026-08-16');
  const [attendanceState, setAttendanceState] = useState({});

  const { addToast } = useToast();

  useEffect(() => {
    teacherService.getStudents().then(data => {
      setStudents(data);
      const initial = {};
      data.forEach(s => {
        initial[s.id] = 'PRESENT';
      });
      setAttendanceState(initial);
    });
  }, []);

  const handleMarkAllPresent = () => {
    const updated = {};
    students.forEach(s => {
      updated[s.id] = 'PRESENT';
    });
    setAttendanceState(updated);
    addToast('Marked all students as Present!', 'info');
  };

  const handleSave = () => {
    attendanceService.saveClassAttendance({ course: selectedCourse, class: selectedClass, date, records: attendanceState }).then(() => {
      addToast(`Attendance saved for ${students.length} students in ${selectedClass}!`, 'success', 'Attendance Recorded');
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Class Attendance Marker</h1>
          <p className="text-xs text-slate-500 font-medium">Record daily lecture presence, absent notes, and late arrivals</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMarkAllPresent}
            className="bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Mark All Present
          </button>

          <button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save Attendance
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Select Course</label>
          <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl">
            <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
            <option value="Database Management Systems">Database Management Systems</option>
            <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Select Section</label>
          <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl">
            <option value="CSE 2nd Year - Sec A">CSE 2nd Year - Sec A</option>
            <option value="CSE 3rd Year - Sec B">CSE 3rd Year - Sec B</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Lecture Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl" />
        </div>
      </div>

      {/* Student Attendance Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Class Roll Call ({students.length} Students)</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold text-[10px]">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Student ID</th>
                <th className="p-4">Overall Attendance</th>
                <th className="p-4 text-center">Status Marker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full object-cover border" />
                    <div>
                      <span className="font-bold text-slate-900 block">{s.name}</span>
                      <span className="text-[10px] text-slate-400">{s.department}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono">{s.id}</td>
                  <td className="p-4">
                    <span className={`font-bold ${s.attendance < 75 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {s.attendance}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-4 bg-slate-100/80 p-1.5 rounded-xl">
                      <label className="flex items-center gap-1 cursor-pointer font-bold text-emerald-700 text-[11px]">
                        <input
                          type="radio"
                          name={`att_${s.id}`}
                          value="PRESENT"
                          checked={attendanceState[s.id] === 'PRESENT'}
                          onChange={() => setAttendanceState({ ...attendanceState, [s.id]: 'PRESENT' })}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>Present</span>
                      </label>

                      <label className="flex items-center gap-1 cursor-pointer font-bold text-rose-700 text-[11px]">
                        <input
                          type="radio"
                          name={`att_${s.id}`}
                          value="ABSENT"
                          checked={attendanceState[s.id] === 'ABSENT'}
                          onChange={() => setAttendanceState({ ...attendanceState, [s.id]: 'ABSENT' })}
                          className="text-rose-600 focus:ring-rose-500"
                        />
                        <span>Absent</span>
                      </label>

                      <label className="flex items-center gap-1 cursor-pointer font-bold text-amber-700 text-[11px]">
                        <input
                          type="radio"
                          name={`att_${s.id}`}
                          value="LATE"
                          checked={attendanceState[s.id] === 'LATE'}
                          onChange={() => setAttendanceState({ ...attendanceState, [s.id]: 'LATE' })}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span>Late</span>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
