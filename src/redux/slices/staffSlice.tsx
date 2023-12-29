import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Staff, StaffParams, StaffState } from '../../models/staff';
import StaffService from '../../services/staffService';

const initialState: StaffState = {
  staffs: [],
  message: '',
  status: '',
  staff: {
    email: '',
    first_name: '',
    last_name: '',
    dob: '',
    designation: '',
    gender: '',
    phone_number: '',
    branch_id: 0,
    id: 0,
    branch_name: '',
    image_url: ''
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addStaff = createAsyncThunk(
  'staff/addStaff',
  async (staff: FormData, thunkAPI) => {
    try {
      const response = await StaffService.addStaff(staff);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStaffs = createAsyncThunk(
  'Staff/getStaffs',
  async (params: StaffParams, thunkAPI) => {
    try {
      const response = await StaffService.getStaffs(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteStaff = createAsyncThunk(
  'staff/deleteStaff',
  async (staff: Staff, thunkAPI) => {
    try {
      const response = await StaffService.deleteStaff(staff);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateStaff = createAsyncThunk(
  'staff/updateStaff',
  async (staff: FormData, thunkAPI) => {
    try {
      const response = await StaffService.updateStaff(staff);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const circuitSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStaff.fulfilled, (state, action) => ({
        ...state,
        staff: action.payload.staff, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
      builder.addCase(updateStaff.pending, (state) => ({ ...state, isLoading: true }));
      builder.addCase(updateStaff.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status:
          action.payload.status, isLoading: false
      }));
    builder
      .addCase(getStaffs.fulfilled, (state, action) => ({
        ...state,
        staffs: action.payload.staffs, isLoading: false, message:
          action.payload.message, status: action.payload.status, pagination: action.payload.pagination || initialState.pagination
      }));
    builder
      .addCase(getStaffs.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getStaffs.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));

    builder
      .addCase(addStaff.fulfilled, (state, action) => ({
        ...state,
        Staff: action.payload.staff, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder
      .addCase(addStaff.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addStaff.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status:
          action.payload.status, isLoading: false
      }));
  },
});

export default circuitSlice.reducer;
