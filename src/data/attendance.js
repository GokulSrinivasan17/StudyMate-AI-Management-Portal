export const mockAttendance = {
  overallPercentage: 82,
  totalClasses: 120,
  presentClasses: 98,
  absentClasses: 18,
  lateClasses: 4,
  thresholdWarning: 75,
  subjects: [
    {
      subjectId: "CRS-101",
      subjectName: "Data Structures & Algorithms",
      teacher: "Dr. Aris Thorne",
      percentage: 91,
      present: 32,
      absent: 3,
      late: 1,
      total: 36,
      status: "EXCELLENT" // EXCELLENT (>=85), GOOD (75-84), WARNING (65-74), CRITICAL (<65)
    },
    {
      subjectId: "CRS-102",
      subjectName: "Database Management Systems",
      teacher: "Prof. Rajesh Kumar",
      percentage: 85,
      present: 28,
      absent: 4,
      late: 1,
      total: 33,
      status: "EXCELLENT"
    },
    {
      subjectId: "CRS-103",
      subjectName: "Advanced Engineering Mathematics",
      teacher: "Dr. Meera Sharma",
      percentage: 68,
      present: 19,
      absent: 8,
      late: 1,
      total: 28,
      status: "WARNING", // Below 75% threshold!
      aiAlert: "Your Mathematics attendance is 68%, below the recommended 75% threshold required for end-term examination eligibility."
    },
    {
      subjectId: "CRS-106",
      subjectName: "Object Oriented Java Programming",
      teacher: "Prof. Lakshmi Narayan",
      percentage: 88,
      present: 22,
      absent: 3,
      late: 0,
      total: 25,
      status: "EXCELLENT"
    },
    {
      subjectId: "CRS-105",
      subjectName: "Artificial Intelligence & ML",
      teacher: "Dr. Vikramaditya Singh",
      percentage: 86,
      present: 18,
      absent: 2,
      late: 1,
      total: 21,
      status: "EXCELLENT"
    }
  ],
  trendHistory: [
    { week: "Week 1", attendance: 95 },
    { week: "Week 2", attendance: 92 },
    { week: "Week 3", attendance: 90 },
    { week: "Week 4", attendance: 88 },
    { week: "Week 5", attendance: 85 },
    { week: "Week 6", attendance: 84 },
    { week: "Week 7", attendance: 80 },
    { week: "Week 8", attendance: 82 }
  ]
};
