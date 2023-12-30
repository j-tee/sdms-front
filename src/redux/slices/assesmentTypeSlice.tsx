import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AssessmentType, AssessmentTypeState } from '../../models/assessmentTypes';
import AssessmentService from '../../services/assessmentService';
import { QueryParams } from '../../models/queryParams';
const initialState: AssessmentTypeState = {
  assessment_types: [],
  assessment_type: {
    id: 0,
    category: '',
    branch_name: '',
    school_name: '',
    percentage_score: 0,
    branch_id: 0,
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

export const addAssessmentType = createAsyncThunk(
  'assessment/addAssessmentType',
  async (assessmentType: AssessmentType, thunkAPI) => {
    try {
      const response = await AssessmentService.addAssessmentType(assessmentType);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAssessmentTypes = createAsyncThunk(
  'assessment/getAssessmentTypes',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await AssessmentService.getAssessmentTypes(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateAssessmentType = createAsyncThunk(
  'assessment/updateAssessmentType',
  async (assessmentType: AssessmentType, thunkAPI) => {
    try {
      const response = await AssessmentService.updateAssessmentType(assessmentType, assessmentType.id!);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteAssessmentType = createAsyncThunk(
  'assessment/deleteAssessmentType',
  async (assessmentType: AssessmentType, thunkAPI) => {
    try {
      const response = await AssessmentService.deleteAssessmentType(assessmentType, assessmentType.id!);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const assessmentTypeSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addAssessmentType.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(addAssessmentType.fulfilled, (state, action: any) => ({
      ...state,
      assessment_type: action.payload.assessmentType,
      isLoading: false,
      message: action.payload.message,
      status: action.payload.status,
    }));
    builder.addCase(addAssessmentType.rejected, (state, action: any) => ({
      ...state,
      message: action.payload.message,
      status: action.payload.status,
      isLoading: false,
    }));
    builder.addCase(getAssessmentTypes.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getAssessmentTypes.fulfilled, (state, action: any) => ({
      ...state,
      assessment_types: action.payload.assessment_types,
      isLoading: false,
      message: action.payload.message,
      status: action.payload.status,
      pagination: action.payload.pagination
    }));
    builder.addCase(getAssessmentTypes.rejected, (state, action: any) => ({
      ...state,
      message: action.payload.message,
      status: action.payload.status,
      isLoading: false,
    }));
    builder.addCase(updateAssessmentType.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(updateAssessmentType.fulfilled, (state, action: any) => ({
      ...state,
      assessment_type: action.payload.assessmentType,
      isLoading: false,
      message: action.payload.message,
      status: action.payload.status,
    }));
    builder.addCase(updateAssessmentType.rejected, (state, action: any) => ({
      ...state,
      message: action.payload.message,
      status: action.payload.status,
      isLoading: false,
    }));
    builder.addCase(deleteAssessmentType.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(deleteAssessmentType.fulfilled, (state, action: any) => ({
      ...state,
      assessment_type: action.payload.assessmentType,
      isLoading: false,
      message: action.payload.message,
      status: action.payload.status,
    }));
    builder.addCase(deleteAssessmentType.rejected, (state, action: any) => ({
      ...state,
      message: action.payload.message,
      status: action.payload.status,
      isLoading: false,
    }));
  }})

  export default assessmentTypeSlice.reducer;