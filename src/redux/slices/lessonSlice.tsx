import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Lesson, LessonParams, LessonState } from '../../models/Lesson';
import LessonService from '../../services/lessonService';

const initialState: LessonState = {
    lessons: [],
    lesson: {
        id: 0,
        class_group_id: 0,
        staff_id: 0,
        program_subject_id: 0,
        day_of_week: '',
        start_time: '',
        end_time: '',
        class_group_name: '',
        staff_name: '',
        subject_name: '',
        program_name: '',
        stage_name: '',
        term_name: '',
        dept_name: '',
    },
    status: '',
    message: '',
    isLoading: false,
    paginate: false,
    pagination: {
        current_page: 0,
        per_page: 0,
        total_items: 0,
        total_pages: 0
    },
};

export const updateLesson = createAsyncThunk(
  'lesson/updateLesson',
  async (lesson: Lesson, thunkAPI) => {
    try {
      const response = await LessonService.updateLesson(lesson, lesson.id || 0);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addLesson = createAsyncThunk(
  'lesson/addLesson',
  async (lesson: Lesson, thunkAPI) => {
    try {
      const response = await LessonService.addLesson(lesson);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getLessons = createAsyncThunk(
  'lesson/getLessons',
  async (params: LessonParams, thunkAPI) => {
    try {
      const response = await LessonService.getLessons(params);
      console.log('response.data ========> lessond',response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(updateLesson.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      lesson: action.payload.lesson, isLoading: false, message: action.payload.message, status: action.payload.status
    }));
    builder
      .addCase(getLessons.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        lessons: action.payload.lessons, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder
      .addCase(getLessons.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getLessons.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addLesson.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        lesson: action.payload.lesson, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addLesson.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addLesson.rejected, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
  },
});

export default lessonSlice.reducer;
