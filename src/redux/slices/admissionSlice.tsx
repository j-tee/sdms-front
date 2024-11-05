import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Admission, AdmissionParams, AdmissionState } from '../../models/admission';
import AdmissionService from '../../services/admissionService';

const initialState: AdmissionState = {
  admissions: [],
  vacancies:{
    admitted:0,
    places:0,
    registered:0,
    capacity:0,
    vacancy_percentage:0,
    reported:0,
    reported_percentage:0
  },
  status: '',
  message: '',
  admission: {
    id: 0,
    department_id: 0,
    dept_name: '',
    academic_term_id:0,
    student_id:0,
    admission_date:'',
    stage_id:0,
    program_id:0,
    category:'',
    student_name:'',
    admission_stage:'',
    admission_program:'',
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addAdmission = createAsyncThunk(
  'admission/addAdmission',
  async (admission: Admission, thunkAPI) => {
    try {
      const response = await AdmissionService.addAdmission(admission);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const getAdmissions = createAsyncThunk(
  'admission/getAdmissions',
  async (params: AdmissionParams, thunkAPI) => {
    try {
      const response = await AdmissionService.getAdmissions(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getVacancies = createAsyncThunk(
    'admission/getVacancies',
    async (params: AdmissionParams, thunkAPI) => {
      try {
        const response = await AdmissionService.getVacancies(params);
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  );

export  const updateAdmission = createAsyncThunk(
  'admission/updateAdmission',
  async (admission: Admission, thunkAPI) => {
    try {
      const response = await AdmissionService.updateAdmission(admission, admission.id!);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteAdmission = createAsyncThunk(
  'admission/deleteAdmission',
  async (admission: Admission, thunkAPI) => {
    try {
      const response = await AdmissionService.deleteAdmission(admission, admission.id!);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const admissionSlice = createSlice({
  name: 'admission',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAdmission.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        admission: action.payload.admission, isLoading: false, message: action.payload.message, 
        status: action.payload.status
      }));
      builder.addCase(deleteAdmission.pending, (state) => ({ ...state, isLoading: true }));
      builder.addCase(deleteAdmission.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(updateAdmission.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        admission: action.payload.admission, isLoading: false, message: action.payload.message, 
        status: action.payload.status
      }));

      builder.addCase(updateAdmission.pending, (state) => ({ ...state, isLoading: true }));
      builder.addCase(updateAdmission.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(getVacancies.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        vacancies: action.payload.vacancies, isLoading: false, message: action.payload.message, 
        status: action.payload.status
      }));
    builder
      .addCase(getVacancies.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getVacancies.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(getAdmissions.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        admissions: action.payload.admissions, isLoading: false, message: action.payload.message, 
        status: action.payload.status,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getAdmissions.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getAdmissions.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addAdmission.fulfilled, (state, action:PayloadAction<any>) => ({
        ...state,
        admission: action.payload.admission, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addAdmission.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addAdmission.rejected, (state, action:PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
  },
});

export default admissionSlice.reducer;
