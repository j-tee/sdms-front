# SDMS Frontend - Coding Standards & Best Practices

## 📐 Project Architecture

This project follows a **feature-based architecture** with clear separation of concerns:

```
src/
├── core/          # Core app configuration, store, global types
├── features/      # Feature modules (domain-driven)
├── shared/        # Reusable components, utilities, contexts
├── pages/         # Page-level components (route handlers)
└── assets/        # Static assets
```

## 🎯 Naming Conventions

### Files & Folders

- **Components**: PascalCase with `.tsx` extension
  - `StudentList.tsx`, `Header.tsx`, `PaymentModal.tsx`
  
- **Services**: camelCase with `.ts` extension
  - `studentService.ts`, `authService.ts`
  
- **Types/Interfaces**: PascalCase with `.ts` extension
  - `index.ts` (in types folder containing interfaces)
  
- **Utilities**: camelCase with `.ts` extension
  - `formatDate.ts`, `queryStringFormatter.ts`
  
- **Folders**: lowercase with hyphens for multi-word
  - `features/`, `shared/`, `class-groups/`

### Components

Follow these naming patterns:

```typescript
// List view component
StudentList.tsx

// Card/item component
StudentCard.tsx

// Form component (create/edit)
StudentForm.tsx

// Detail/view component
StudentDetails.tsx

// Modal component
StudentModal.tsx
DeleteConfirmationModal.tsx

// Dropdown/Select component
StudentDropdown.tsx

// Page component
StudentsPage.tsx
```

### Variables & Functions

```typescript
// camelCase for variables and functions
const studentList = [...];
const isAuthenticated = true;

function calculateTotal() { }
const handleSubmit = () => { };

// PascalCase for React components
const StudentCard: React.FC = () => { };

// UPPER_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
```

### Interfaces & Types

```typescript
// Interface: prefix with 'I' is optional but consistent
interface Student {
  id: number;
  firstName: string;
  lastName: string;
}

// Or without prefix (modern convention)
interface StudentViewModel {
  // ...
}

// Type aliases for unions, utilities
type UserRole = 'admin' | 'staff' | 'student' | 'parent';
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
```

## 🏗️ Component Structure

### Standard Component Template

```typescript
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'react-bootstrap';

// Types
import type { Student } from '@features/students/types';
import type { RootState, AppDispatch } from '@core/store';

// Services
import { studentService } from '@features/students/services';

// Shared components
import { ConfirmationModal } from '@shared/components/modals';

// Styles
import './StudentCard.css';

interface StudentCardProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
}

/**
 * StudentCard component displays student information in a card format
 * 
 * @param student - Student object to display
 * @param onEdit - Optional callback when edit is clicked
 * @param onDelete - Optional callback when delete is clicked
 */
export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
}) => {
  // State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  
  // Effects
  useEffect(() => {
    // Component logic
  }, [student.id]);
  
  // Handlers
  const handleEdit = () => {
    if (onEdit) {
      onEdit(student);
    }
  };
  
  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteStudent(student.id));
      if (onDelete) {
        onDelete(student.id);
      }
    } catch (error) {
      console.error('Failed to delete student:', error);
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };
  
  // Render
  return (
    <Card className="student-card">
      <Card.Body>
        <Card.Title>{`${student.firstName} ${student.lastName}`}</Card.Title>
        <Card.Text>{student.email}</Card.Text>
        
        <div className="actions">
          <Button onClick={handleEdit}>Edit</Button>
          <Button 
            variant="danger" 
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
      
      <ConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Student"
        message="Are you sure you want to delete this student?"
        isLoading={isLoading}
      />
    </Card>
  );
};

export default StudentCard;
```

### Component Organization

Within a component file, organize code in this order:

1. **Imports** (grouped and sorted)
   - React imports
   - Third-party library imports
   - Type imports
   - Local feature imports
   - Shared imports
   - Style imports

2. **Types/Interfaces** (component-specific)

3. **Component Definition**
   - Props destructuring
   - State declarations
   - Redux selectors/dispatch
   - Refs
   - Effects
   - Event handlers
   - Helper functions
   - Render logic

4. **Export**

## 📦 Feature Module Structure

Each feature should be self-contained:

```
features/students/
├── components/           # UI components
│   ├── StudentList.tsx
│   ├── StudentCard.tsx
│   ├── StudentForm.tsx
│   └── StudentDetails.tsx
├── services/            # API calls
│   └── studentService.ts
├── store/               # Redux slice
│   └── studentSlice.ts
├── types/               # TypeScript types
│   └── index.ts
├── hooks/               # Feature-specific hooks (optional)
│   └── useStudent.ts
└── index.ts             # Barrel export
```

