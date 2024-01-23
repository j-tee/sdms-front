import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Tax, TaxState } from '../../models/tax';
import TaxService from '../../services/taxService';

const initialState: TaxState = {
  taxes: [],
  tax: {
    tax_name: '',
    rate: 0,
    unit: ''
  },
  status: '',
  message: '',
  isLoading: false,
  pagination: {
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 0
  },
}


export const addTax = createAsyncThunk(
  'Tax/addTax',
  async (tax: Tax, thunkAPI) => {
    try {
      const response = await TaxService.addTax(tax);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getTaxes = createAsyncThunk(
  'Tax/getTaxes',
  async (_, thunkAPI) => {
    try {
      const response = await TaxService.getTaxes();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateTax = createAsyncThunk(
  'Tax/updateTax',
  async (tax: Tax, thunkAPI) => {
    try {
      const response = await TaxService.updateTax(tax, tax.id || 0);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteTax = createAsyncThunk(
  'Tax/deleteTax',
  async (tax: Tax, thunkAPI) => {
    try {
      const response = await TaxService.deleteTax(tax);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const taxSlice = createSlice({
  name: 'Tax',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTax.fulfilled, (state, action) => ({
        ...state,
        tax: action.payload.tax, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder.addCase(updateTax.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateTax.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(deleteTax.fulfilled, (state, action) => ({
        ...state,
        tax: action.payload.tax, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder.addCase(deleteTax.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(deleteTax.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(getTaxes.fulfilled, (state, action) => ({
        ...state,
        taxes: action.payload.taxes, isLoading: false, message:
          action.payload.message, status: action.payload.status,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getTaxes.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getTaxes.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));

    builder
      .addCase(addTax.fulfilled, (state, action) => ({
        ...state,
        Tax: action.payload.tax, isLoading: false, message: action.payload.message,
        status: action.payload.status
      }));
    builder
      .addCase(addTax.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addTax.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status:
          action.payload.status, isLoading: false
      }));
  },
});

export default taxSlice.reducer;
