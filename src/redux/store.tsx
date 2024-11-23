import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import schoolReducer from '../redux/slices/schoolSlice';
import circuitReducer from '../redux/slices/circuitSlice';
import districtReducer from '../redux/slices/districtSlice';
import regionReducer from '../redux/slices/regionSlice';
import calendarReducer from '../redux/slices/calendarSlice';
import departmentReducer from '../redux/slices/departmentSlice';
import programReducer from '../redux/slices/programSlice';
import stageReducer from '../redux/slices/stageSlice';
import classGroupReducer from '../redux/slices/classGroupSlice';
import parentReducer from '../redux/slices/parentSlice';
import studentReducer from '../redux/slices/studentSlice';
import admissionReducer from '../redux/slices/admissionSlice';
import studentRegReducer from '../redux/slices/studentRegSlice';
import staffReducer from '../redux/slices/staffSlice';
import subjectReducer from '../redux/slices/subjectSlice';
import programSubjectReducer from '../redux/slices/programSubjectSlice';
import lessonReducer from '../redux/slices/lessonSlice';
import courseRegReducer from '../redux/slices/studentCourseRegSlice';
import roleReducer from '../redux/slices/roleSlice';
import assessmentTypeReducer from './slices/assesmentTypeSlice';
import assessmentReducer from './slices/assessmentSlice';
import scoreSheetReducer from './slices/scoreSheetSlice';
import attendanceReducer from './slices/attendanceSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import subscriptionFeeReducer from './slices/subscriptionFeeSlice';
import taxReducer from './slices/taxSlice';
import billsFeesReducer from './slices/billsFeesSlice';
import paymentReducer from './slices/paymentSlice';
import exitProfileReducer from './slices/exitProfileSlice';
import gradingScaleReducer from './slices/gradingScaleSlice';
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    school: schoolReducer,
    circuit: circuitReducer,
    district: districtReducer,
    region: regionReducer,
    calendar: calendarReducer,
    department: departmentReducer,
    program: programReducer,
    stage: stageReducer,
    classGroup: classGroupReducer,
    parent: parentReducer,
    student: studentReducer,
    admission: admissionReducer,
    studentReg: studentRegReducer,
    staff: staffReducer,
    subject: subjectReducer,
    programSubject: programSubjectReducer,
    lesson: lessonReducer,
    courseReg: courseRegReducer,
    role: roleReducer,
    assessmentType: assessmentTypeReducer,
    assessment: assessmentReducer,
    scoreSheet: scoreSheetReducer,
    attendance: attendanceReducer,
    subscription: subscriptionReducer,
    subscriptionFee: subscriptionFeeReducer,
    tax: taxReducer,
    billsFees: billsFeesReducer,
    payment: paymentReducer,
    exitProfile: exitProfileReducer,
    gradingScale: gradingScaleReducer
  }
})