import { configureStore } from '@reduxjs/toolkit';

// Import from existing locations (not yet migrated)
// TODO: Update these paths after migration to new structure

// Auth
import authReducer from '../../redux/slices/authSlice';
import roleReducer from '../../redux/slices/roleSlice';

// Schools
import schoolReducer from '../../redux/slices/schoolSlice';
import subscriptionReducer from '../../redux/slices/subscriptionSlice';
import subscriptionFeeReducer from '../../redux/slices/subscriptionFeeSlice';

// Organization
import circuitReducer from '../../redux/slices/circuitSlice';
import districtReducer from '../../redux/slices/districtSlice';
import regionReducer from '../../redux/slices/regionSlice';
import calendarReducer from '../../redux/slices/calendarSlice';
import departmentReducer from '../../redux/slices/departmentSlice';
import programReducer from '../../redux/slices/programSlice';
import programSubjectReducer from '../../redux/slices/programSubjectSlice';
import stageReducer from '../../redux/slices/stageSlice';
import classGroupReducer from '../../redux/slices/classGroupSlice';
import subjectReducer from '../../redux/slices/subjectSlice';

// Students
import parentReducer from '../../redux/slices/parentSlice';
import studentReducer from '../../redux/slices/studentSlice';
import studentRegReducer from '../../redux/slices/studentRegSlice';
import courseRegReducer from '../../redux/slices/studentCourseRegSlice';

// Admissions
import admissionReducer from '../../redux/slices/admissionSlice';

// Staff
import staffReducer from '../../redux/slices/staffSlice';

// Academics
import assessmentTypeReducer from '../../redux/slices/assesmentTypeSlice';
import assessmentReducer from '../../redux/slices/assessmentSlice';
import scoreSheetReducer from '../../redux/slices/scoreSheetSlice';
import attendanceReducer from '../../redux/slices/attendanceSlice';
import lessonReducer from '../../redux/slices/lessonSlice';
import gradingScaleReducer from '../../redux/slices/gradingScaleSlice';
import exitProfileReducer from '../../redux/slices/exitProfileSlice';

// Finance
import billsFeesReducer from '../../redux/slices/billsFeesSlice';
import paymentReducer from '../../redux/slices/paymentSlice';
import taxReducer from '../../redux/slices/taxSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    // Auth
    auth: authReducer,
    role: roleReducer,
    
    // Schools
    school: schoolReducer,
    subscription: subscriptionReducer,
    subscriptionFee: subscriptionFeeReducer,
    
    // Organization
    circuit: circuitReducer,
    district: districtReducer,
    region: regionReducer,
    calendar: calendarReducer,
    department: departmentReducer,
    program: programReducer,
    programSubject: programSubjectReducer,
    stage: stageReducer,
    classGroup: classGroupReducer,
    subject: subjectReducer,
    
    // Students
    parent: parentReducer,
    student: studentReducer,
    studentReg: studentRegReducer,
    courseReg: courseRegReducer,
    
    // Admissions
    admission: admissionReducer,
    
    // Staff
    staff: staffReducer,
    
    // Academics
    assessmentType: assessmentTypeReducer,
    assessment: assessmentReducer,
    scoreSheet: scoreSheetReducer,
    attendance: attendanceReducer,
    lesson: lessonReducer,
    gradingScale: gradingScaleReducer,
    exitProfile: exitProfileReducer,
    
    // Finance
    billsFees: billsFeesReducer,
    payment: paymentReducer,
    tax: taxReducer,
  },
});
