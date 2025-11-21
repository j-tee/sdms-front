# Code Reorganization Guide

## 🎯 Overview
This document outlines the comprehensive reorganization of the SDMS (School Data Management System) frontend codebase to improve maintainability, scalability, and developer experience.

## 📋 Current Problems Identified

### 1. **Flat Component Structure**
- 180+ components in a single `src/components/` directory
- No logical grouping or feature separation
- Difficult to find and maintain related components

### 2. **Naming Issues**
- Typos (e.g., `AcademictTermList.tsx`)
- Inconsistent naming patterns
- Mixed concerns (e.g., `StaffDelete.tsx` in services folder)

### 3. **Poor Code Organization**
- No feature-based architecture
- Duplicate code across similar components (Cards, Modals, Dropdowns)
- Deep import paths throughout the codebase
- No shared component library

### 4. **Type Safety Issues**
- Models scattered without clear organization
- No centralized type definitions
- Inconsistent use of TypeScript

## 🏗️ New Structure

```
src/
├── core/                          # Core application configuration
│   ├── config/                    # Environment and API configuration
│   ├── store/                     # Redux store configuration
│   └── types/                     # Global type definitions
│
├── features/                      # Feature-based modules
│   ├── academics/                 # Academic year, terms, assessments
│   │   ├── components/            # Feature-specific components
│   │   ├── services/              # API services
│   │   ├── store/                 # Redux slices
│   │   ├── types/                 # Feature types
│   │   └── index.ts               # Barrel export
│   │
│   ├── admissions/                # Student admissions
│   ├── students/                  # Student management
│   ├── staff/                     # Staff management
│   ├── finance/                   # Payments, bills, subscriptions
│   ├── schools/                   # School and branch management
│   ├── organization/              # Departments, programs, stages, etc.
│   └── auth/                      # Authentication & authorization
│
├── shared/                        # Shared/reusable code
│   ├── components/                # Reusable UI components
│   │   ├── cards/                 # Generic card components
│   │   ├── modals/                # Generic modal components
│   │   ├── dropdowns/             # Generic dropdown components
│   │   └── forms/                 # Generic form components
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # Utility functions
│   ├── contexts/                  # React contexts
│   └── layout/                    # Layout components (Header, Footer)
│
├── pages/                         # Page-level components (route components)
│   ├── HomePage.tsx
│   ├── SchoolsPage.tsx
│   ├── AcademicsPage.tsx
│   └── ...
│
└── assets/                        # Static assets
    ├── images/
    └── styles/
```

## 📦 Feature Module Structure

Each feature module follows a consistent structure:

```
features/[feature-name]/
├── components/                    # Feature-specific components
│   ├── [FeatureName]List.tsx
│   ├── [FeatureName]Card.tsx
│   ├── [FeatureName]Form.tsx
│   ├── [FeatureName]Details.tsx
│   ├── [FeatureName]Edit.tsx
│   └── [FeatureName]Delete.tsx
├── services/                      # API services for this feature
│   └── [featureName]Service.ts
├── store/                         # Redux slice for this feature
│   └── [featureName]Slice.ts
├── types/                         # TypeScript types/interfaces
│   └── index.ts
└── index.ts                       # Barrel export
```

## 🗂️ Component Migration Map

### Academics Feature
**Components to move to `features/academics/components/`:**
- `Academics.tsx` → Main page component
- `AcademicYearCard.tsx`, `AcademicYearList.tsx`, `AcademicYearEdit.tsx`, `AcademicYearDelete.tsx`, `AcademicYearDetails.tsx`, `AcademicYearDetailsModal.tsx`
- `AcademicTermCard.tsx`, `AcademictTermList.tsx` (rename to `AcademicTermList.tsx`), `AcademicTermEdit.tsx`, `AcademicTermDelete.tsx`, `AcademicTermDetails.tsx`
- `AssessmentCard.tsx`, `AssessmentReport.tsx`, `AssessmentTypeCard.tsx`, `AssessmentTypeEdit.tsx`
- `ContinuousAssessmentCard.tsx`
- `GradeScale.tsx`, `GradingScaleEditModal.tsx`, `GradingScaleDeleteModal.tsx`
- `ScoreSheetCard.tsx`
- `AttendanceCard.tsx`

