import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  async (region: any, thunkAPI) => {
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
    async (params: any, thunkAPI) => {
      try {
        const response = await RegionService.getRegions(params);
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  );

  export const deleteRegion = createAsyncThunk(
    'region/deleteRegion',
    async (region: Region, thunkAPI) => {
      try {
        const response = RegionService.deleteRegion(region);
        return (await response).data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  )

  export const updateRegion = createAsyncThunk(
    'region/updateRegion',
    async (region: any, thunkAPI) => {
      try {
        const response = RegionService.updateRegion(region);
        return (await response).data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  )

export const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteRegion.fulfilled, (state, action) => ({
      ...state,
      region: action.payload, isLoading: false
    }));
    builder.addCase(deleteRegion.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(deleteRegion.rejected, (state, action:PayloadAction<any>) => ({ 
      ...state, message: action.payload.message, 
      isLoading: false 
    }));  
    builder.addCase(updateRegion.fulfilled, (state, action) => ({
      ...state,
      region: action.payload, isLoading: false
    }));

    builder.addCase(updateRegion.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateRegion.rejected, (state, action:PayloadAction<any>) => ({ 
      ...state, message: action.payload.message, 
      isLoading: false }));

    builder
      .addCase(getRegions.fulfilled, (state, action) => ({
        ...state,
        regions: action.payload.regions, isLoading: false,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getRegions.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getRegions.rejected, (state, action:PayloadAction<any>) => ({ 
        ...state, message: action.payload.message, 
        isLoading: false }));
   
    builder
      .addCase(addRegion.fulfilled, (state, action) => ({
        ...state,
        region: action.payload, isLoading: false
      }));
    builder
      .addCase(addRegion.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addRegion.rejected, (state, action:PayloadAction<any>) => ({ 
        ...state, message: action.payload.message, isLoading: false }));   
  },
});

export default regionSlice.reducer;
