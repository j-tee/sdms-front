import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProgramSubjectService from '../../services/ProgramSubjectService';
import { ProgramSubject, ProgramSubjectParams, ProgramSubjectState } from '../../models/subject';

const initialState: ProgramSubjectState = {
  course_options: [],
  course_option: {
    id: 0,
    stage_id: 0,
    academic_term_id: 0,
    subject_id: 0,
    program_id: 0,
    stage_name: '',
    program_name: '',
    term_name: '',
    dept_name: '',
    optional: 0,
    credit_hours: 0,
    subject_name: '',
    academic_year_id: 0
  },
  status: '',
  message: '',
  isLoading: false,
  paginate: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addCourseOption = createAsyncThunk(
  'course_option/addSubject',
  async (course_option: ProgramSubject, thunkAPI) => {
    try {
      const response = await ProgramSubjectService.addCourseOption(course_option);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCourseOptions = createAsyncThunk(
  'course_option/getCourseOptions',
  async (params: ProgramSubjectParams, thunkAPI) => {
    try {
      const response = await ProgramSubjectService.getCourseOptions(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCourseOption = createAsyncThunk(
  'course_option/getCourseOption',
  async (params: any, thunkAPI) => {
    try {
      const response = await ProgramSubjectService.getCourseOption(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateCourseOption = createAsyncThunk(
  'course_option/updateCourseOption',
  async (course_option: ProgramSubject, thunkAPI) => {
    try {
      const response = await ProgramSubjectService.updateCourseOption(course_option);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)
export const deleteCourseOption = createAsyncThunk(
  'course_option/deleteCourseOption',
  async (subjectId: number, thunkAPI) => {
    try {
      const response = await ProgramSubjectService.deleteCourseOption(subjectId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)


export const programSubjectSlice = createSlice({
  name: 'course_option',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCourseOption.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state, isLoading: false, message: action.payload.message, status: action.payload.status
    }));
    builder.addCase(deleteCourseOption.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(deleteCourseOption.rejected, (state, action: PayloadAction<any>) => ({
      ...state, isLoading: false, message: action.payload.message, status: action.payload.status
    }));
    builder.addCase(updateCourseOption.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      course_option: action.payload.course_option, 
      isLoading: false, message: action.payload.message, 
      status: action.payload.status   
    }));
    builder.addCase(updateCourseOption.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateCourseOption.rejected, (state, action: PayloadAction<any>) => ({
      ...state, isLoading: false, message: action.payload.message, status: action.payload.status
    }));
    builder
      .addCase(getCourseOption.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        course_option: action.payload.program_subject, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder.addCase(getCourseOption.pending, (state) => ({ ...state, isLoading: true })); 
    builder
      .addCase(getCourseOption.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(getCourseOptions.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        course_options: action.payload.course_options, isLoading: false, message: action.payload.message,
        status: action.payload.status,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getCourseOptions.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getCourseOptions.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addCourseOption.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        course_option: action.payload.course_option, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addCourseOption.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addCourseOption.rejected, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
  },
});

export default programSubjectSlice.reducer;