**Services:** `assessmentService.tsx`, `assessmentTypeService.tsx`, `attendanceService.tsx`
**Store:** `assessmentSlice.tsx`, `assesmentTypeSlice.tsx`, `attendanceSlice.tsx`
**Types:** `assessment.tsx`, `assessmentTypes.tsx`, `attendance.tsx`

### Students Feature
**Components to move to `features/students/components/`:**
- All components starting with `Student*` (40+ components)
- `MyWardCard.tsx`, `MyWardDetails.tsx`
- `UnregisteredStudent.tsx`, `RegisteredStudents.tsx`, `NewlyAdmittedStudents.tsx`, `ContunuingStudents.tsx`

**Services:** `studentService.tsx`, `studentRegService.tsx`, `studentCourseRegService.tsx`
**Store:** `studentSlice.tsx`, `studentRegSlice.tsx`, `studentCourseRegSlice.tsx`
**Types:** `student.tsx`, `optionalCourseRegistration.tsx`

### Admissions Feature
**Components to move to `features/admissions/components/`:**
- `AdmissionAdd.tsx`, `AdmissionCard.tsx`, `AdmissionDelete.tsx`, `AdmissionDetails.tsx`, `AdmissionEdit.tsx`, `AdmissionList.tsx`
- `NewAdmissionModal.tsx`
- `RegistrationList.tsx`, `RegistrationDetailsModal.tsx`, `RegistrationEditModal.tsx`
- `Enrolment.tsx`

**Services:** `admissionService.tsx`
**Store:** `admissionSlice.tsx`
**Types:** `admission.tsx`

### Staff Feature
**Components to move to `features/staff/components/`:**
- `StaffCard.tsx`, `StaffDetails.tsx`, `StaffEdit.tsx`, `StaffInformation.tsx`
- `StaffDropDown.tsx`, `StaffClassGroupDropDown.tsx`, `StaffSubjectDropDown.tsx`
- `StaffAssessmentDetails.tsx`

**Services:** `staffService.tsx`, `StaffDelete.tsx` (rename to service function)
**Store:** `staffSlice.tsx`
**Types:** `staff.tsx`

### Finance Feature
**Components to move to `features/finance/components/`:**
- `Finance.tsx`
- `BillsFeesCard.tsx`, `StudentBillsCard.tsx`, `StudentBillsFees.tsx`, `StudentBillFeesModal.tsx`, `StudentTerminalBills.tsx`
- `PaymentCard.tsx`, `PaymentDialog.tsx`, `StudentPaymentCard.tsx`, `StudentPaymentDetails.tsx`, `StudentPayments.tsx`
- `Arrears.tsx`, `Arrearscard.tsx`
- `FinancialSummaryCard.tsx`

**Services:** `billsFeesService.tsx`, `paymentService.tsx`, `taxService.tsx`
**Store:** `billsFeesSlice.tsx`, `paymentSlice.tsx`, `taxSlice.tsx`
**Types:** `billsFees.tsx`, `payment.tsx`, `tax.tsx`

### Schools Feature
**Components to move to `features/schools/components/`:**
- `School.tsx`, `SchoolCard.tsx`, `SchoolEdit.tsx`, `SchoolDropdowns.tsx`
- `RegisterSchool.tsx`
- `Branch.tsx`, `BranchCard.tsx`, `BranchList.tsx`, `BranchEdit.tsx`, `BranchDelete.tsx`, `BranchDetails.tsx`, `BranchForm.tsx`, `AddBranch.tsx`
- `SchoolSubscription.tsx`, `Subscription.tsx`, `SubscriptionModal.tsx`, `SubscriptionFeeCard.tsx`

