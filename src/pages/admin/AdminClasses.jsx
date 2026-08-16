import React from 'react';

export const AdminClasses = () => {
  const classes = [
    { id: "1", name: "CSE 2nd Year - Sec A", department: "Computer Science", students: 65, teacher: "Dr. Aris Thorne", schedule: "Mon/Wed 10:00 AM" },
    { id: "2", name: "CSE 3rd Year - Sec B", department: "Computer Science", students: 80, teacher: "Dr. Aris Thorne", schedule: "Tue/Thu 11:30 AM" },
    { id: "3", name: "IT 2nd Year - Sec A", department: "Information Tech", students: 60, teacher: "Prof. Rajesh Kumar", schedule: "Mon/Fri 02:00 PM" }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Classes & Sections</h1>
        <p className="text-xs text-slate-500 font-medium">Batch schedules and assigned classroom locations</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Section Name</th>
              <th className="p-4">Department</th>
              <th className="p-4">Faculty Lead</th>
              <th className="p-4">Students</th>
              <th className="p-4">Schedule</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {classes.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900">{c.name}</td>
                <td className="p-4 text-slate-500">{c.department}</td>
                <td className="p-4 font-semibold">{c.teacher}</td>
                <td className="p-4 font-bold">{c.students}</td>
                <td className="p-4 font-mono">{c.schedule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
