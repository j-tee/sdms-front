import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AcademicTerm, AcademicTermViewModel, AcademicYear, CalendarState } from '../../models/calendar';
import CalendarService from '../../services/calendarService';

const initialState: CalendarState = {
  academic_years: [],
  academic_terms: [],
  status: '',
  message: '',
  term_count:0,
  academic_term: {
    id: 0,
    term_name: '',
    branch_name: '',
    school_name: '',
    start_date: '',
    end_date: '',
    academic_year_name: '',
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

export const getCurrentAcademicYear = createAsyncThunk(
  'calendar/getCurrentAcademicYear',
  async (branchId: number, thunkAPI) => {
    try {
      const response = await CalendarService.getCurrentAcademicYear(branchId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const gettermCount = createAsyncThunk(
  'calendar/gettermCount',
  async (branchId: number, thunkAPI) => {
    try {
      const response = await CalendarService.getTermCount(branchId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateAcademicYear = createAsyncThunk(
  'calendar/updateAcademicYear',
  async (year: AcademicYear, thunkAPI) => {
    try {
      const response = await CalendarService.updateAcademicYear(year);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteAcademicYear = createAsyncThunk(
  'calendar/deleteAcademicYear',
  async (year: AcademicYear, thunkAPI) => {
    try {
      const response = await CalendarService.deleteAcaemicYear(year);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateAcademicTerm = createAsyncThunk(
  'calendar/updateAcademicTerm',
  async (term: AcademicTerm, thunkAPI) => {
    try {
      const response = await CalendarService.updateAcademicTerm(term, term.id!);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteAcademicTerm = createAsyncThunk(
  'calendar/deleteAcademicTerm',
  async (term: AcademicTermViewModel, thunkAPI) => {
    try {
      const response = await CalendarService.deleteAcademicTerm(term);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const getStudentAcademicYears = createAsyncThunk(
  'calendar/getStudentAcademicYears',
  async (params: any, thunkAPI) => {
    try {
      const response = await CalendarService.getStudentAcademicYears(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const calenderSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAcademicTerm.fulfilled, (state, action) => ({
        ...state,
        message: action.payload.message, isLoading: false, status: action.payload.status
      }));
      builder.addCase(deleteAcademicTerm.pending, (state) => ({ ...state, isLoading: true }));  
      builder.addCase(deleteAcademicTerm.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, isLoading: true, status: action.payload.status
      }));
    builder.addCase(updateAcademicTerm.fulfilled, (state, action) => ({
      ...state,
      academic_term: action.payload.term, isLoading: false, message: action.payload.message, status: action.payload.status
    }));
    builder.addCase(updateAcademicTerm.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateAcademicTerm.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: true, status: action.payload.status
    }));
    builder
      .addCase(deleteAcademicYear.fulfilled, (state, action) => ({
        ...state,
        message: action.payload.message, isLoading: false, status: action.payload.status
      }));
      builder.addCase(deleteAcademicYear.pending, (state) => ({ ...state, isLoading: true }));
      builder.addCase(deleteAcademicYear.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, isLoading: true, status: action.payload.status
      }));
    builder
      .addCase(updateAcademicYear.fulfilled, (state, action) => ({
        ...state,
        academic_year: action.payload, isLoading: false
      }));
    builder.addCase(updateAcademicYear.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateAcademicYear.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: true, status: action.payload.status
    }));
    builder
      .addCase(gettermCount.fulfilled, (state, action) => ({
        ...state,
        term_count: action.payload.term_count, isLoading: false
      }));
    builder.addCase(gettermCount.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(gettermCount.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: true, status: action.payload.status
    }));
    builder.addCase(getCurrentAcademicYear.fulfilled, (state, action) => ({
      ...state,
      academic_year: action.payload.year, isLoading: false
    }));
    builder
      .addCase(getCurrentAcademicYear.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getCurrentAcademicYear.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: true, status: action.payload.status
    }));
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
        academic_terms: action.payload.terms, isLoading: false,
        pagination: action.payload.pagination
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
        academic_years: action.payload.years, isLoading: false, pagination:action.payload.pagination
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
      .addCase(addAcademicYear.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, isLoading: false
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
    builder.addCase(getStudentAcademicYears.fulfilled, (state, action) => ({
      ...state,
      academic_years: action.payload.years, isLoading: false
    }));
    builder.addCase(getStudentAcademicYears.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getStudentAcademicYears.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: true, status: action.payload.status
    }));
  },
});

export default calenderSlice.reducer;
