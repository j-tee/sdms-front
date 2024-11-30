import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Program, ProgramParams, ProgramState } from '../../models/program';
import ProgramService from '../../services/programService';


const initialState: ProgramState = {
  programs: [],
  status: '',
  message: '',
  program: {
    id: 0,
    department_id: 0,
    dept_name: '',
    prog_name: '',
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addProgram = createAsyncThunk(
  'program/addProgram',
  async (program: Program, thunkAPI) => {
    try {
      const response = await ProgramService.addProgram(program);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const getPrograms = createAsyncThunk(
  'program/getPrograms',
  async (params: ProgramParams, thunkAPI) => {
    try {
      const response = await ProgramService.getPrograms(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateProgram = createAsyncThunk(
  'program/updateProgram',
  async (program: Program, thunkAPI) => {
    try {
      const response = await ProgramService.updateProgram(program);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteProgram = createAsyncThunk(
  'program/deleteProgram',
  async (program: Program, thunkAPI) => {
    try {
      const response = await ProgramService.deleteProgram(program, program.id!);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStudentPrograms = createAsyncThunk(
  'program/getStudentPrograms',
  async (params: ProgramParams, thunkAPI) => {
    try {
      const response = await ProgramService.getStudentPrograms(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentPrograms.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state, programs: action.payload.programs, isLoading: false, message: action.payload.message, status: action.payload.status 
    }));
    builder.addCase(getStudentPrograms.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getStudentPrograms.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(updateProgram.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder.addCase(updateProgram.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateProgram.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(deleteProgram.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder.addCase(deleteProgram.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(deleteProgram.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(getPrograms.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        programs: action.payload.programs, isLoading: false, message: action.payload.message, 
        status: action.payload.status,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getPrograms.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getPrograms.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addProgram.fulfilled, (state, action:PayloadAction<any>) => ({
        ...state,
        program: action.payload.program, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addProgram.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addProgram.rejected, (state, action:PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
  },
});

export default programSlice.reducer;
