import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Parent, ParentParams, ParentState } from '../../models/parent';
import ParentService from '../../services/parentService';

const initialState: ParentState = {
  parents: [],
  status: '',
  message: '',
  parent: {
    id: 0,
    fathers_full_name: '',
    mothers_full_name: '',
    fathers_occupation: '',
    mothers_occupation: '',
    fathers_email_address: '',
    fathers_contact_number: '',
    mothers_email_address: '',
    mothers_contact_number: '',
    residential_address: '',
    postal_address: '',
    title: '',
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const getParentByEmail = createAsyncThunk(
  'parent/getParentByEmail',
  async (email: string, thunkAPI) => {
    try {
      const response = await ParentService.getParentByEmail(email);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addParent = createAsyncThunk(
  'parent/addParent',
  async (parent: Parent, thunkAPI) => {
    try {
      const response = await ParentService.addParent(parent);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const getParents = createAsyncThunk(
  'parent/getParents',
  async (params: ParentParams, thunkAPI) => {
    try {
      const response = await ParentService.getParents(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const programSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getParents.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        parents: action.payload.parents, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder
      .addCase(getParents.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getParents.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addParent.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        parent: action.payload.parent, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addParent.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addParent.rejected, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
      builder
      .addCase(getParentByEmail.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        parent: action.payload.parent, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(getParentByEmail.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getParentByEmail.rejected, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
  },
});

export default programSlice.reducer;
