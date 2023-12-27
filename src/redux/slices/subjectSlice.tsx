import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Subject, SubjectParams, SubjectState } from '../../models/subject';
import SubjectService from '../../services/subjectService';

const initialState: SubjectState = {
  subjects: [],
  subject: {
    id: 0,
    subject_id: 0,
    subject_name: '',
    subject_code: '',
    branch_id: 0,
    branch_name: '',
    program_name: '',
    department_name: '',
    staff_name: '',
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
};

export const addSubject = createAsyncThunk(
  'subject/addSubject',
  async (subject: Subject, thunkAPI) => {
    try {
      const response = await SubjectService.addSubject(subject);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getSubjects = createAsyncThunk(
  'subject/getSubjects',
  async (params: SubjectParams, thunkAPI) => {
    try {
      const response = await SubjectService.getSubjects(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getSubjectList = createAsyncThunk(
  'subject/getSubjectList',
  async (params: any, thunkAPI) => {
    try {
      const response = await SubjectService.getSubjectList(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubjectList.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      subjects: action.payload.subjects, isLoading: false, message: action.payload.message,
      status: action.payload.status,
    }));
    builder
      .addCase(getSubjects.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        subjects: action.payload.subjects, isLoading: false, message: action.payload.message,
        status: action.payload.status,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getSubjects.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getSubjects.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addSubject.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        subject: action.payload.subject, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addSubject.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addSubject.rejected, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
  },
});

export default subjectSlice.reducer;
