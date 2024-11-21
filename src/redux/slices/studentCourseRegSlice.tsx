import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StudentOptionalCourse } from "../../models/optionalCourseRegistration";
import StudentCourseRegService from "../../services/studentCourseRegService";

export const registerOptionalCourses = createAsyncThunk(
    'courseReg/registerOptionalCourses',
    async (params: any, thunkAPI) => {
      try {
        const response = await StudentCourseRegService.registerOptionalCourses(params);
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  );

  export const unregisterOptionalCourses = createAsyncThunk(
    'courseReg/unregisterOptionalCourses',
    async (params: any, thunkAPI) => {
      try {
        const response = await StudentCourseRegService.unregisterOptionalCourses(params);
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  )

  export const studentCourseRegSlice = createSlice({
    name: 'courseReg',
    initialState: {
      status: '',
      message: '',
      isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(unregisterOptionalCourses.pending, (state, action) => ({
        ...state,
        isLoading: true,

      }));
      builder.addCase(unregisterOptionalCourses.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        status: 'success',
        message: action.payload.message,
      }));
      builder.addCase(unregisterOptionalCourses.rejected, (state, action:PayloadAction<any>) => ({
        ...state,
        isLoading: false,
        status: 'error',
        message: action.payload.message,
      }));
      builder.addCase(registerOptionalCourses.pending, (state, action) => ({
        ...state,
        isLoading: true
      }));
      builder.addCase(registerOptionalCourses.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        status: 'success',
        message: action.payload.message,
      }));
      builder.addCase(registerOptionalCourses.rejected, (state, action:PayloadAction<any>) => ({
        ...state,
        isLoading: false,
        status: 'error',
        message: action.payload.message,
      }));
    },
  });   
  export default studentCourseRegSlice.reducer;
    