import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StudentRegParams, StudentRegState } from '../../models/student';
import StudentRegService from '../../services/studentRegService';

const initialState: StudentRegState = {

  reg_info: {
    all_unregistered_students:[],
    registered:[],
    registered_in_previous_term:[],
    continuing_students_not_registered:[],
    admitted_but_not_regsitered:[]
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

export const getRegisteredStudents = createAsyncThunk(
  'studentReg/getRegisteredStudents',
  async (params: StudentRegParams, thunkAPI) => {
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
  async (params: StudentRegParams, thunkAPI) => {
    try {
      const response = await StudentRegService.getRegistrationInformation(params);
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
