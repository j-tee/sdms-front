import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Department, DepartmentParams, DepartmentState } from '../../models/department';
import DepartmentService from '../../services/departmentService';

const initialState: DepartmentState = {
  departments: [],
  status: '',
  message: '',
  department: {
    id: 0,
    branch_id: 0,
    dept_name: '',
    branch_name: '',
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addDepartment = createAsyncThunk(
  'department/addDepartment',
  async (department: Department, thunkAPI) => {
    try {
      const response = await DepartmentService.addDepartment(department);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const getDepartments = createAsyncThunk(
  'department/getDepartments',
  async (params: DepartmentParams, thunkAPI) => {
    try {
      const response = await DepartmentService.getDepartments(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateDepartment = createAsyncThunk(
  'department/updateDepartment',
  async (department: Department, thunkAPI) => {
    try {
      const response = await DepartmentService.updateDepartment(department, department.id || 0);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (id: number, thunkAPI) => {
    try {
      const response = await DepartmentService.deleteDepartment(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStudentDepartments = createAsyncThunk(
  'department/getStudentDepartments',
  async (params: DepartmentParams, thunkAPI) => {
    try {
      const response = await DepartmentService.getStudentDepartments(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentDepartments.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        departments: action.payload.depts, isLoading: false, message: action.payload.message, 
        status: action.payload.status
      }));
      builder.addCase(getStudentDepartments.pending, (state) => ({ ...state, isLoading: true })); 
      builder.addCase(getStudentDepartments.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(deleteDepartment.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        department: action.payload.dept, isLoading: false, message: action.payload.message, 
        status: action.payload.status
      }));
    builder.addCase(deleteDepartment.pending, (state) => ({ ...state, isLoading: true }));  
    builder
      .addCase(deleteDepartment.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(updateDepartment.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        department: action.payload.dept, isLoading: false, message: action.payload.message, 
        status: action.payload.status
      }));
    builder.addCase(updateDepartment.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(updateDepartment.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(getDepartments.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        departments: action.payload.depts, isLoading: false, message: action.payload.message, 
        status: action.payload.status,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getDepartments.pending, (state) => ({ ...state, isLoading: true}));
    builder
      .addCase(getDepartments.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addDepartment.fulfilled, (state, action:PayloadAction<any>) => ({
        ...state,
        department: action.payload.dept, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addDepartment.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addDepartment.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    
  },
});

export default departmentSlice.reducer;
