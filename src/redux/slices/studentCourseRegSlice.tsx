import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StudentOptionalCourse } from "../../models/optionalCourseRegistration";
import StudentCourseRegService from "../../services/studentCourseRegService";

export const registerOptionalCourses = createAsyncThunk(
    'courseReg/registerOptionalCourses',
    async (params: StudentOptionalCourse[], thunkAPI) => {
      try {
        const response = await StudentCourseRegService.registerOptionalCourses(params);
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  );

  export const studentCourseRegSlice = createSlice({
    name: 'courseReg',
    initialState: {
      status: '',
      message: '',
      isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(registerOptionalCourses.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(registerOptionalCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'success';
        state.message = action.payload.message;
      });
      builder.addCase(registerOptionalCourses.rejected, (state, action:PayloadAction<any>) => {
        state.isLoading = false;
        state.status = 'error';
        state.message = action.payload.message;
      });
    },
  });   
  export default studentCourseRegSlice.reducer;
    