import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Subscription, SubscriptionState } from '../../models/subscription';
import SubscriptionService from '../../services/subscriptionService';
import { QueryParams } from '../../models/queryParams';

const initialState: SubscriptionState = {
  subscriptions: [],
  api_key: '',
  ref_id: '',
  valid: false,
  subscription: {
    id: 0,
    student_id: 0,
    transaction_id: '',
    subscription_fee_id: 0,
    subscription_date: '',
    ref_id: '',
    duration: 0,
    student_name: '',
    fee_name: 0,
    taxes: 0,
    exp_date: '',
    valid_subscription: false,
    status: '',
    parents_info: '',
    fee: 0,
    amt_due: 0
  },
  status: '',
  message: '',
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
  momo_token: {
    access_token: ''
  }
};

export const initializeTransaction = createAsyncThunk(
  'subscription/initializeTransaction',
  async (params: any, thunkAPI) => {
    try {
      const response = await SubscriptionService.initializeTransaction(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addSubscription = createAsyncThunk(
  'subscription/addSubscription',
  async (subscription: Subscription, thunkAPI) => {
    try {
      const response = await SubscriptionService.addSubscription(subscription);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getSubscriptions = createAsyncThunk(
  'subscription/getSubscriptions',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await SubscriptionService.getSubscriptions(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getMomoApiKey = createAsyncThunk(
  'subscription/getMomoApiKey',
  async (_, thunkAPI) => {
    try {
      const response = await SubscriptionService.getMomoApiKey();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getMomoToken = createAsyncThunk(
  'subscription/getMomoToken',
  async (_, thunkAPI) => {
    try {
      const response = await SubscriptionService.getMomoToken();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const requestToPay = createAsyncThunk(
  'subscription/requestToPay',
  async (params: any, thunkAPI) => {
    try {
      const response = await SubscriptionService.requestToPay(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStudentRecentSubscription = createAsyncThunk(
  'subscription/getStudentRecentSubscription',
  async (params: QueryParams, thunkAPI) => {
    try {
      const response = await SubscriptionService.getStudentRecentSubscription(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeTransaction.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        subscription: action.payload.response, isLoading: false, message: action.payload.message,
        status: action.payload.status,
      }));
    builder.addCase(initializeTransaction.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(initializeTransaction.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(requestToPay.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        subscription: action.payload.subscription,
        isLoading: false, message: action.payload.message,
        status: action.payload.status,
      }));
    builder.addCase(requestToPay.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(requestToPay.rejected, (state, action: PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder
      .addCase(getMomoToken.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        momo_token: action.payload.momo_token, isLoading: false, message: action.payload.message,
        status: action.payload.status,
      }));
      builder
      .addCase(getMomoToken.pending, (state) => ({ ...state, isLoading: true }));
      builder.addCase(getMomoToken.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
    .addCase(getMomoApiKey.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      api_key: action.payload.api_key, isLoading: false, message: action.payload.message,
      ref_id: action.payload.ref_id,
      status: action.payload.status,
    }));
    builder
      .addCase(getMomoApiKey.pending, (state) => ({ ...state, isLoading: true }));  
      builder.addCase(getMomoApiKey.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(getSubscriptions.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        subscriptions: action.payload.subscriptions, isLoading: false, message: action.payload.message,
        status: action.payload.status,
        pagination: action.payload.pagination
      }));
    builder
      .addCase(getSubscriptions.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getSubscriptions.rejected, (state, action: PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addSubscription.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        subscription: action.payload.subscription, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addSubscription.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addSubscription.rejected, (state, action: PayloadAction<any>) => ({
        ...state, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder.addCase(getStudentRecentSubscription.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      subscription: action.payload.subscription, isLoading: false, message: action.payload.message,
      status: action.payload.status,
      valid: action.payload.valid
    }));
  },
});

export default subscriptionSlice.reducer;
