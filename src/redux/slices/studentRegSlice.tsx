import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Registration, StudentRegParams, StudentRegState, StudentRegistration } from '../../models/student';
import StudentRegService from '../../services/studentRegService';
import { QueryParams } from '../../models/queryParams';

const initialState: StudentRegState = {
  admitted_but_not_registered_pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
  continuing_students_not_registered_pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
  registered_in_previous_term_pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
  registered_pagination:{
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
  all_unregistered_students_pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
  registration:{
    id: 0,
    student_id: 0,
    class_group_id: 0,
    academic_term_id: 0,
    reg_date: ''
  },
  students: [],
  unregistered_students: [],
  registered_students: [],
  registrations: [],
  all_unregistered_students: [],
  registered: [],
  registered_in_previous_term: [],
  continuing_students_not_registered: [],
  admitted_but_not_registered: [],
  status: '',
  message: '',
  isLoading: false,
  pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
};

export const registerStudents = createAsyncThunk(
  'studentReg/registerStudents',
  async (registrations: any, thunkAPI) => {
    try {
      const response = await StudentRegService.registerStudents(registrations);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getRegisteredStudents = createAsyncThunk(
  'studentReg/getRegisteredStudents',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await StudentRegService.getRegisteredStudents(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getRegistrationInformation = createAsyncThunk(
  'studentReg/getRegistrationInformation',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await StudentRegService.getRegistrationInformation(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getRegisteredStudentsForRecordingScores = createAsyncThunk(
  'studentReg/getRegisteredStudentsForRecordingScores',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await StudentRegService.getRegisteredStudentsForRecordingScores(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getOptionalCourseRegistrations = createAsyncThunk(
  'studentReg/getOptionalCourseRegistrations',
  async (params: any, thunkAPI) => {
    try {
      const response = await StudentRegService.getOptionalCourseRegistrations(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const getStudentRegistration = createAsyncThunk(
  'studentReg/getStudentRegistration',
  async (params: any, thunkAPI) => {
    try {
      const response = await StudentRegService.getStudentRegistration(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const updateRegistration = createAsyncThunk(
  'studentReg/updateRegistration',
  async (registration: Registration, thunkAPI) => {
    try {
      const response = await StudentRegService.updateRegistration(registration);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const studentRegSlice = createSlice({
  name: 'studentReg',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateRegistration.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state, status: action.payload.status, message: action.payload.message, isLoading: false
    }));
    builder.addCase(updateRegistration.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateRegistration.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder.addCase(getStudentRegistration.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      registration: action.payload.registration, isLoading: false, message: action.payload.message,
      std_status: action.payload.status
    }));
    builder.addCase(getStudentRegistration.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getStudentRegistration.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, std_status: action.payload.status, isLoading: false
    }));
    builder.addCase(getOptionalCourseRegistrations.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      registered_students: action.payload.registered,
      unregistered_students: action.payload.unregistered, isLoading: false, message: action.payload.message,
      std_status: action.payload.status
    }));
    builder.addCase(getOptionalCourseRegistrations.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getOptionalCourseRegistrations.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, std_status: action.payload.status, isLoading: false
    }));
    builder.addCase(getRegisteredStudentsForRecordingScores.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      students: action.payload.students, isLoading: false, message: action.payload.message,
      std_status: action.payload.status
    }));
    builder.addCase(getRegisteredStudentsForRecordingScores.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getRegisteredStudentsForRecordingScores.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, std_status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(registerStudents.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        status: action.payload.status,
        message: action.payload.message,
        isLoading: false,
      }));
    builder.addCase(registerStudents.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(registerStudents.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(getRegistrationInformation.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        all_unregistered_students: action.payload.all_unregistered_students.students,
        all_unregistered_students_pagination: action.payload.all_unregistered_students.pagination,
        registered: action.payload.registered.students,
        registered_pagination: action.payload.registered.pagination,
        registered_in_previous_term: action.payload.registered_in_previous_term.students,
        registered_in_previous_term_pagination: action.payload.registered_in_previous_term.pagination,
        continuing_students_not_registered: action.payload.continuing_students_not_registered.students,
        continuing_students_not_registered_pagination: action.payload.continuing_students_not_registered.pagination,
        admitted_but_not_registered: action.payload.admitted_but_not_registered.students,
        admitted_but_not_registered_pagination: action.payload.admitted_but_not_registered.pagination,

        // reg_info: action.payload, isLoading: false, message: action.payload.message,
        std_status: action.payload.status
      }));
    builder
      .addCase(getRegistrationInformation.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getRegistrationInformation.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, std_status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(getRegisteredStudents.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        registrations: action.payload.registrations, isLoading: false, message: action.payload.message,
        std_status: action.payload.status,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getRegisteredStudents.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getRegisteredStudents.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, std_status: action.payload.status, isLoading: false
      }));
  },
});

export default studentRegSlice.reducer;
