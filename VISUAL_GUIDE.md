# SDMS Frontend - Visual Structure Guide

## 🎨 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      SDMS Frontend                           │
│                 (School Data Management System)              │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
         ┌────▼────┐                    ┌────▼────┐
         │ Public  │                    │ Private │
         │ Routes  │                    │ Routes  │
         └────┬────┘                    └────┬────┘
              │                               │
    ┌─────────┴─────────┐         ┌──────────┴──────────────┐
    │                   │         │                         │
┌───▼────┐      ┌──────▼──┐  ┌──▼─────┐         ┌────────▼────┐
│ Home   │      │  Auth   │  │ Admin  │         │   School    │
│ Page   │      │ Pages   │  │ Pages  │         │   Pages     │
└────────┘      └─────────┘  └────────┘         └─────────────┘
```

## 📂 Detailed Folder Structure

```
src/
│
├── 📦 core/                          # Core Application Layer
│   ├── 🔧 config/                    # Configuration files
│   │   ├── api.config.ts             # API endpoints, timeouts
│   │   ├── app.config.ts             # App-wide settings
│   │   └── constants.ts              # Global constants
│   │
│   ├── 🗄️ store/                     # Redux Store
│   │   ├── store.ts                  # Main store configuration ✅
│   │   ├── rootReducer.ts            # Root reducer (optional)
│   │   └── index.ts                  # Exports ✅
│   │
│   └── 📝 types/                     # Global TypeScript Types
│       ├── api.types.ts              # API response types
│       ├── common.types.ts           # Common shared types
│       └── index.ts                  # Type exports
│
├── 🎯 features/                      # Feature Modules (Domain-Driven)
│   │
│   ├── 🔐 auth/                      # Authentication & Authorization
│   │   ├── components/               ✅ Structure created
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── ResetPassword.tsx
│   │   │   ├── UserManagement.tsx
│   │   │   └── RoleManagement.tsx
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── store/
│   │   │   ├── authSlice.ts
│   │   │   └── roleSlice.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                  # Barrel export ✅
│   │
│   ├── 👨‍🎓 students/                   # Student Management
│   │   ├── components/               ✅ Structure created
│   │   │   ├── StudentList.tsx
│   │   │   ├── StudentCard.tsx
│   │   │   ├── StudentDetails.tsx
│   │   │   ├── StudentForm.tsx
│   │   │   ├── StudentEdit.tsx
│   │   │   ├── StudentRegistration.tsx
│   │   │   ├── MyWards/
│   │   │   └── Parent/
│   │   ├── services/
│   │   │   ├── studentService.ts
│   │   │   ├── studentRegService.ts
│   │   │   └── parentService.ts
│   │   ├── store/
│   │   │   ├── studentSlice.ts
│   │   │   ├── studentRegSlice.ts
│   │   │   └── parentSlice.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                  # Barrel export ✅
│   │
│   ├── 👨‍🏫 staff/                      # Staff Management
│   │   ├── components/               ✅ Structure created
│   │   │   ├── StaffList.tsx
│   │   │   ├── StaffCard.tsx
│   │   │   ├── StaffDetails.tsx
│   │   │   ├── StaffForm.tsx
│   │   │   └── StaffAssessments.tsx
│   │   ├── services/
│   │   │   └── staffService.ts
│   │   ├── store/
│   │   │   └── staffSlice.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                  # Barrel export ✅
│   │
│   ├── 📚 academics/                 # Academic Management
│   │   ├── components/               ✅ Structure created
│   │   │   ├── AcademicYear/
│   │   │   ├── AcademicTerm/
│   │   │   ├── Assessment/
│   │   │   ├── Attendance/
│   │   │   ├── GradeScale/
│   │   │   ├── Lessons/
│   │   │   ├── TimeTable/
│   │   │   └── ScoreSheet/
│   │   ├── services/
│   │   │   ├── assessmentService.ts
│   │   │   ├── attendanceService.ts
│   │   │   ├── lessonService.ts
│   │   │   └── gradingScaleService.ts
│   │   ├── store/
│   │   │   ├── assessmentSlice.ts
│   │   │   ├── attendanceSlice.ts
│   │   │   └── lessonSlice.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                  # Barrel export ✅
│   │
│   ├── 📝 admissions/                # Admissions Management
│   │   ├── components/               ✅ Structure created
│   │   │   ├── AdmissionList.tsx
│   │   │   ├── AdmissionCard.tsx
│   │   │   ├── AdmissionForm.tsx
│   │   │   ├── NewAdmission.tsx
│   │   │   └── Enrolment.tsx
│   │   ├── services/
│   │   │   └── admissionService.ts
│   │   ├── store/
│   │   │   └── admissionSlice.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                  # Barrel export ✅
│   │
│   ├── 💰 finance/                   # Financial Management
│   │   ├── components/               ✅ Structure created
│   │   │   ├── Finance.tsx
│   │   │   ├── Bills/
│   │   │   ├── Payments/
│   │   │   ├── Arrears/
│   │   │   ├── Subscriptions/
│   │   │   └── FinancialSummary.tsx
│   │   ├── services/
│   │   │   ├── billsFeesService.ts
│   │   │   ├── paymentService.ts
│   │   │   ├── subscriptionService.ts
│   │   │   └── taxService.ts
│   │   ├── store/
│   │   │   ├── billsFeesSlice.ts
│   │   │   ├── paymentSlice.ts
│   │   │   └── subscriptionSlice.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                  # Barrel export ✅
│   │
│   ├── 🏫 schools/                   # School Management
│   │   ├── components/               ✅ Structure created
│   │   │   ├── SchoolList.tsx
│   │   │   ├── SchoolCard.tsx
│   │   │   ├── SchoolForm.tsx
│   │   │   ├── RegisterSchool.tsx
│   │   │   ├── Branch/
│   │   │   └── Subscription/
│   │   ├── services/
│   │   │   └── schoolService.ts
│   │   ├── store/
│   │   │   └── schoolSlice.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                  # Barrel export ✅
│   │
│   └── 🏢 organization/              # Organization Structure
│       ├── components/               ✅ Structure created
│       │   ├── Organization.tsx
│       │   ├── Department/
│       │   ├── Program/
│       │   ├── Stage/
│       │   ├── ClassGroup/
│       │   ├── Subject/
│       │   ├── Calendar/
│       │   ├── Circuit/
│       │   ├── District/
│       │   └── Region/
│       ├── services/
│       │   ├── departmentService.ts
│       │   ├── programService.ts
│       │   ├── classGroupService.ts
│       │   ├── subjectService.ts
│       │   └── calendarService.ts
│       ├── store/
│       │   ├── departmentSlice.ts
│       │   ├── programSlice.ts
│       │   └── classGroupSlice.ts
│       ├── types/
│       │   └── index.ts
│       └── index.ts                  # Barrel export ✅
│
├── 🔄 shared/                        # Shared/Reusable Code
│   │
│   ├── 🎨 components/                # Shared UI Components
│   │   ├── cards/                    ✅ Structure created
│   │   │   ├── BaseCard.tsx
│   │   │   ├── InfoCard.tsx
│   │   │   └── index.ts
│   │   ├── modals/                   ✅ Structure created
│   │   │   ├── ConfirmationModal.tsx
│   │   │   ├── BaseModal.tsx
│   │   │   └── index.ts
│   │   ├── dropdowns/                ✅ Structure created
│   │   │   ├── BaseDropdown.tsx
│   │   │   ├── SearchDropdown.tsx
│   │   │   └── index.ts
│   │   ├── forms/                    ✅ Structure created
│   │   │   ├── FormInput.tsx
│   │   │   ├── FormSelect.tsx
│   │   │   └── index.ts
│   │   ├── Pagination.tsx
│   │   └── index.ts
│   │
│   ├── 🎭 layout/                    # Layout Components
│   │   ├── Header.tsx                ✅ Structure created
│   │   ├── Footer.tsx                ✅ Structure created
│   │   ├── Navigation.tsx            ✅ Structure created
│   │   └── index.ts                  # Barrel export ✅
│   │
│   ├── 🎣 hooks/                     # Custom React Hooks
│   │   ├── useAuth.ts                ✅ Structure created
│   │   ├── useDebounce.ts
│   │   ├── usePagination.ts
│   │   └── index.ts
│   │
│   ├── 🌍 contexts/                  # React Contexts
│   │   ├── AuthContext.tsx           ✅ Structure created
│   │   ├── ToastContext.tsx          ✅ Structure created
│   │   ├── Toastify.tsx              ✅ Structure created
│   │   └── index.ts                  # Barrel export ✅
│   │
│   └── 🛠️ utils/                     # Utility Functions
│       ├── authHeader.ts             ✅ Structure created
│       ├── userSession.ts            ✅ Structure created
│       ├── queryStringFormatter.ts   ✅ Structure created
│       ├── dateFormatter.ts
│       ├── validators.ts
│       └── index.ts                  # Barrel export ✅
│
├── 📄 pages/                         # Page Components (Routes)
│   ├── HomePage.tsx                  ✅ Structure created
│   ├── SchoolsPage.tsx
│   ├── StudentsPage.tsx
│   ├── StaffPage.tsx
│   ├── AcademicsPage.tsx
│   ├── FinancePage.tsx
│   ├── SystemAdminPage.tsx
│   └── index.ts
│
├── 🖼️ assets/                        # Static Assets
│   ├── images/
│   │   └── logo.png
│   └── styles/
│       └── global.css
│
├── App.tsx                           # Main App Component
├── App.css
├── index.tsx                         # Entry Point
└── index.css
```

## 🔄 Data Flow Diagram

```
┌──────────────────────────────────────────────────────┐
│                    User Interface                     │
│              (React Components in pages/)             │
└────────────────────┬─────────────────────────────────┘
                     │
                     ├─────────────────────┐
                     │                     │
          ┌──────────▼──────────┐   ┌────▼─────────┐
          │  Feature Components │   │    Shared    │
          │  (features/*/       │   │  Components  │
          │   components/)      │   │  (shared/)   │
          └──────────┬──────────┘   └──────────────┘
                     │
          ┌──────────▼──────────┐
          │   Redux Store       │
          │   (core/store/)     │
          └──────────┬──────────┘
                     │
          ┌──────────▼──────────┐
          │    Services         │
          │  (features/*/       │
          │   services/)        │
          └──────────┬──────────┘
                     │
          ┌──────────▼──────────┐
          │    Backend API      │
          │  (External Server)  │
          └─────────────────────┘
