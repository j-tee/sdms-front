import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Subject, SubjectParams, SubjectState } from '../../models/subject';
import SubjectService from '../../services/subjectService';

const initialState: SubjectState = {
  subject_list: [],
  staff_subject_list: [],
  subjects_from_timetable: [],
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

export const deleteSubject = createAsyncThunk(
  'subject/deleteSubject',
  async (subject: any, thunkAPI) => {
    try {
      const response = await SubjectService.deleteSubject(subject);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const updateSubject = createAsyncThunk(
  'subject/updateSubject',
  async (subject: Subject, thunkAPI) => {
    try {
      const response = await SubjectService.updateSubject(subject, subject.id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)
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

export const getSubjectListFromTimeTable = createAsyncThunk(
  'subject/getSubjectListFromTimeTable',
  async (params: any, thunkAPI) => {
    try {
      const response = await SubjectService.getSubjectListFromTimeTable(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getClassSubjectList = createAsyncThunk(
  'subject/getClassSubjectList',
  async (params: any, thunkAPI) => {
    try {
      const response = await SubjectService.getClassSubjectList(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const getStaffSubjectList = createAsyncThunk(
  'subject/getStaffSubjectList',
  async (params: any, thunkAPI) => {
    try {
      const response = await SubjectService.getStaffSubjectList(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)
export const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStaffSubjectList.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        staff_subject_list: action.payload.subjects, isLoading: false, message: action.payload.message,
        status: action.payload.status,
      }));
    builder.addCase(getSubjectListFromTimeTable.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getSubjectListFromTimeTable.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder.addCase(getSubjectListFromTimeTable.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      subjects_from_timetable: action.payload.subjects, isLoading: false, message: action.payload.message,
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
    builder
    .addCase(getClassSubjectList.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      subject_list: action.payload.subjects, isLoading: false, message: action.payload.message,
      status: action.payload.status,
    }));
    builder
      .addCase(getClassSubjectList.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getClassSubjectList.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(updateSubject.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        subject: action.payload.subject, isLoading: false,
        message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(updateSubject.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(updateSubject.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(deleteSubject.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        subject: action.payload.subject, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(deleteSubject.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(deleteSubject.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));  
  },
});

export default subjectSlice.reducer;