### Barrel Exports (index.ts)

```typescript
// features/students/index.ts

// Components
export { StudentList } from './components/StudentList';
export { StudentCard } from './components/StudentCard';
export { StudentForm } from './components/StudentForm';
export { StudentDetails } from './components/StudentDetails';

// Services
export { studentService } from './services/studentService';

// Store
export { 
  studentSlice,
  selectAllStudents,
  selectStudentById,
} from './store/studentSlice';

// Types
export type * from './types';
```

## 🔧 Service Layer

### Service Structure

```typescript
// features/students/services/studentService.ts

import axios from 'axios';
import { authHeader } from '@shared/utils';
import type { Student, StudentParams } from '../types';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const studentService = {
  /**
   * Fetch all students with optional filters
   */
  getStudents: async (params?: StudentParams): Promise<Student[]> => {
    const response = await axios.get(
      `${API_URL}/api/v1/students`,
      { 
        headers: authHeader(),
        params,
      }
    );
    return response.data;
  },
  
  /**
   * Fetch a single student by ID
   */
  getStudentById: async (id: number): Promise<Student> => {
    const response = await axios.get(
      `${API_URL}/api/v1/students/${id}`,
      { headers: authHeader() }
    );
    return response.data;
  },
  
  /**
   * Create a new student
   */
  createStudent: async (student: FormData): Promise<Student> => {
    const response = await axios.post(
      `${API_URL}/api/v1/students`,
      student,
      { headers: authHeader() }
    );
    return response.data;
  },
  
  /**
   * Update an existing student
   */
  updateStudent: async (id: number, student: FormData): Promise<Student> => {
    const response = await axios.put(
      `${API_URL}/api/v1/students/${id}`,
      student,
      { headers: authHeader() }
    );
    return response.data;
  },
  
  /**
   * Delete a student
   */
  deleteStudent: async (id: number): Promise<void> => {
    await axios.delete(
      `${API_URL}/api/v1/students/${id}`,
      { headers: authHeader() }
    );
  },
};
```

## 🗂️ Redux Store

### Slice Structure

```typescript
// features/students/store/studentSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { studentService } from '../services/studentService';
import type { Student } from '../types';
import type { RootState } from '@core/store';

interface StudentState {
  students: Student[];
  currentStudent: Student | null;
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: StudentState = {
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
  status: 'idle',
};

// Async thunks
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (params?: any) => {
    const response = await studentService.getStudents(params);
    return response;
  }
);

export const fetchStudentById = createAsyncThunk(
  'students/fetchStudentById',
  async (id: number) => {
    const response = await studentService.getStudentById(id);
    return response;
  }
);

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (student: FormData) => {
    const response = await studentService.createStudent(student);
    return response;
  }
);

// Slice
const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setCurrentStudent: (state, action: PayloadAction<Student | null>) => {
      state.currentStudent = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch students';
      })
      // Fetch single student
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.currentStudent = action.payload;
      })
      // Create student
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      });
  },
});

// Selectors
export const selectAllStudents = (state: RootState) => state.student.students;
export const selectCurrentStudent = (state: RootState) => state.student.currentStudent;
export const selectStudentsLoading = (state: RootState) => state.student.loading;
export const selectStudentById = (state: RootState, studentId: number) =>
  state.student.students.find((student) => student.id === studentId);

// Actions
export const { setCurrentStudent, clearError } = studentSlice.actions;

// Reducer
export default studentSlice.reducer;
```

## 🎨 Import Best Practices

### Use Path Aliases

```typescript
// ❌ Bad - Relative imports
import { Header } from '../../../../shared/layout/Header';
import { studentService } from '../../../features/students/services/studentService';

// ✅ Good - Path aliases
import { Header } from '@shared/layout';
import { studentService } from '@features/students';
```

### Import Order

```typescript
// 1. React and core libraries
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// 2. Third-party libraries
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

// 3. Type imports
import type { Student } from '@features/students/types';
import type { RootState, AppDispatch } from '@core/store';

// 4. Feature imports
import { studentService } from '@features/students';
import { fetchStudents } from '@features/students/store';

// 5. Shared imports
import { ConfirmationModal } from '@shared/components/modals';
import { useAuth } from '@shared/contexts';
import { formatDate } from '@shared/utils';

// 6. Styles
import './Component.css';
```

