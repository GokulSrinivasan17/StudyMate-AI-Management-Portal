export const mockAiData = {
  // Demo Student AI Scenario (Harish Kolanjiyappan)
  studentScenario: {
    studentId: "STU-2026-001",
    studentName: "Harish Kolanjiyappan",
    riskScore: 68,
    riskLevel: "MEDIUM",
    confidence: "94.2%",
    weakSubject: "Advanced Engineering Mathematics",
    weakSubjectCode: "CRS-103",
    currentPredictedScore: 68,
    potentialImprovedScore: 83,
    improvementMargin: 15,
    summary: "Your Mathematics performance has decreased by 12% over the last two assessments alongside an attendance drop to 68% and 1 pending assignment.",
    primaryFactors: [
      {
        factor: "Attendance Failure Risk",
        impact: -15,
        description: "Mathematics attendance (68%) is below mandatory 75% examination eligibility criteria.",
        severity: "CRITICAL"
      },
      {
        factor: "Exam Score Decline",
        impact: -12,
        description: "Midterm I score dropped from 74% to 62% in Partial Differential Equations.",
        severity: "HIGH"
      },
      {
        factor: "Overdue/Pending Assignment",
        impact: -10,
        description: "Assignment 4 (Partial Differential Equations) is due in 4 days with 0% completion recorded.",
        severity: "MEDIUM"
      },
      {
        factor: "Strong Subject Buffer",
        impact: +9,
        description: "High scores in AI & ML (86%) and Java (84%) keep overall CGPA stable at 8.04.",
        severity: "POSITIVE"
      }
    ],
    recommendedActions: [
      {
        id: "REC-1",
        title: "Attend Mathematics lectures consistently",
        description: "Attend all 4 upcoming classes to bring attendance back above 74% eligibility threshold.",
        priority: "URGENT",
        impact: "+6% Grade Boost",
        completed: false
      },
      {
        id: "REC-2",
        title: "Complete Assignment 4 before Friday",
        description: "Submit Fourier transform integral derivations to recover 10% internal assessment marks.",
        priority: "HIGH",
        impact: "+5% Grade Boost",
        completed: false
      },
      {
        id: "REC-3",
        title: "Practice Unit 3 Problem Set",
        description: "Solve 12 curated practice questions on Heat Conduction & Wave Equations.",
        priority: "MEDIUM",
        impact: "+4% Grade Boost",
        completed: false
      },
      {
        id: "REC-4",
        title: "Attempt Recommended AI Practice Quiz",
        description: "Take 15-minute diagnostic quiz to identify specific integration formula gaps.",
        priority: "MEDIUM",
        impact: "+3% Grade Boost",
        completed: false
      }
    ]
  },

  // Mock Chatbot Q&A database for AI Assistant
  chatbotKnowledge: [
    {
      questionKeywords: ["why", "low", "performance", "risk", "reason"],
      response: "Your overall academic performance remains solid with an 8.04 CGPA. However, your academic risk score increased to 68/100 (Medium Risk) primarily due to a 12% score decrease in Mathematics, an attendance dip to 68% in MA401, and 1 pending assignment due Friday."
    },
    {
      questionKeywords: ["weakest", "weak", "subject", "lowest"],
      response: "Advanced Engineering Mathematics (MA401) is currently your weakest subject with an average score of 62% and attendance at 68%. All other subjects (DSA: 78%, DBMS: 81%, Java: 84%, AI/ML: 86%) are performing well!"
    },
    {
      questionKeywords: ["how", "improve", "score", "grade", "better"],
      response: "To boost your Mathematics score by up to +15%:\n1. Attend the next 4 scheduled lectures to clear the 75% attendance threshold.\n2. Complete Assignment 4 before Friday.\n3. Solve the Unit 3 Fourier Transform problem set.\n4. Take our 15-minute AI practice quiz."
    },
    {
      questionKeywords: ["pending", "assignment", "due", "homework"],
      response: "You currently have 1 high-priority pending assignment: Assignment 4: Partial Differential Equations for Advanced Engineering Mathematics, due on 2026-08-20 (in 4 days)."
    },
    {
      questionKeywords: ["attendance", "present", "absent"],
      response: "Your overall attendance across all subjects is 82%. Breakdown:\n- Data Structures: 91% (Excellent)\n- Object Oriented Java: 88% (Excellent)\n- AI & Machine Learning: 86% (Excellent)\n- Database Systems: 85% (Excellent)\n- Engineering Mathematics: 68% (Warning: Below 75%)"
    },
    {
      questionKeywords: ["predict", "exam", "next", "future"],
      response: "Based on current trends, your predicted score in the upcoming Endterm Mathematics Exam is 68% (Grade B). If you complete pending assignment 4 and attend upcoming classes, your predicted score rises to 83% (Grade A)."
    }
  ],

  // Admin AI System Monitoring metrics
  adminAiMonitoring: {
    modelStatus: "ONLINE & ACTIVE",
    modelName: "SmartEdu-Predictor-v2.4",
    lastUpdated: "2026-08-16 11:00 AM",
    totalPredictionsGenerated: 14250,
    studentsAnalyzed: 1250,
    highRiskCount: 14,
    mediumRiskCount: 38,
    lowRiskCount: 1198,
    modelAccuracy: "94.8%",
    recentLogs: [
      {
        id: "LOG-901",
        studentName: "Arun Kumar",
        studentId: "STU-2026-002",
        riskLevel: "HIGH",
        confidence: "96.4%",
        primaryFactor: "Multiple attendance drop & overdue assignments",
        recommendation: "Academic counseling & mandatory tutorial lab",
        timestamp: "10 mins ago"
      },
      {
        id: "LOG-902",
        studentName: "Harish Kolanjiyappan",
        studentId: "STU-2026-001",
        riskLevel: "MEDIUM",
        confidence: "94.2%",
        primaryFactor: "Mathematics score dip & attendance warning",
        recommendation: "Unit 3 practice module & Assignment 4 prompt",
        timestamp: "25 mins ago"
      },
      {
        id: "LOG-903",
        studentName: "Ananya Sharma",
        studentId: "STU-2026-005",
        riskLevel: "CRITICAL",
        confidence: "97.1%",
        primaryFactor: "Overall attendance below 60% with failing midterms",
        recommendation: "Parent teacher conference & Dean review",
        timestamp: "1 hour ago"
      },
      {
        id: "LOG-904",
        studentName: "Siddharth Das",
        studentId: "STU-2026-012",
        riskLevel: "HIGH",
        confidence: "93.8%",
        primaryFactor: "Control Systems midterm failure",
        recommendation: "Peer tutoring assignment",
        timestamp: "2 hours ago"
      }
    ]
  },

  // Active Teacher Intervention Plans
  activeInterventions: [
    {
      id: "INT-101",
      studentName: "Arun Kumar",
      studentId: "STU-2026-002",
      teacherName: "Dr. Aris Thorne",
      concern: "Low attendance in Mathematics (62%) and failing midterms.",
      actionPlan: "Mandatory morning remedial tutorial classes & weekly check-in.",
      priority: "HIGH",
      deadline: "2026-08-30",
      status: "IN_PROGRESS",
      createdAt: "2026-08-12"
    },
    {
      id: "INT-102",
      studentName: "Harish Kolanjiyappan",
      studentId: "STU-2026-001",
      teacherName: "Dr. Meera Sharma",
      concern: "Mathematics midterm score dip & attendance warning (68%).",
      actionPlan: "Submit Assignment 4 by Friday and complete Unit 3 practice quiz.",
      priority: "MEDIUM",
      deadline: "2026-08-25",
      status: "IN_PROGRESS",
      createdAt: "2026-08-14"
    }
  ]
};
