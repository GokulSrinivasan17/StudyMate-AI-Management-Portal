const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Prisma database seeding for SmartEdu AI backend...');

  // Clear existing records
  await prisma.notification.deleteMany();
  await prisma.aiInsight.deleteMany();
  await prisma.academicRecord.deleteMany();
  await prisma.examResult.deleteMany();
  await prisma.examination.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.assignmentSubmission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.class.deleteMany();
  await prisma.course.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@smartedu.ai',
      password: hashedPassword,
      name: 'Dean / System Administrator',
      role: 'ADMIN',
      phone: '+91-9876543210',
    },
  });
  console.log('✅ Created Admin Account:', adminUser.email);

  // 2. Create Teacher Users & Profiles
  const teacherUser1 = await prisma.user.create({
    data: {
      email: 'teacher@smartedu.ai',
      password: hashedPassword,
      name: 'Dr. Aris Thorne',
      role: 'TEACHER',
      phone: '+91-9876543211',
      teacher: {
        create: {
          employeeId: 'EMP-CSE-001',
          department: 'Computer Science & Engineering',
          qualification: 'Ph.D. in Computer Science',
          designation: 'Professor & HOD',
          specialization: 'Artificial Intelligence & Data Mining',
        },
      },
    },
    include: { teacher: true },
  });

  const teacherUser2 = await prisma.user.create({
    data: {
      email: 'prof.sharma@smartedu.ai',
      password: hashedPassword,
      name: 'Prof. Rajesh Sharma',
      role: 'TEACHER',
      phone: '+91-9876543212',
      teacher: {
        create: {
          employeeId: 'EMP-CSE-002',
          department: 'Computer Science & Engineering',
          qualification: 'M.Tech in Software Engineering',
          designation: 'Associate Professor',
          specialization: 'Database Systems & Algorithms',
        },
      },
    },
    include: { teacher: true },
  });
  console.log('✅ Created 2 Teacher Accounts');

  // 3. Create Student Users & Profiles
  const studentUser1 = await prisma.user.create({
    data: {
      email: 'student@smartedu.ai',
      password: hashedPassword,
      name: 'Harish Kolanjiyappan',
      role: 'STUDENT',
      phone: '+91-9876543220',
      student: {
        create: {
          rollNo: '22CSE045',
          department: 'Computer Science & Engineering',
          semester: 4,
          section: 'A',
          batch: '2022-2026',
          cgpa: 8.04,
          attendanceRate: 78.5,
          riskLevel: 'MEDIUM',
          parentName: 'Kolanjiyappan M.',
          parentPhone: '+91-9876543299',
          parentEmail: 'studymate.hackathon@gmail.com',
        },
      },
    },
    include: { student: true },
  });

  const studentUser2 = await prisma.user.create({
    data: {
      email: 'priya.s@smartedu.ai',
      password: hashedPassword,
      name: 'Priya Sundaram',
      role: 'STUDENT',
      phone: '+91-9876543221',
      student: {
        create: {
          rollNo: '22CSE046',
          department: 'Computer Science & Engineering',
          semester: 4,
          section: 'A',
          batch: '2022-2026',
          cgpa: 9.25,
          attendanceRate: 94.0,
          riskLevel: 'LOW',
          parentName: 'Sundaram R.',
          parentPhone: '+91-9876543298',
        },
      },
    },
    include: { student: true },
  });

  const studentUser3 = await prisma.user.create({
    data: {
      email: 'karthik.v@smartedu.ai',
      password: hashedPassword,
      name: 'Karthik V.',
      role: 'STUDENT',
      phone: '+91-9876543222',
      student: {
        create: {
          rollNo: '22CSE047',
          department: 'Computer Science & Engineering',
          semester: 4,
          section: 'B',
          batch: '2022-2026',
          cgpa: 5.80,
          attendanceRate: 64.0,
          riskLevel: 'HIGH',
          parentName: 'Venkatesh K.',
          parentPhone: '+91-9876543297',
        },
      },
    },
    include: { student: true },
  });
  console.log('✅ Created 3 Student Accounts');

  // 4. Create Courses
  const course1 = await prisma.course.create({
    data: {
      code: 'CSE201',
      name: 'Data Structures & Algorithms',
      department: 'Computer Science & Engineering',
      credits: 4,
      semester: 4,
      description: 'Arrays, Stacks, Queues, Trees, Graphs, Sorting & Searching Algorithms.',
      teacherId: teacherUser2.teacher.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      code: 'CSE301',
      name: 'Artificial Intelligence & Machine Learning',
      department: 'Computer Science & Engineering',
      credits: 4,
      semester: 4,
      description: 'Search algorithms, Neural Networks, Supervised & Unsupervised Learning.',
      teacherId: teacherUser1.teacher.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      code: 'CSE202',
      name: 'Database Management Systems',
      department: 'Computer Science & Engineering',
      credits: 3,
      semester: 4,
      description: 'Relational Model, SQL, Normalization, Transactions & Concurrency Control.',
      teacherId: teacherUser2.teacher.id,
    },
  });
  console.log('✅ Created 3 Courses');

  // 5. Create Classes
  const class1 = await prisma.class.create({
    data: {
      name: 'CSE-4A Data Structures Lab',
      courseId: course1.id,
      teacherId: teacherUser2.teacher.id,
      roomNo: 'Lab-302',
      scheduleTime: 'Mon, Wed 10:00 AM - 11:30 AM',
      department: 'Computer Science & Engineering',
      semester: 4,
      section: 'A',
    },
  });

  const class2 = await prisma.class.create({
    data: {
      name: 'CSE-4A AI Lecture Series',
      courseId: course2.id,
      teacherId: teacherUser1.teacher.id,
      roomNo: 'Hall-101',
      scheduleTime: 'Tue, Thu 02:00 PM - 03:30 PM',
      department: 'Computer Science & Engineering',
      semester: 4,
      section: 'A',
    },
  });
  console.log('✅ Created Classes');

  // 6. Enroll Students
  await prisma.enrollment.createMany({
    data: [
      { studentId: studentUser1.student.id, courseId: course1.id },
      { studentId: studentUser1.student.id, courseId: course2.id },
      { studentId: studentUser1.student.id, courseId: course3.id },
      { studentId: studentUser2.student.id, courseId: course1.id },
      { studentId: studentUser2.student.id, courseId: course2.id },
      { studentId: studentUser3.student.id, courseId: course1.id },
    ],
  });
  console.log('✅ Created Enrollments');

  // 7. Create Assignments & Submissions
  const assignment1 = await prisma.assignment.create({
    data: {
      title: 'Assignment 1: Binary Search Tree Implementation',
      description: 'Implement a self-balancing AVL tree in C++ or Python with insert and delete methods.',
      courseId: course1.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      totalMarks: 100,
    },
  });

  await prisma.assignmentSubmission.create({
    data: {
      assignmentId: assignment1.id,
      studentId: studentUser1.student.id,
      content: 'AVL Tree source code and complexity analysis PDF attached.',
      marksObtained: 85,
      status: 'GRADED',
      feedback: 'Good implementation, handle balance factor edge cases cleanly.',
    },
  });
  console.log('✅ Created Assignments & Submissions');

  // 8. Create Examinations & Results
  const exam1 = await prisma.examination.create({
    data: {
      title: 'Midterm Examination 2026',
      courseId: course1.id,
      examDate: new Date(),
      examType: 'MIDTERM',
      maxMarks: 100,
      roomNo: 'Hall-204',
    },
  });

  await prisma.examResult.createMany({
    data: [
      { examId: exam1.id, studentId: studentUser1.student.id, marksObtained: 76, grade: 'B' },
      { examId: exam1.id, studentId: studentUser2.student.id, marksObtained: 95, grade: 'A+' },
      { examId: exam1.id, studentId: studentUser3.student.id, marksObtained: 42, grade: 'F' },
    ],
  });
  console.log('✅ Created Exam Results');

  // 9. Academic Records
  await prisma.academicRecord.createMany({
    data: [
      { studentId: studentUser1.student.id, semester: 1, gpa: 8.1, creditsEarned: 24, totalCredits: 24 },
      { studentId: studentUser1.student.id, semester: 2, gpa: 8.3, creditsEarned: 24, totalCredits: 24 },
      { studentId: studentUser1.student.id, semester: 3, gpa: 7.7, creditsEarned: 24, totalCredits: 24 },
    ],
  });
  console.log('✅ Created Academic Records');

  console.log('🎉 Seeding complete successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
