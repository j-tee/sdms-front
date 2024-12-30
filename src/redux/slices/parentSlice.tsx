import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Parent, ParentParams, ParentState } from '../../models/parent';
import ParentService from '../../services/parentService';
import { QueryParams } from '../../models/queryParams';

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
  myWards: []
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

export const getMyWards = createAsyncThunk(
  'parent/getMyWards',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await ParentService.getMyWards(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateParent = createAsyncThunk(
  'parent/updateParent',
  async (parent: Parent, thunkAPI) => {
    try {
      const response = await ParentService.updateParent(parent, parent.id!);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const programSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateParent.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        parent: action.payload.parent, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder.addCase(updateParent.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(updateParent.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(getMyWards.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        myWards: action.payload.my_wards, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder.addCase(getMyWards.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getMyWards.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(getParents.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        parents: action.payload.parents, isLoading: false, message: action.payload.message,
        status: action.payload.status,
        pagination: action.payload.pagination
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
        parent: action.payload.parent, 
        myWards: action.payload.my_wards,
        isLoading: false, message: action.payload.message, 
        status: action.payload.status
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
