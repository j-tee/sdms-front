import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Region, RegionState } from '../../models/region';
import RegionService from '../../services/regionService';


const initialState:RegionState = {
 regions:[],
 message: '',
 region:{
    id:0,
    name:''
 },
 isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addRegion = createAsyncThunk(
  'region/addRegion',
  async (region: Region, thunkAPI) => {
    try {
      const response = RegionService.addRegion(region);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getRegions = createAsyncThunk(
    'region/getRegions',
    async (params, thunkAPI) => {
      try {
        const response = RegionService.getRegions(params);
        return (await response).data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  );

export const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRegions.fulfilled, (state, action) => ({
        ...state,
        regions: action.payload, isLoading: false
      }));
    builder
      .addCase(getRegions.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getRegions.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
   
    builder
      .addCase(addRegion.fulfilled, (state, action) => ({
        ...state,
        region: action.payload, isLoading: false
      }));
    builder
      .addCase(addRegion.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addRegion.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
   
  },
});

export default regionSlice.reducer;
