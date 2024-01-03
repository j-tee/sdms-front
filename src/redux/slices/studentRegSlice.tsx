import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StudentRegParams, StudentRegState, StudentRegistration } from '../../models/student';
import StudentRegService from '../../services/studentRegService';
import { QueryParams } from '../../models/queryParams';

const initialState: StudentRegState = {
  registrations: [],
  reg_info: {
    all_unregistered_students: [],
    registered: [],
    registered_in_previous_term: [],
    continuing_students_not_registered: [],
    admitted_but_not_regsitered: []
  },
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

export const studentRegSlice = createSlice({
  name: 'studentReg',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRegisteredStudentsForRecordingScores.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      registrations: action.payload.registrations, isLoading: false, std_message: action.payload.message,
      std_status: action.payload.status
    }));
    builder.addCase(getRegisteredStudentsForRecordingScores.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getRegisteredStudentsForRecordingScores.rejected, (state, action: PayloadAction<any>) => ({
      ...state, std_message: action.payload.message, std_status: action.payload.status, isLoading: false
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
        reg_info: action.payload, isLoading: false, std_message: action.payload.message,
        std_status: action.payload.status
      }));
    builder
      .addCase(getRegistrationInformation.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getRegistrationInformation.rejected, (state, action: PayloadAction<any>) => ({
        ...state, std_message: action.payload.message, std_status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(getRegisteredStudents.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        registrations: action.payload.registrations, isLoading: false, std_message: action.payload.message,
        std_status: action.payload.status
      }));
    builder
      .addCase(getRegisteredStudents.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getRegisteredStudents.rejected, (state, action: PayloadAction<any>) => ({
        ...state, std_message: action.payload.message, std_status: action.payload.status, isLoading: false
      }));
  },
});

export default studentRegSlice.reducer;
