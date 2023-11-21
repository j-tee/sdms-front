import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import DistrictService from '../../services/districtService';
import { DistrictState } from '../../models/district';
import { Region } from '../../models/region';


const initialState: DistrictState = {
  districts: [],
  message: '',
  district: {
    id: 0,
    name: '',
    region_id: 0,
    region: {
      id: 0,
      name: ''
    },
    circuits: []
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addDistrict = createAsyncThunk(
  'district/addDistrict',
  async (district: Region, thunkAPI) => {
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
  async (params, thunkAPI) => {
    try {
      const response = await DistrictService.getDistricts(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const districtSlice = createSlice({
  name: 'district',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDistricts.fulfilled, (state, action) => ({
        ...state,
        regions: action.payload, isLoading: false
      }));
    builder
      .addCase(getDistricts.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getDistricts.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));

    builder
      .addCase(addDistrict.fulfilled, (state, action) => ({
        ...state,
        district: action.payload, isLoading: false
      }));
    builder
      .addCase(addDistrict.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addDistrict.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));

  },
});

export default districtSlice.reducer;
