import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Stage, StageParams, StageState, StageViewModel } from '../../models/stage';
import StageService from '../../services/stageService';

const initialState: StageState = {
  stages: [],
  message: '',
  status:'',
  stage: {
    id: 0,
    stage_name: '',
    branch_id: 0,
    branch_name:'',
    school_name:''
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addStage = createAsyncThunk(
  'Stage/addStage',
  async (stage: Stage, thunkAPI) => {
    try {
      const response = await StageService.addStage(stage);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStages = createAsyncThunk(
  'Stage/getStages',
  async (params: StageParams, thunkAPI) => {
    try {
      const response = await StageService.getStages(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateStage = createAsyncThunk(
  'Stage/updateStage',
  async (stage: Stage, thunkAPI) => {
    try {
      const response = await StageService.updateStage(stage, stage.id || 0);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteStage = createAsyncThunk(
  'Stage/deleteStage',
  async (stage: StageViewModel, thunkAPI) => {
    try {
      const response = await StageService.deleteStage(stage);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStudentStages = createAsyncThunk(
  'Stage/getStudentStages',
  async (params: StageParams, thunkAPI) => {
    try {
      const response = await StageService.getStudentStages(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const circuitSlice = createSlice({
  name: 'Stage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentStages.fulfilled, (state, action) => ({
      ...state,
      stages: action.payload.stages, isLoading: false, message: action.payload.message, 
      status: action.payload.status
    }));
    builder.addCase(getStudentStages.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getStudentStages.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false 
    }));
    builder
      .addCase(updateStage.fulfilled, (state, action) => ({
        ...state,
        stage: action.payload.stage, isLoading: false, message: action.payload.message, 
        status: action.payload.status
      }));
      builder.addCase(updateStage.pending, (state) => ({ ...state, isLoading: true }));
      builder.addCase(updateStage.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false }));
    builder
      .addCase(deleteStage.fulfilled, (state, action) => ({
        ...state,
        stage: action.payload.stage, isLoading: false, message: action.payload.message, 
        status: action.payload.status
      }));
      builder.addCase(deleteStage.pending, (state) => ({ ...state, isLoading: true }));
      builder.addCase(deleteStage.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false }));
    builder
      .addCase(getStages.fulfilled, (state, action) => ({
        ...state,
        stages: action.payload.stages, isLoading: false, message: 
        action.payload.message, status: action.payload.status,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getStages.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getStages.rejected, (state, action:PayloadAction<any>) => ({ 
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false }));

    builder
      .addCase(addStage.fulfilled, (state, action) => ({
        ...state,
        Stage: action.payload.stage, isLoading: false, message: action.payload.message, 
        status: action.payload.status
      }));
    builder
      .addCase(addStage.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addStage.rejected, (state, action:PayloadAction<any>) => ({
         ...state, message: action.payload.message, status: 
         action.payload.status, isLoading: false }));
  },
});

export default circuitSlice.reducer;
