# Quick Start Guide - Code Reorganization

## 🚀 Getting Started

This guide will help you quickly understand and work with the reorganized codebase.

## 📁 Quick Reference: Where Things Are

### Before → After

| What You're Looking For | Old Location | New Location |
|------------------------|--------------|--------------|
| **Student components** | `src/components/Student*.tsx` | `src/features/students/components/` |
| **Staff components** | `src/components/Staff*.tsx` | `src/features/staff/components/` |
| **Academic components** | `src/components/Academic*.tsx` | `src/features/academics/components/` |
| **Authentication** | `src/components/Login.tsx` | `src/features/auth/components/` |
| **Layout (Header/Footer)** | `src/components/Header.tsx` | `src/shared/layout/` |
| **Utilities** | `src/utility/` | `src/shared/utils/` or `src/shared/contexts/` |
| **API Services** | `src/services/studentService.tsx` | `src/features/students/services/` |
| **Redux Slices** | `src/redux/slices/studentSlice.tsx` | `src/features/students/store/` |
| **Types/Models** | `src/models/student.tsx` | `src/features/students/types/` |
| **Redux Store** | `src/redux/store.tsx` | `src/core/store/` |
| **Pages** | `src/components/Home.tsx` | `src/pages/HomePage.tsx` |

## 🗂️ New Structure at a Glance

```
src/
├── features/              # Feature modules (domain-based)
│   ├── academics/         # Academic year, terms, assessments
│   ├── admissions/        # Student admissions
│   ├── students/          # Student management
│   ├── staff/             # Staff management
│   ├── finance/           # Payments, bills, subscriptions
│   ├── schools/           # Schools & branches
│   ├── organization/      # Departments, programs, etc.
│   └── auth/              # Login, registration
│
├── shared/                # Shared code
│   ├── components/        # Reusable UI components
│   ├── layout/            # Header, Footer, Navigation
│   ├── utils/             # Utility functions
│   ├── contexts/          # React contexts
│   └── hooks/             # Custom hooks
│
├── core/                  # Core app setup
│   ├── store/             # Redux store
│   ├── config/            # App configuration
│   └── types/             # Global types
│
└── pages/                 # Page components
```

## 🎯 How to Find Components

### 1. By Feature/Domain
Components are grouped by what they do:

```bash
# Working with students?
src/features/students/

# Working with payments?
src/features/finance/

# Working with school structure?
src/features/organization/
```

### 2. By Type Within Feature

```bash
# UI Components
src/features/students/components/

# API Calls
src/features/students/services/

# State Management
src/features/students/store/

# Type Definitions
src/features/students/types/
```

## 💡 Common Tasks

### Adding a New Feature

1. Create feature folder structure:
```bash
mkdir -p src/features/my-feature/{components,services,store,types}
```

2. Create components:
```bash
touch src/features/my-feature/components/MyFeatureList.tsx
touch src/features/my-feature/components/MyFeatureCard.tsx
```

3. Create service:
```bash
touch src/features/my-feature/services/myFeatureService.ts
```

4. Create Redux slice:
```bash
touch src/features/my-feature/store/myFeatureSlice.ts
```

5. Create barrel export:
```bash
touch src/features/my-feature/index.ts
```

### Importing Components

Use the new path aliases:

```typescript
// ✅ New way (with aliases)
import { StudentList } from '@features/students';
import { Header } from '@shared/layout';
import { authHeader } from '@shared/utils';
import { store } from '@core/store';

// ❌ Old way (don't do this)
import StudentList from './components/StudentList';
import Header from '../../../components/Header';
```

### Creating a New Component

```typescript
// src/features/students/components/StudentCard.tsx

import React from 'react';
import { Card } from 'react-bootstrap';
import type { Student } from '../types';

interface StudentCardProps {
  student: Student;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{student.firstName} {student.lastName}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;
```

Then add to barrel export:
```typescript
// src/features/students/index.ts
export { StudentCard } from './components/StudentCard';
```

## 🔧 Running the Migration

### Option 1: Manual Migration (Recommended for learning)

Start with one feature at a time:

1. **Move shared components first:**
```bash
# Move layout components
mv src/components/Header.tsx src/shared/layout/
mv src/components/Footer.tsx src/shared/layout/

# Move utilities
mv src/utility/authHeader.tsx src/shared/utils/
mv src/utility/ToastContext.tsx src/shared/contexts/
```

2. **Move one feature:**
```bash
# Example: Students feature
mv src/components/Student*.tsx src/features/students/components/
mv src/services/studentService.tsx src/features/students/services/
mv src/redux/slices/studentSlice.tsx src/features/students/store/
mv src/models/student.tsx src/features/students/types/
```