## 🧪 Testing Conventions

```typescript
// StudentCard.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { StudentCard } from './StudentCard';
import { store } from '@core/store';

const mockStudent = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
};

describe('StudentCard', () => {
  it('renders student information', () => {
    render(
      <Provider store={store}>
        <StudentCard student={mockStudent} />
      </Provider>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    
    render(
      <Provider store={store}>
        <StudentCard student={mockStudent} onEdit={onEdit} />
      </Provider>
    );
    
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith(mockStudent);
  });
});
```

## 📝 TypeScript Best Practices

### Use Proper Types

```typescript
// ❌ Bad - Using 'any'
function processStudent(student: any) {
  return student.name;
}

// ✅ Good - Proper typing
interface Student {
  id: number;
  firstName: string;
  lastName: string;
}

function processStudent(student: Student): string {
  return `${student.firstName} ${student.lastName}`;
}
```

### Use Type Guards

```typescript
function isStudent(obj: any): obj is Student {
  return obj && typeof obj.id === 'number' && typeof obj.firstName === 'string';
}
```

### Use Utility Types

```typescript
// Partial for optional fields
type UpdateStudentDto = Partial<Student>;

// Pick for selecting fields
type StudentSummary = Pick<Student, 'id' | 'firstName' | 'lastName'>;

// Omit for excluding fields
type StudentWithoutId = Omit<Student, 'id'>;

// Record for key-value pairs
type StudentMap = Record<number, Student>;
```

## 🚀 Performance Best Practices

### Memoization

```typescript
import { useMemo, useCallback } from 'react';

const StudentList: React.FC = () => {
  const students = useSelector(selectAllStudents);
  
  // Memoize expensive calculations
  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => 
      a.lastName.localeCompare(b.lastName)
    );
  }, [students]);
  
  // Memoize callback functions
  const handleStudentClick = useCallback((id: number) => {
    console.log('Clicked student:', id);
  }, []);
  
  return (
    <div>
      {sortedStudents.map(student => (
        <StudentCard 
          key={student.id} 
          student={student}
          onClick={handleStudentClick}
        />
      ))}
    </div>
  );
};
```

### Code Splitting

```typescript
// Lazy load feature components
import React, { lazy, Suspense } from 'react';

const StudentList = lazy(() => import('@features/students/components/StudentList'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudentList />
    </Suspense>
  );
}
```

## 🔒 Security Best Practices

### Never Store Sensitive Data

```typescript
// ❌ Bad
localStorage.setItem('password', password);

// ✅ Good
// Store only tokens, never passwords
localStorage.setItem('token', authToken);
```

### Sanitize User Input

```typescript
import DOMPurify from 'dompurify';

const sanitizedInput = DOMPurify.sanitize(userInput);
```

### Use Environment Variables

```typescript
// .env
REACT_APP_API_BASE_URL=https://api.example.com
REACT_APP_API_KEY=your-api-key

// Usage
const apiUrl = process.env.REACT_APP_API_BASE_URL;
```

## 📚 Documentation

### Component Documentation

```typescript
/**
 * StudentCard component displays student information in a card format
 * 
 * @component
 * @example
 * ```tsx
 * <StudentCard 
 *   student={studentData}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 * ```
 */
export const StudentCard: React.FC<StudentCardProps> = (props) => {
  // ...
};
```

### Function Documentation

```typescript
/**
 * Calculates the student's age based on birth date
 * 
 * @param birthDate - Student's birth date in ISO format
 * @returns Age in years
 * 
 * @throws {Error} If birthDate is invalid
 */
function calculateAge(birthDate: string): number {
  // ...
}
```

## 🎯 Code Review Checklist

- [ ] Component follows single responsibility principle
- [ ] Proper TypeScript types (no `any`)
- [ ] Follows naming conventions
- [ ] Uses path aliases for imports
- [ ] Proper error handling
- [ ] Loading states implemented
- [ ] Accessibility attributes (aria-labels, etc.)
- [ ] Responsive design considered
- [ ] Performance optimized (memoization if needed)
- [ ] Documentation added
- [ ] Tests included

## 🔄 Git Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add student search functionality
fix: resolve authentication token expiry issue
refactor: reorganize student components
docs: update API documentation
style: format code with prettier
test: add tests for StudentCard component
chore: update dependencies
```

---

**Last Updated:** November 2025
