import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import DistrictService from '../../services/districtService';
import { District, DistrictState } from '../../models/district';
import { Region } from '../../models/region';


const initialState: DistrictState = {
  districts: [],
  message: '',
  district: {
    id: 0,
    name: '',
    region_id: 0,
    region_name: '',
    circuits: []
  },
  isLoading: false,
  pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
};

export const addDistrict = createAsyncThunk(
  'district/addDistrict',
  async (district: District, thunkAPI) => {
    try {
      const response = await DistrictService.addDistrict(district);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getDistricts = createAsyncThunk(
  'district/getDistricts',
  async (params: any, thunkAPI) => {
    try {
      const response = await DistrictService.getDistricts(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteDistrict = createAsyncThunk(
  'district/deleteDistrict',
  async (district: District, thunkAPI) => {
    try {
      const response = await DistrictService.deleteDistrict(district);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const updateDistrict = createAsyncThunk(
  'district/updateDistrict',
  async (district: District, thunkAPI) => {
    try {
      const response = await DistrictService.updateDistrict(district);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)
export const districtSlice = createSlice({
  name: 'district',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDistrict.fulfilled, (state, action) => ({
        ...state,
        district: action.payload.district, isLoading: false, message: action.payload.message,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(updateDistrict.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateDistrict.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));
    builder.addCase(deleteDistrict.fulfilled, (state, action) => ({
      ...state,
      district: action.payload.district, isLoading: false
    }));
    builder.addCase(deleteDistrict.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(deleteDistrict.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));
    builder
      .addCase(getDistricts.fulfilled, (state, action) => ({
        ...state,
        districts: action.payload.districts, isLoading: false, message: action.payload.message,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getDistricts.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getDistricts.rejected, (state, action: PayloadAction<any>) => ({ 
        ...state, 
        message: action.payload.message, isLoading: false }));

    builder
      .addCase(addDistrict.fulfilled, (state, action) => ({
        ...state,
        district: action.payload.district, isLoading: false,
        message: action.payload.message
      }));
    builder
      .addCase(addDistrict.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addDistrict.rejected, (state, action:PayloadAction<any>) => ({ 
        ...state, message:action.payload.message , isLoading: false }));
  },
});

export default districtSlice.reducer;
