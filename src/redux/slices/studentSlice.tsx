import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Student, StudentParams, StudentState } from '../../models/student';
import StudentService from '../../services/studentService';

const initialState: StudentState = {
  students: [],
  countries:[],
  std_status: '',
  std_message: '',
  student: {
    id: 0,
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    other_names: '',
    nationality: '',
    student_id: '',
    parent_id:0,
    image_url: '',
    fathers_name: '',
    mothers_name: '',
    contact_number: '',
    email_address: '',
  },
  isLoading: false,
  pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
};

export const addStudent = createAsyncThunk(
  'student/addStudent',
  async (student: FormData, thunkAPI) => {
    try {
      const response = await StudentService.addStudent(student);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const getStudents = createAsyncThunk(
  'student/getStudents',
  async (params: StudentParams, thunkAPI) => {
    try {
      const response = await StudentService.getStudents(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const getStudentById = createAsyncThunk(
  'student/getStudentById',
  async (studentId: string, thunkAPI) => {
    try {
      const response = await StudentService.getStudentById(studentId);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCountries = createAsyncThunk(
  'student/getCountries',
  async (_, thunkAPI) => {
    try {
      const response = await StudentService.getCountries();
      return response
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async (student: FormData, thunkAPI) => {
    try {
      const studentId = student.get('student[id]') as string;
      const response = await StudentService.updateStudent(student, parseInt(studentId));
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(updateStudent.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      student: action.payload.student, isLoading: false, std_message: action.payload.message,
      std_status: action.payload.status
    }));
    builder
    .addCase(updateStudent.pending, (state) => ({ ...state, isLoading: true }));
    builder
    .addCase(updateStudent.rejected, (state, action: PayloadAction<any>) => ({
      ...state, std_message: action.payload.message, std_status: action.payload.status, isLoading: false
    }));
    builder
    .addCase(getCountries.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      countries: action.payload, isLoading: false, std_message: action.payload.message,
      std_status: action.payload.status
    }));
  builder
    .addCase(getCountries.pending, (state) => ({ ...state, isLoading: true }));
  builder
    .addCase(getCountries.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: 'Failed to load countries', status: 'error', isLoading: false
    }));
    builder
    .addCase(getStudentById.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      student: action.payload.student, isLoading: false, std_message: action.payload.message,
      std_status: action.payload.status
    }));
  builder
    .addCase(getStudentById.pending, (state) => ({ ...state, isLoading: true }));
  builder
    .addCase(getStudentById.rejected, (state, action: PayloadAction<any>) => ({
      ...state, std_message: action.payload.message, std_status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(getStudents.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        students: action.payload.students, isLoading: false, std_message: action.payload.message,
        pagination: action.payload.pagination,
        std_status: action.payload.status
      }));
    builder
      .addCase(getStudents.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getStudents.rejected, (state, action: PayloadAction<any>) => ({
        ...state, std_message: action.payload.message, std_status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addStudent.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        student: action.payload.student, isLoading: false, std_message: action.payload.message, std_status: action.payload.status
      }));
    builder
      .addCase(addStudent.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addStudent.rejected, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, std_message: action.payload.message, std_status: action.payload.status
      }));
  },
});

export default studentSlice.reducer;