**Services:** `schoolService.tsx`, `subscriptionService.tsx`, `subscriptionFeeService.tsx`
**Store:** `schoolSlice.tsx`, `subscriptionSlice.tsx`, `subscriptionFeeSlice.tsx`
**Types:** `school.tsx`, `subscription.tsx`, `subscriptionFee.tsx`

### Organization Feature
**Components to move to `features/organization/components/`:**
- `Organisation.tsx`
- `DepartmentCard.tsx`, `DepartmentList.tsx`, `DepartmentEdit.tsx`, `DepartmentDelete.tsx`
- `ProgramCard.tsx`, `ProgramList.tsx`, `ProgramEdit.tsx`, `ProgramDelete.tsx`, `ProgramSubjectDetails.tsx`
- `StageCard.tsx`, `StageEdit.tsx`, `StageDelete.tsx`
- `ClassGroupCard.tsx`, `ClassGroupList.tsx`, `ClassGroupEdit.tsx`, `ClassGroupDelete.tsx`
- `SubjectCard.tsx`, `SubjectList.tsx`, `SubjectDetails.tsx`, `SubjectEditModal.tsx`, `SubjectDeleteModal.tsx`, `AddSubject.tsx`
- `CircuitCard.tsx`, `CircuitEditModal.tsx`, `CircuitDeleteModal.tsx`
- `DistrictCard.tsx`, `DistrictEditModal.tsx`, `DistrictDeleteModal.tsx`
- `RegionCard.tsx`, `RegionEditModal.tsx`, `RegionalDeleteModal.tsx`

**Services:** `departmentService.tsx`, `programService.tsx`, `stageService.tsx`, `classGroupService.tsx`, `subjectService.tsx`, `circuitService.tsx`, `districtService.tsx`, `regionService.tsx`
**Store:** Various slices
**Types:** Various types

### Auth Feature
**Components to move to `features/auth/components/`:**
- `Login.tsx`, `Register.tsx`
- `ResetPasswordComponent.tsx`
- `ManageAccount.tsx`, `ManageUserAccount.tsx`
- `UserManagement.tsx`, `AdminUserMngt.tsx`
- `ManagementRoles.tsx`

**Services:** `authService.tsx`, `roleService.tsx`
**Store:** `authSlice.tsx`, `roleSlice.tsx`
**Types:** `authModel.tsx`, `userModel.tsx`, `role.tsx`

### Shared Components
**Components to move to `shared/components/`:**

