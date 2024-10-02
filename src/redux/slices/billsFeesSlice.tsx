import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import BillsFeesService from '../../services/billsFeesService';
import { BillsFees, BillsFeesState } from '../../models/billsFees';

const initialState:BillsFeesState = {
    fees: [],
    fee: {
      academic_term_id: 0,
      unit_cost: 0,
      quantity: 0,
      class_group_id: 0,
      item: '',
    },
    status: '',
    message: '',
    isLoading: false,
    pagination: {
      current_page: 0,
      per_page: 0,
      total_items: 0,
      total_pages: 0,
    },
};  

export const addFee = createAsyncThunk(
  'fee/addFee',
  async (fee: BillsFees, { rejectWithValue }) => {
    try {
      const { data } = await BillsFeesService.addFee(fee);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getFees = createAsyncThunk(
  'fee/getFees',
  async (params: any, { rejectWithValue }) => {
    try {
      const { data } = await BillsFeesService.getFees(params);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const billsFeesSlice = createSlice({
    name: 'assessment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFee.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          status: 'loading',
        };
      })
      .addCase(addFee.fulfilled, (state, action: any) => {
        return {
          ...state,
          fee: action.payload.fee,
          isLoading: false,
          message: action.payload.message,
          status: 'succeeded',
        };
      })
      .addCase(addFee.rejected, (state, action: any) => {
        return {
          ...state,
          isLoading: false,
          message: action.payload.message || 'Failed to add fee',
          status: 'failed',
        };
      });
    builder.addCase(getFees.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        status: 'loading',
      };
    }
    ).addCase(getFees.fulfilled, (state, action: any) => {
      return {
        ...state,
        fees: action.payload.fees,
        isLoading: false,
        message: action.payload.message,
        status: 'succeeded',
        }});

  }
});
export default billsFeesSlice.reducer;