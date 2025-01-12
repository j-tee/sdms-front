import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SubscriptionFee, SubscriptionFeeState } from '../../models/subscriptionFee';
import SubscriptionFeeService from '../../services/subscriptionFeeService';

const initialState: SubscriptionFeeState = {
    isLoading: false,
    pagination: {
        current_page: 1,
        per_page: 10,
        total_items: 0,
        total_pages: 0
    },
    subscriptionFees: [],
    subscriptionFee: {
      amount: 0,
      duration: 0
    },
    message: ''
};

export const addSubscriptionFee = createAsyncThunk(
  'subscriptionFee/addSubscriptionFee',
  async (subscriptionFee: SubscriptionFee, thunkAPI) => {
    try {
      const response = await SubscriptionFeeService.addSubscriptionFee(subscriptionFee);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getSubscriptionFees = createAsyncThunk(
  'subscriptionFee/getSubscriptionFees',
  async (_, thunkAPI) => {
    try {
      const response = await SubscriptionFeeService.getSubscriptionFees();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const subscriptionFeeSlice = createSlice({
  name: 'subscriptionFee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder
      .addCase(getSubscriptionFees.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        subscriptionFees: action.payload.subscription_fees, isLoading: false, std_message: action.payload.message,
        std_status: action.payload.status
      }));
    builder
      .addCase(getSubscriptionFees.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getSubscriptionFees.rejected, (state, action: PayloadAction<any>) => ({
        ...state, std_message: action.payload.message, std_status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addSubscriptionFee.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        subscriptionFee: action.payload.subscriptionFee, isLoading: false, std_message: action.payload.message, std_status: action.payload.status
      }));
    builder
      .addCase(addSubscriptionFee.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addSubscriptionFee.rejected, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, std_message: action.payload.message, std_status: action.payload.status
      }));
  },
});

export default subscriptionFeeSlice.reducer;
