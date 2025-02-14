import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ScoreSheet, ScoreSheetState } from '../../models/scoreSheet';
import { QueryParams } from '../../models/queryParams';
import ScoreSheetService from '../../services/scoreSheetService';

const initialState: ScoreSheetState = {
  isLoading: false,  
  pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
  score_sheets: [],
  score_sheet: {
    id: 0,
    base_mark: 0,
    pass_mark: 0,
    student_id: 0,
    subject_name: '',
    score: 0,
    assessment_id: 0,
    student_name: '',
    assessment_name: '',
    category: '',
    student_score: '',
    percentage_score: 0,
    class_group_name: '',
    remarks: '',
    assessment_date: ''
  },
  message: '',
  status: '',
  student_reports: [],
  student_subject_averages: {
    labels: [],
    datasets: []
  }
};

export const addScoreSheet = createAsyncThunk(
  'scoreSheet/addScoreSheet',
  async (scoreSheet: any, thunkAPI) => {
    try {
      const response = await ScoreSheetService.addScoreSheet(scoreSheet);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getScoreSheets = createAsyncThunk(
  'ScoreSheet/getScoreSheets',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await ScoreSheetService.getScoreSheets(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteScoreSheet = createAsyncThunk(
  'scoreSheet/deleteScoreSheet',
  async (scoreSheet: ScoreSheet, thunkAPI) => {
    try {
      const response = await ScoreSheetService.deleteScoreSheet(scoreSheet);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateScoreSheet = createAsyncThunk(
  'scoreSheet/updateScoreSheet',
  async (scoreSheet: ScoreSheet, thunkAPI) => {
    try {
      const response = await ScoreSheetService.updateScoreSheet(scoreSheet);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getTerminalReport = createAsyncThunk(
  'scoreSheet/getTerminalReport',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await ScoreSheetService.getTerminalReport(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStudentTerminalReport = createAsyncThunk(
  'scoreSheet/getStudentTerminalReport',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await ScoreSheetService.getStudentTerminalReport(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },  
)

export const getStudentScoreSheets = createAsyncThunk(
  'scoreSheet/getStudentScoreSheets',
  async (params: any, thunkAPI) => {
    try {
      const response = await ScoreSheetService.getStudentScoreSheets(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const getStudentSubjectAverages = createAsyncThunk(
  'scoreSheet/getStudentSubjectAverages',
  async (params: any, thunkAPI) => {
    try {
      const response = await ScoreSheetService.getStudentSubjectAverages(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)
export const scoreSheetSlice = createSlice({
  name: 'scoreSheet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentSubjectAverages.fulfilled, (state, action) => ({
      ...state,
      student_subject_averages: action.payload.student_subject_averages, isLoading: false, 
      message: action.payload.message,
      status: action.payload.status 
    }));
    builder.addCase(getStudentSubjectAverages.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getStudentSubjectAverages.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, 
      status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(deleteScoreSheet.fulfilled, (state, action) => ({
        ...state,
        // student_reports: action.payload.final_report, isLoading: false, 
        message: action.payload.message,
        status: action.payload.status
      }));
    builder.addCase(deleteScoreSheet.pending, (state) => ({ ...state, isLoading: true }));  
    builder.addCase(deleteScoreSheet.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status:
        action.payload.status, isLoading: false
    }));
    builder
      .addCase(updateScoreSheet.fulfilled, (state, action) => ({
        ...state,
        score_sheet: action.payload.score_sheet, isLoading: false, 
        message: action.payload.message,
        status: action.payload.status
      }));
    builder.addCase(updateScoreSheet.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateScoreSheet.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, 
      status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(getScoreSheets.fulfilled, (state, action) => ({
        ...state,
        score_sheets: action.payload.score_sheets, isLoading: false, message:
          action.payload.message,
        status: action.payload.status,
        pagination: action.payload.pagination || initialState.pagination
      }));
    builder
      .addCase(getScoreSheets.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getScoreSheets.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, 
        status: action.payload.status, isLoading: false
      }));

    builder
      .addCase(addScoreSheet.fulfilled, (state, action) => ({
        ...state,
        Score_sheet: action.payload.score_sheet, isLoading: false, 
        message: action.payload.message,
        status: action.payload.status
      }));
    builder
      .addCase(addScoreSheet.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addScoreSheet.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, 
        status: action.payload.status, isLoading: false
      }));
      builder.addCase(getTerminalReport.fulfilled, (state, action) => ({
        ...state,
        student_reports: action.payload.final_report, isLoading: false, 
        message: action.payload.message,
        status: action.payload.status
      }))
      .addCase(getTerminalReport.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getTerminalReport.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message,
        status: action.payload.status, isLoading: false
        }));
    builder.addCase(getStudentScoreSheets.pending, (state) => ({ ...state, isLoading: true }))
    .addCase(getStudentScoreSheets.fulfilled, (state, action) => ({
      ...state,
      score_sheets: action.payload.score_sheets, isLoading: false, message:
        action.payload.message,
      status: action.payload.status,
      pagination: action.payload.pagination || initialState.pagination
    })).addCase(getStudentScoreSheets.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, 
      status: action.payload.status, isLoading: false
    }));
    builder.addCase(getStudentTerminalReport.pending, (state) => ({ ...state, isLoading: true }))
    .addCase(getStudentTerminalReport.fulfilled, (state, action) => ({
      ...state,
      student_reports: action.payload.terminal_report, isLoading: false, 
      message: action.payload.message,
      status: action.payload.status
    })).addCase(getStudentTerminalReport.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message,
      status: action.payload.status, isLoading: false
    }));
  },
});

export default scoreSheetSlice.reducer;