```

## 🎯 Import Flow Example

```typescript
// Page Component
pages/StudentsPage.tsx
    │
    ├─→ import { Header } from '@shared/layout'
    ├─→ import { StudentList } from '@features/students'
    ├─→ import { useAuth } from '@shared/contexts'
    └─→ import type { RootState } from '@core/store'

// Feature Component
features/students/components/StudentList.tsx
    │
    ├─→ import { StudentCard } from './StudentCard'
    ├─→ import { studentService } from '../services'
    ├─→ import { fetchStudents } from '../store/studentSlice'
    ├─→ import type { Student } from '../types'
    └─→ import { Pagination } from '@shared/components'

// Shared Component
shared/components/Pagination.tsx
    │
    ├─→ import React from 'react'
    ├─→ import { Button } from 'react-bootstrap'
    └─→ import type { PaginationProps } from '@core/types'
```

## 🗺️ Component Relationships

```
┌─────────────────────────────────────────────────────┐
│                    App.tsx                           │
│  ┌─────────────────────────────────────────────┐   │
│  │            Router (Routes)                   │   │
│  │  ┌──────────────────────────────────────┐  │   │
│  │  │         AuthProvider                  │  │   │
│  │  │  ┌───────────────────────────────┐   │  │   │
│  │  │  │      ToastProvider             │   │  │   │
│  │  │  │  ┌────────────────────────┐   │   │  │   │
│  │  │  │  │   Page Components       │   │   │  │   │
│  │  │  │  │   - HomePage            │   │   │  │   │
│  │  │  │  │   - StudentsPage        │   │   │  │   │
│  │  │  │  │   - StaffPage           │   │   │  │   │
│  │  │  │  │   - FinancePage         │   │   │  │   │
│  │  │  │  │   Each uses:            │   │   │  │   │
│  │  │  │  │   - Feature Components  │   │   │  │   │
│  │  │  │  │   - Shared Components   │   │   │  │   │
│  │  │  │  │   - Shared Contexts     │   │   │  │   │
│  │  │  │  └────────────────────────┘   │   │  │   │
│  │  │  └───────────────────────────────┘   │  │   │
│  │  └──────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## 📊 Complexity Comparison