3. **Update imports in moved files**
4. **Test that feature**
5. **Repeat for next feature**

### Option 2: Automated Script

```bash
# Run the migration script
./migrate.sh
```

**⚠️ Warning:** This will move ALL files. Recommended to:
1. Commit all changes first
2. Review the script before running
3. Test thoroughly after migration

## 🐛 Fixing Import Errors

After moving files, you'll need to update imports:

### Common Import Fixes

```typescript
// ❌ Old
import UserSession from '../utility/userSession';
import { AppDispatch } from '../redux/store';
import { Student } from '../models/student';

// ✅ New
import { UserSession } from '@shared/utils';
import type { AppDispatch } from '@core/store';
import type { Student } from '@features/students/types';
```

### Quick Find & Replace

Use VS Code's find and replace (Ctrl+Shift+H):

```
Find: from ['"]\.\.\/utility\/
Replace with: from '@shared/utils/

Find: from ['"]\.\.\/redux\/store['"]
Replace with: from '@core/store'

Find: from ['"]\.\.\/models\/
Replace with: from '@features/[FEATURE]/types/
```

## ✅ Testing After Migration

### 1. Check for TypeScript Errors
```bash
npx tsc --noEmit
```

### 2. Try Building
```bash
npm run build
```

### 3. Run Development Server
```bash
npm start
```

### 4. Test Key Features
- Login/Logout
- Navigation between pages
- CRUD operations
- Form submissions

## 📊 Progress Tracking

Use this checklist to track your migration:

### Phase 1: Infrastructure
- [ ] Created new folder structure
- [ ] Updated tsconfig.json with path aliases
- [ ] Created barrel exports (index.ts files)

### Phase 2: Shared Code
- [ ] Moved layout components (Header, Footer, Navigation)
- [ ] Moved utilities (authHeader, userSession, etc.)
- [ ] Moved contexts (AuthContext, ToastContext)
- [ ] Updated imports in moved files

### Phase 3: Features
- [ ] Auth feature (Login, Register, etc.)
- [ ] Students feature
- [ ] Staff feature
- [ ] Academics feature
- [ ] Admissions feature
- [ ] Finance feature
- [ ] Schools feature
- [ ] Organization feature

### Phase 4: Finalization
- [ ] Created page components
- [ ] Updated App.tsx
- [ ] Reorganized Redux store
- [ ] Removed old folders
- [ ] All tests passing
- [ ] Documentation updated

## 🆘 Common Issues

### Issue: "Module not found"

**Solution:** Check your import path and ensure you're using the new path aliases.

```typescript
// If this doesn't work:
import { StudentList } from '@features/students';

// Try this:
import StudentList from '@features/students/components/StudentList';

// Then update the barrel export in features/students/index.ts
```

### Issue: "Cannot find type definitions"

**Solution:** Make sure to use `type` imports for TypeScript types:

```typescript
import type { Student } from '@features/students/types';
```

### Issue: Circular dependencies

**Solution:** 
- Features should not import from each other
- Move shared code to `shared/`
- Use dependency injection or events

## 🎓 Learning Resources

- [REORGANIZATION_GUIDE.md](./REORGANIZATION_GUIDE.md) - Complete migration guide
- [CODING_STANDARDS.md](./CODING_STANDARDS.md) - Code standards and best practices
- [Feature-Based Architecture](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/) - External resource

## 💬 Getting Help

1. Check this guide
2. Review the example code in migrated features
3. Check git history for examples: `git log --follow <filename>`
4. Ask the team

## 🎯 Quick Commands Reference

```bash
# Find where a component is used
grep -r "StudentCard" src/

# Find all imports of a specific module
grep -r "from.*student.*Service" src/

# Count files in a directory
find src/features/students -type f | wc -l

# List all TypeScript files
find src/ -name "*.tsx" -o -name "*.ts"

# Check for any remaining old imports
grep -r "from ['\"]\.\./" src/features/
```

## 🚦 Ready to Start?

1. **Read:** [REORGANIZATION_GUIDE.md](./REORGANIZATION_GUIDE.md)
2. **Understand:** [CODING_STANDARDS.md](./CODING_STANDARDS.md)
3. **Practice:** Move one small feature manually
4. **Execute:** Run migration script or continue manually
5. **Test:** Verify everything works
6. **Celebrate:** 🎉 You have a better codebase!

---

**Need more help?** Check the detailed guides or reach out to the team.
