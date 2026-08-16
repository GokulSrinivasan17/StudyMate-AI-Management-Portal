# SmartEdu AI — AI-Powered Education Management & Academic Intelligence Platform

> **BUILDATHON 2026 — WEB DEVELOPMENT × INTEGRATED AI OFFICIAL ENTRY**

SmartEdu AI is a production-quality, responsive, and interactive frontend application designed to convert educational data into actionable academic intelligence. By continuously tracking attendance rates, assignment submissions, midterm test scores, and student engagement vectors, SmartEdu AI accurately identifies academic risk early and delivers automated, personalized intervention recommendations.

---

## 🎯 Primary Objective & AI Workflow

**ACADEMIC DATA → AI ANALYSIS → RISK DETECTION → PERSONALIZED RECOMMENDATION → ACTION**

### Persona Journeys
- **Student**: Learn → Track → Analyze → Improve (What-If Simulator & AI Assistant)
- **Teacher**: Monitor → Identify → Intervene → Improve (AI Class Insights & Intervention Plans)
- **Admin**: Manage → Analyze → Predict → Decide (Institutional AI Model Oversight & Donut Analytics)
- **AI Engine**: Data Ingestion → Risk Factor Decomposition → Predictive Scoring → Intervention Recommendation

---

## ⚡ Technology Stack

- **Core**: React 18+, Vite
- **Styling**: Tailwind CSS + Custom Design System CSS
- **Routing**: React Router DOM v6
- **Data Visualization**: Recharts (Area, Bar, Pie/Donut, Radar)
- **Icons**: Lucide React
- **API Handling**: Axios service layer (`src/services/*`) with mock fallback controllers
- **State & Alerts**: React Context API (`AuthContext`, `ToastContext`), Demo Role Switcher

---

## 🚀 Quick Start & Running Instructions

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle (optional validation)
npm run build
```

---

## 🔑 Demo Credentials & Persona Switcher

The application features a sticky **Demo Persona Switcher Bar** at the top of the interface for rapid hackathon presentation:

| Persona | Email | Password | Role / Access |
|---|---|---|---|
| **Student Demo** | `student@smartedu.ai` | `password123` | Harish Kolanjiyappan (2nd Year CSE, CGPA 8.04, Medium Risk) |
| **Teacher Demo** | `teacher@smartedu.ai` | `password123` | Dr. Aris Thorne (HOD Academic AI & Professor) |
| **Admin Demo** | `admin@smartedu.ai` | `password123` | Dean / System Administrator |

---

## 🛠️ FastAPI Backend Integration Readiness

All API calls are routed through modular service files in `src/services/` (`authService`, `studentService`, `teacherService`, `adminService`, `aiService`, `reportService`). 

The service functions use an Axios client configured with `VITE_API_BASE_URL` (default: `http://localhost:8000/api`). When a FastAPI backend is connected, zero UI redesign is required — the service layer will automatically communicate with live ML endpoints.

---

## 📁 Directory Structure

```
src/
├── assets/
├── components/
│   ├── common/         # StatCard, RiskBadge, ProgressBar, Modal, Table, etc.
│   ├── navigation/     # DemoSwitcher, GlobalSearch, NotificationBell
│   └── ai/             # AIInsightCard, AIRiskCard, AIChat, LiveRiskAnalyzerModal, InterventionPlanModal
├── context/            # AuthContext, ToastContext
├── data/               # Indian engineering college mock dataset (Students, Teachers, Courses, Exams, AI)
├── layouts/            # PublicLayout, StudentLayout, TeacherLayout, AdminLayout
├── pages/
│   ├── public/         # Home, Courses, CourseDetails, Contact
│   ├── auth/           # Login, Register
│   ├── student/        # Dashboard, Profile, Courses, Assignments, Attendance, Exams, Progress, Recommendations, Prediction, Assistant, Reports, Settings
│   ├── teacher/        # Dashboard, Courses, Classes, Attendance, Assignments, Exams, Students, AI Insights, Reports, Settings
│   └── admin/          # Dashboard, Students, Teachers, Courses, Classes, Assignments, Exams, Grades, Reports, Analytics, AI Monitoring, Settings
├── services/           # Axios API service layer with FastAPI fallback
├── routes/             # AppRoutes setup
├── index.css           # Tailwind + Custom utilities
├── App.jsx
└── main.jsx
```
