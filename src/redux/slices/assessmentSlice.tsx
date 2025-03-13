import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { QueryParams } from '../../models/queryParams';
import { Assessment, AssessmentState } from '../../models/assessment';
import AssessmentService from '../../services/assessmentService';
const initialState: AssessmentState = {
  assessments: [],
  assessment: {
    academic_term_name: '',
    id: 0,
    assessment_name: '',
    base_mark: 0,
    pass_mark: 0,
    class_group_name: '',
    program_name: '',
    subject_name: '',
    assessment_category: '',
    class_group_id: 0,
    program_subject_id: 0,
    assessment_type_id: 0,
    category: '',
    assessment_date: ''
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
  staff_assessment_summary: []
};

export const addAssessment = createAsyncThunk(
  'assessment/addAssessment',
  async (assessment: Assessment, thunkAPI) => {
    try {
      const response = await AssessmentService.addAssessment(assessment);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAssessments = createAsyncThunk(
  'assessment/getAssessments',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await AssessmentService.getAssessments(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateAssessment = createAsyncThunk(
  'assessment/updateAssessment',
  async (assessment: Assessment, thunkAPI) => {
    try {
      const response = await AssessmentService.updateAssessment(assessment);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteAssessment = createAsyncThunk(
  'assessment/deleteAssessment',
  async (assessment_id: number, thunkAPI) => {
    try {
      const response = await AssessmentService.deleteAssessment(assessment_id!);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStaffAssessmentSummary = createAsyncThunk(
  'assessment/getStaffAssessmentSummary',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await AssessmentService.getStaffAssessmentSummary(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getNotConductedAssessments = createAsyncThunk(
  'assessment/getNotConductedAssessments',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await AssessmentService.getNotConductedAssessments(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotConductedAssessments.pending, (state) => ({
      ...state,
      isLoading: true,
    }));

    builder.addCase(getNotConductedAssessments.fulfilled, (state, action: any) => ({
      ...state,
      assessments: action.payload.not_conducted_assessments,
      isLoading: false,
      message: action.payload.message,
      status: action.payload.status,
      pagination: action.payload.pagination
    }));

    builder.addCase(getNotConductedAssessments.rejected, (state, action: any) => ({
      ...state,
      message: action.payload.message,
      status: action.payload.status,
      isLoading: false,
    }));
    builder.addCase(getStaffAssessmentSummary.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getStaffAssessmentSummary.fulfilled, (state, action: any) => ({
      ...state,
      staff_assessment_summary: action.payload.staff_assessment_summary,
      isLoading: false,
      message: action.payload.message,
      status: action.payload.status,
    }));
    builder.addCase(addAssessment.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(addAssessment.fulfilled, (state, action: any) => ({
      ...state,
      assessment: action.payload.assessment,
      isLoading: false,
      message: action.payload.message,
      status: action.payload.status,
    }));
    builder.addCase(addAssessment.rejected, (state, action: any) => ({
      ...state,
      message: action.payload.message,
      status: action.payload.status,
      isLoading: false,
    }));
    builder.addCase(getAssessments.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getAssessments.fulfilled, (state, action: any) => ({
      ...state,
      assessments: action.payload.assessments,
      isLoading: false,
      message: action.payload.message,
      status: action.payload.status,
      pagination: action.payload.pagination
    }));
    builder.addCase(getAssessments.rejected, (state, action: any) => ({
      ...state,
      message: action.payload.message,
      status: action.payload.status,
      isLoading: false,
    }));
    builder.addCase(updateAssessment.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(updateAssessment.fulfilled, (state, action: any) => ({
      ...state,
      assessment: action.payload.assessment,
      isLoading: false,
      message: action.payload.message,
      status: action.payload.status,
    }));
    builder.addCase(updateAssessment.rejected, (state, action: any) => ({
      ...state,
      message: action.payload.message,
      status: action.payload.status,
      isLoading: false,
    }));
    builder.addCase(deleteAssessment.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(deleteAssessment.fulfilled, (state, action: any) => ({
      ...state,
      assessment: action.payload.assessment,
      isLoading: false,
      message: action.payload.message,
      status: action.payload.status,
    }));
    builder.addCase(deleteAssessment.rejected, (state, action: any) => ({
      ...state,
      message: action.payload.message,
      status: action.payload.status,
      isLoading: false,
    }));
  }})

  export default assessmentSlice.reducer;