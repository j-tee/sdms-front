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
    student_id: 0,
    score: 0,
    assessment_id: 0,
    student_name: '',
    assessment_name: '',
    category: '',
    student_score: '',
    percentage_score: 0,
    class_group_name: ''
  },
  message: '',
  status: '',
  student_reports: []
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

export const scoreSheetSlice = createSlice({
  name: 'scoreSheet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
        ...state, message: action.payload.message, status:
          action.payload.status, isLoading: false
      })).addCase(getTerminalReport.fulfilled, (state, action) => ({
        ...state,
        student_reports: action.payload.final_report, isLoading: false, 
        message: action.payload.message,
        status: action.payload.status
      }));
  },
});

export default scoreSheetSlice.reducer;
