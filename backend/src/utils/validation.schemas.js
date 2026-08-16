const { z } = require('zod');

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  role: z.enum(['ADMIN', 'TEACHER', 'STUDENT']).optional().default('STUDENT'),
  phone: z.string().optional(),
  department: z.string().optional(),
  rollNo: z.string().optional(),
  employeeId: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const createStudentSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().min(2, 'Name is required'),
  rollNo: z.string().min(1, 'Roll number is required'),
  department: z.string().min(1, 'Department is required'),
  semester: z.number().int().min(1).max(8).optional().default(1),
  section: z.string().optional().default('A'),
  batch: z.string().optional().default('2024-2028'),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  parentEmail: z.string().email().optional().or(z.literal('')),
});

const updateStudentSchema = createStudentSchema.partial().omit({ email: true, password: true });

const createTeacherSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().min(2, 'Name is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  department: z.string().min(1, 'Department is required'),
  qualification: z.string().optional(),
  designation: z.string().optional().default('Assistant Professor'),
  specialization: z.string().optional(),
});

const createCourseSchema = z.object({
  code: z.string().min(2, 'Course code is required'),
  name: z.string().min(2, 'Course name is required'),
  department: z.string().min(1, 'Department is required'),
  credits: z.number().int().min(1).default(3),
  semester: z.number().int().min(1).max(8).default(1),
  description: z.string().optional(),
  teacherId: z.string().optional().nullable(),
});

const createClassSchema = z.object({
  name: z.string().min(2, 'Class name is required'),
  courseId: z.string().uuid('Valid Course ID required'),
  teacherId: z.string().uuid().optional().nullable(),
  roomNo: z.string().optional(),
  scheduleTime: z.string().optional(),
  department: z.string().min(1, 'Department is required'),
  semester: z.number().int().min(1).default(1),
  section: z.string().optional().default('A'),
});

const createEnrollmentSchema = z.object({
  studentId: z.string().uuid('Valid Student ID required'),
  courseId: z.string().uuid('Valid Course ID required'),
});

const createAssignmentSchema = z.object({
  title: z.string().min(2, 'Assignment title required'),
  description: z.string().optional(),
  courseId: z.string().uuid('Valid Course ID required'),
  dueDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}/)),
  totalMarks: z.number().min(1).default(100.0),
  fileUrl: z.string().optional(),
});

const submitAssignmentSchema = z.object({
  assignmentId: z.string().uuid('Valid Assignment ID required'),
  content: z.string().optional(),
  fileUrl: z.string().optional(),
});

const gradeSubmissionSchema = z.object({
  marksObtained: z.number().min(0),
  feedback: z.string().optional(),
});

const markAttendanceSchema = z.object({
  classId: z.string().uuid('Valid Class ID required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, 'Date format YYYY-MM-DD required'),
  attendances: z.array(
    z.object({
      studentId: z.string().uuid('Valid Student ID required'),
      status: z.enum(['PRESENT', 'ABSENT', 'LATE']),
      remarks: z.string().optional(),
    })
  ),
});

const createExamSchema = z.object({
  title: z.string().min(2, 'Exam title required'),
  courseId: z.string().uuid('Valid Course ID required'),
  examDate: z.string(),
  examType: z.enum(['MIDTERM', 'INTERNAL', 'FINAL', 'QUIZ']).default('MIDTERM'),
  maxMarks: z.number().min(1).default(100.0),
  roomNo: z.string().optional(),
});

const submitExamResultsSchema = z.object({
  examId: z.string().uuid('Valid Exam ID required'),
  results: z.array(
    z.object({
      studentId: z.string().uuid('Valid Student ID required'),
      marksObtained: z.number().min(0),
      grade: z.string().optional(),
      remarks: z.string().optional(),
    })
  ),
});

const aiPromptSchema = z.object({
  prompt: z.string().min(2, 'Prompt is required'),
  studentId: z.string().optional(),
  courseId: z.string().optional(),
});

const sendNotificationSchema = z.object({
  userId: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  sendEmail: z.boolean().optional().default(false),
  sendTelegram: z.boolean().optional().default(false),
});

module.exports = {
  registerSchema,
  loginSchema,
  createStudentSchema,
  updateStudentSchema,
  createTeacherSchema,
  createCourseSchema,
  createClassSchema,
  createEnrollmentSchema,
  createAssignmentSchema,
  submitAssignmentSchema,
  gradeSubmissionSchema,
  markAttendanceSchema,
  createExamSchema,
  submitExamResultsSchema,
  aiPromptSchema,
  sendNotificationSchema,
};
