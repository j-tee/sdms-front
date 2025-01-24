import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Attendance, AttendanceState } from '../../models/attendance';
import AttendanceService from '../../services/attendanceService';
import { QueryParams } from '../../models/queryParams';

const initialState: AttendanceState = {
  isLoading: false,
  attendees_pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
  attendances: [],
  attendance: {
    id: 0,
    student_id: 0,
    lesson_id: 0,
    status: '',
    start_time: '',
    end_time: '',
    attendance_date: '',
    student_name: '',
    lesson_name: '',
    class_group_name: '',
    admission_id: '',
    last_name: '',
    first_name: '',
    day_of_week: ''
  },
  message: '',
  status: '',
  attendees: [],
  attendances_pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  }
};

export const getAttendees = createAsyncThunk(
  'attendance/getAttendees',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await AttendanceService.getAttendees(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addAttendance = createAsyncThunk(
  'attendance/addAttendance',
  async (attendance: Attendance[], thunkAPI) => {
    try {
      const response = await AttendanceService.addAttendance(attendance);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const getAttendances = createAsyncThunk(
  'attendance/getAttendances',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await AttendanceService.getAttendances(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateAttendance = createAsyncThunk(
  'attendance/updateAttendance',
  async (attendance: Attendance, thunkAPI) => {
    try {
      const response = await AttendanceService.updateAttendance(attendance, attendance.id || 0);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteAttendance = createAsyncThunk(
  'attendance/deleteAttendance',
  async (id: number, thunkAPI) => {
    try {
      const response = await AttendanceService.deleteAttendance(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAttendees.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        attendees: action.payload.registrations, isLoading: false, message: action.payload.message,
        attendees_pagination : action.payload.pagination,
        status: action.payload.status
      }));
    builder.addCase(getAttendees.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getAttendees.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(deleteAttendance.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        attendance: action.payload.dept, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder.addCase(deleteAttendance.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(deleteAttendance.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(updateAttendance.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        attendance: action.payload.dept, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder.addCase(updateAttendance.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(updateAttendance.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(getAttendances.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        attendances: action.payload.attendances, isLoading: false, message: action.payload.message,
        status: action.payload.status,
        attendances_pagination: action.payload.pagination
      }));
    builder
      .addCase(getAttendances.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getAttendances.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addAttendance.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        attendance: action.payload.dept, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addAttendance.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addAttendance.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));

  },
});

export default attendanceSlice.reducer;