### Before (Flat Structure):
```
components/
├── StudentCard.tsx                 ← 😕 Where is this used?
├── StudentDetails.tsx              ← 😕 Related to StudentCard?
├── StaffCard.tsx                   ← 😕 Similar to StudentCard?
├── PaymentCard.tsx                 ← 😕 Any relation?
├── ... 176 more files              ← 😱 Good luck finding anything!
```

### After (Feature-Based):
```
features/
├── students/
│   ├── components/
│   │   ├── StudentCard.tsx         ← ✅ Clear: Student-related
│   │   └── StudentDetails.tsx      ← ✅ Clear: Student-related
│   ├── services/
│   │   └── studentService.ts       ← ✅ Clear: Student API calls
│   └── types/
│       └── index.ts                ← ✅ Clear: Student types
├── staff/
│   └── components/
│       └── StaffCard.tsx           ← ✅ Clear: Staff-related
└── finance/
    └── components/
        └── PaymentCard.tsx         ← ✅ Clear: Finance-related
```

## 🎓 Learning Path

```
1. Start Here
   └─→ QUICK_START.md

2. Understand Structure
   └─→ This File (VISUAL_GUIDE.md)

3. Learn Details
   └─→ REORGANIZATION_GUIDE.md

4. Follow Standards
   └─→ CODING_STANDARDS.md

5. Execute Migration
   └─→ MIGRATION_SUMMARY.md
```

## 🔍 Quick Find Guide

**Need to find something?**

```
Authentication logic?
  └─→ features/auth/

Student management?
  └─→ features/students/

Payment processing?
  └─→ features/finance/

Reusable button/modal?
  └─→ shared/components/

Header or Footer?
  └─→ shared/layout/

Utility function?
  └─→ shared/utils/

TypeScript type?
  └─→ features/[domain]/types/ or core/types/

Redux store?
  └─→ core/store/

Page component?
  └─→ pages/
```

---

**This visual guide should help you navigate the new structure! 🗺️**