**cards/** (Generic reusable card components):
- `PaginationComponent.tsx` → `shared/components/Pagination.tsx`
- Generic card patterns extracted from feature-specific cards

**modals/** (Generic modal components):
- `Confirmation.tsx`
- Modal wrapper components

**dropdowns/** (Generic dropdown components):
- `DayOfWeekDropDown.tsx`
- `LocationDropDown.tsx`
- Generic dropdown patterns

**layout/**:
- `Header.tsx`
- `Footer.tsx`
- `Navigation.tsx`

**Utilities to move to `shared/utils/`:**
- `authHeader.tsx`
- `queryStringFormatter.tsx`
- `userSession.tsx`

**Contexts to move to `shared/contexts/`:**
- `AuthContext.tsx`
- `ToastContext.tsx`
- `Toastify.tsx`

## 🔧 TypeScript Configuration

Update `tsconfig.json` with path aliases:

```json
{
  "compilerOptions": {
    // ... existing config
    "baseUrl": "src",
    "paths": {
      "@features/*": ["features/*"],
      "@shared/*": ["shared/*"],
      "@core/*": ["core/*"],
      "@pages/*": ["pages/*"],
      "@assets/*": ["assets/*"]
    }
  }
}
```

## 📝 Import Pattern Examples

### Before:
```typescript
import Header from './components/Header';
import UserSession from '../utility/userSession';
import { AppDispatch, RootState } from '../redux/store';
import { UserModel } from '../models/userModel';
```

### After:
```typescript
import { Header } from '@shared/layout';
import { UserSession } from '@shared/utils';
import { AppDispatch, RootState } from '@core/store';
import { UserModel } from '@features/auth/types';
```

## 🚀 Migration Steps

### Phase 1: Setup Infrastructure
1. ✅ Create new folder structure
2. Configure TypeScript path aliases
3. Update Redux store organization
4. Set up barrel exports (index.ts files)

### Phase 2: Move Shared Code
1. Move layout components (Header, Footer, Navigation)
2. Move utilities (AuthContext, ToastContext, userSession, etc.)
3. Extract and move generic components
4. Update imports in moved files

### Phase 3: Migrate Features (One at a time)
For each feature:
1. Move components to `features/[feature]/components/`
2. Move services to `features/[feature]/services/`
3. Move Redux slices to `features/[feature]/store/`
4. Move types to `features/[feature]/types/`
5. Create barrel export (`index.ts`)
6. Update all imports
7. Test the feature

### Phase 4: Create Pages
1. Extract page-level logic from components
2. Create page components in `src/pages/`
3. Update App.tsx routing

### Phase 5: Cleanup
1. Remove old folders (`components/`, `services/`, `models/`, `utility/`)
2. Update documentation
3. Run linting and type checking
4. Test entire application

## 🎨 Naming Conventions

### Components
- **List**: `[Feature]List.tsx` - Displays list of items
- **Card**: `[Feature]Card.tsx` - Card display for single item
- **Form**: `[Feature]Form.tsx` - Form for create/edit
- **Details**: `[Feature]Details.tsx` - Detailed view
- **Modal**: `[Feature]Modal.tsx` - Modal dialogs

### Services
- `[feature]Service.ts` - API service functions

### Redux
- `[feature]Slice.ts` - Redux slice

### Types
- Use interfaces for objects: `interface UserModel { ... }`
- Use types for unions/utilities: `type UserRole = 'admin' | 'staff'`

## 📚 Best Practices

1. **Single Responsibility**: Each component should have one clear purpose
2. **Co-location**: Keep related code together (component + types + tests)
3. **Barrel Exports**: Use index.ts files for clean imports
4. **Type Safety**: Use TypeScript properly, avoid `any`
5. **Consistent Naming**: Follow established patterns
6. **Documentation**: Add JSDoc comments to complex functions
7. **Testing**: Add tests as you reorganize

## 🔍 Quick Reference

### Finding Moved Components
Use this mapping table:

| Old Location | New Location | Example |
|-------------|-------------|---------|
| `src/components/Student*.tsx` | `src/features/students/components/` | `StudentList.tsx` |
| `src/components/Staff*.tsx` | `src/features/staff/components/` | `StaffCard.tsx` |
| `src/components/Academic*.tsx` | `src/features/academics/components/` | `AcademicYearList.tsx` |
| `src/components/Header.tsx` | `src/shared/layout/` | `Header.tsx` |
| `src/services/*.tsx` | `src/features/[domain]/services/` | Split by domain |
| `src/models/*.tsx` | `src/features/[domain]/types/` | Split by domain |
| `src/utility/*.tsx` | `src/shared/utils/` or `src/shared/contexts/` | By type |

## ⚠️ Common Pitfalls to Avoid

1. **Circular Dependencies**: Don't create circular imports between features
2. **Overly Generic**: Don't make everything shared; keep feature-specific code in features
3. **Deep Nesting**: Keep folder structure flat within features (max 2-3 levels)
4. **Inconsistent Updates**: Update all imports when moving files
5. **Breaking Changes**: Test after each major move

## 🛠️ Tools & Scripts

### Find Component Usage
```bash
# Find all files importing a specific component
grep -r "import.*StudentCard" src/
```

### Update Import Paths
```bash
# Replace old import patterns with new ones
find src/ -type f -name "*.tsx" -exec sed -i 's|from "../../models/|from "@core/types/|g' {} +
```

## 📞 Support

If you encounter issues during migration:
1. Check this guide first
2. Review the example migrations in git history
3. Ask the team for help

---

**Last Updated:** November 2025
**Status:** In Progress
