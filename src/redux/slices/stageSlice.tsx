import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Stage, StageParams, StageState } from '../../models/stage';
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

export const circuitSlice = createSlice({
  name: 'Stage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStages.fulfilled, (state, action) => ({
        ...state,
        Stages: action.payload.stages, isLoading: false, message: 
        action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(getStages.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getStages.rejected, (state, action:PayloadAction<any>) => ({ 
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false }));

    builder
      .addCase(addStage.fulfilled, (state, action) => ({
        ...state,
        Stage: action.payload, isLoading: false, message: action.payload.message, 
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
