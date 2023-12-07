import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AcademicTerm, AcademicYear, CalendarState } from '../../models/calendar';
import CalendarService from '../../services/calendarService';

const initialState: CalendarState = {
  academic_years: [],
  academic_terms: [],
  status: '',
  message: '',
  academic_term: {
    id: 0,
    term_name: '',
    branch_name: '',
    school_name: '',
    start_date: '',
    end_date: '',
    academic_year: '',
    start_year: 0,
    end_year: 0,
  },
  academic_year: {
    id: 0,
    branch_name: '',
    school_name: '',
    start_date: '',
    end_date: '',
    academic_year: '',
    start_year: 0,
    end_year: 0,
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addAcademicYear = createAsyncThunk(
  'calendar/addAcademicYear',
  async (calendar: AcademicYear, thunkAPI) => {
    try {
      const response = await CalendarService.addAcademicYear(calendar);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addAcademicTerm = createAsyncThunk(
  'calendar/addAcademicTerm',
  async (term: AcademicTerm, thunkAPI) => {
    try {
      const response = await CalendarService.addAcademicTerm(term);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAcademicYears = createAsyncThunk(
  'calendar/getAcademicYears',
  async (params: any, thunkAPI) => {
    try {
      const response = await CalendarService.getAcademicYears(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAcademicTerms = createAsyncThunk(
  'calendar/getAcademicTerms',
  async (params: any, thunkAPI) => {
    try {
      const response = await CalendarService.getAcademicTerms(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCurrentTerm = createAsyncThunk(
  'calendar/getCurrentTerm',
  async (branchId: number, thunkAPI) => {
    try {
      const response = await CalendarService.getCurrentTerm(branchId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const calenderSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentTerm.fulfilled, (state, action) => ({
        ...state,
        academic_term: action.payload.term, isLoading: false
      }));
    builder
      .addCase(getCurrentTerm.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getCurrentTerm.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(getAcademicTerms.fulfilled, (state, action) => ({
        ...state,
        academic_terms: action.payload.terms, isLoading: false
      }));
    builder
      .addCase(getAcademicTerms.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getAcademicTerms.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(getAcademicYears.fulfilled, (state, action) => ({
        ...state,
        academic_years: action.payload.years, isLoading: false
      }));
    builder
      .addCase(getAcademicYears.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getAcademicYears.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));

    builder
      .addCase(addAcademicYear.fulfilled, (state, action) => ({
        ...state,
        calendar: action.payload, isLoading: false
      }));
    builder
      .addCase(addAcademicYear.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addAcademicYear.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(addAcademicTerm.fulfilled, (state, action) => ({
        ...state,
        term: action.payload.term, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addAcademicTerm.pending, (state) => ({ ...state, isLoading: true, message: '', status:'' }));
    builder
      .addCase(addAcademicTerm.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false, status:'error'
      }));
  },
});

export default calenderSlice.reducer;
