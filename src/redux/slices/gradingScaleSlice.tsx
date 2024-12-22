import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GradingScaleState } from "../../models/gradingScale";
import GradingScaleService from "../../services/gradingScaleService";

const initialState: GradingScaleState = {
  gradingScales: [],
  gradingScale: {
    id: 0,
    branch_id: 0,
    grade: "",
    lower_limit: 0,
    upper_limit: 0,
    remarks: "",
  },
  message: "",
  status: "",
  isLoading: false,
  pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0,
  },
};

export const addGradingScale = createAsyncThunk(
  "gradingScale/addGradingScale",
  async (gradingScale: any, thunkAPI) => {
    try {
      const response = await GradingScaleService.addGradingScale(gradingScale);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getGradingScales = createAsyncThunk(
  "gradingScale/getGradingScales",
  async (params: any, thunkAPI) => {
    try {
      const response = await GradingScaleService.getGradingScales(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteGradingScale = createAsyncThunk(
  "gradingScale/deleteGradingScale",
  async (gradingScale: any, thunkAPI) => {
    try {
      const response = await GradingScaleService.deleteGradingScale(
        gradingScale
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateGradingScale = createAsyncThunk(
  "gradingScale/updateGradingScale",
  async (gradingScale: any, thunkAPI) => {
    try {
      const response = await GradingScaleService.updateGradingScale(
        gradingScale
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getGradingScale = createAsyncThunk(
  "gradingScale/getGradingScale",
  async (id: number, thunkAPI) => {
    try {
      const response = await GradingScaleService.getGradingScale(id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const gradingScaleSlice = createSlice({
  name: "gradingScale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addGradingScale.pending, (state) => ({
      ...state,
      isLoading: true,
      status: "loading",
    }));
    builder.addCase(addGradingScale.fulfilled, (state, action) => ({
      ...state,
      gradingScales: [...state.gradingScales, action.payload],
      isLoading: false,
      status: "success",
      message: "Grading Scale added successfully",
    }));
    builder.addCase(
      addGradingScale.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        isLoading: false,
        status: "failed",
        message: action.payload.message,
      })
    );

    builder.addCase(getGradingScales.pending, (state) => ({
      ...state,
      isLoading: true,
      status: "loading",
    }));
    builder.addCase(getGradingScales.fulfilled, (state, action) => ({
      ...state,
      gradingScales: action.payload.grading_scales,
      isLoading: false,
      status: "success",
      pagination: {
        current_page: action.payload.current_page,
        per_page: action.payload.per_page,
        total_items: action.payload.total_items,
        total_pages: action.payload.total_pages,
      },
    }));

    builder.addCase(
      getGradingScales.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        isLoading: false,
        status: "failed",
        message: action.payload.message,
      })
    );

    builder.addCase(deleteGradingScale.pending, (state) => ({
      ...state,
      isLoading: true,
      status: "loading",
    }));

    builder.addCase(deleteGradingScale.fulfilled, (state, action) => ({
      ...state,
      gradingScales: state.gradingScales.filter(
        (gradingScale) => gradingScale.id !== action.payload.id
      ),
      isLoading: false,
      status: "success",
      message: action.payload.message,
    }));

    builder.addCase(
      deleteGradingScale.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        isLoading: false,
        status: "failed",
        message: action.payload.message,
      })
    );

    builder.addCase(updateGradingScale.pending, (state) => ({
      ...state,
      isLoading: true,
      status: "loading",
    }));

    builder.addCase(updateGradingScale.fulfilled, (state, action) => ({
      ...state,
      gradingScales: state.gradingScales.map((gradingScale) =>
        gradingScale.id === action.payload.id ? action.payload : gradingScale
      ),
      isLoading: false,
      status: "success",
      message: action.payload.message,
    }));
    builder.addCase(
      updateGradingScale.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        isLoading: false,
        status: "failed",
        message: action.payload.message,
      })
    );
    builder.addCase(getGradingScale.pending, (state) => ({
      ...state,
      isLoading: true,
      status: "loading",
    }));
    builder.addCase(getGradingScale.fulfilled, (state, action) => ({
      ...state,
      gradingScale: action.payload,
      isLoading: false,
      status: "success",
    }));
    builder.addCase(
      getGradingScale.rejected,
      (state, action: PayloadAction<any>) => ({
        ...state,
        isLoading: false,
        status: "failed",
        message: action.payload.message,
      })
    );
  },
});

export default gradingScaleSlice.reducer;
