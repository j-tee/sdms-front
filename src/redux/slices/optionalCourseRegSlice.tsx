import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StudentOptionalCourse, StudentOptionalCourseParams, StudentOptionalCourseState } from '../../models/optionalCourseRegistration';
import StudentOptionalCourseService from '../../services/optionalCourseRegService';

const initialState: StudentOptionalCourseState = {
    student_optional_courses: [],
    student_optional_course: {
        id: 0,
        student_id: 0,
        program_subject_id: 0,
        subject_code: '',
        subject_name: '',
        term_name: '',
        stage_name: '',
        program_name: '',
        student_name: '',
        reg_date: '',
    },
    status: '',
    message: '',
    isLoading: false,
    pagination: {
        current_page: 0,
        per_page: 0,
        total_items: 0,
        total_pages: 0
    },
    paginate: false
};

export const addStudentOptionalCourse = createAsyncThunk(
  'studentOptionalCourse/addStudentOptionalCourse',
  async (studentOptionalCourse: StudentOptionalCourse, thunkAPI) => {
    try {
      const response = await StudentOptionalCourseService.addStudentOptionalCourse(studentOptionalCourse);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStudentOptionalCourses = createAsyncThunk(
  'studentOptionalCourse/getStudentOptionalCourses',
  async (params: StudentOptionalCourseParams, thunkAPI) => {
    try {
      const response = await StudentOptionalCourseService.getStudentOptionalCourses(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const studentOptionalCourseSlice = createSlice({
  name: 'studentOptionalCourse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentOptionalCourses.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        studentOptionalCourses: action.payload.studentOptionalCourses, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder
      .addCase(getStudentOptionalCourses.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getStudentOptionalCourses.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addStudentOptionalCourse.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        studentOptionalCourse: action.payload.studentOptionalCourse, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addStudentOptionalCourse.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addStudentOptionalCourse.rejected, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
  },
});

export default studentOptionalCourseSlice.reducer;
