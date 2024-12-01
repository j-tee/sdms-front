
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PaymentService from '../../services/paymentService';
import { PaymentState } from '../../models/payment';

const initialState: PaymentState = {
    payments: [],
    amt_due: 0,
    total_payments: 0,
    outstanding_balance: 0,
    payment: {
        id: 0,
        student_id: 0,
        amount_paid: 0,
        payment_date: '',
        academic_term_id: 0,
        class_group_id: 0,
    },
    paymentSummary:{
        total_payment: 0,
        amount_due: 0,
        total_fees: 0,
        total_expected_inflows: 0,
        outstanding_balance: 0
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
export const addPayment = createAsyncThunk(
    'payment/addPayment',
    async (payment: any, { rejectWithValue }) => {
        try {
            const { data } = await PaymentService.addPayment(payment);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getPayments = createAsyncThunk(
    'payment/getPayments',
    async (params: any, { rejectWithValue }) => {
        try {
            const { data } = await PaymentService.getPayments(params);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deletePayment = createAsyncThunk(
    'payment/deletePayment',
    async (paymentId: number, { rejectWithValue }) => {
        try {
            const { data } = await PaymentService.deletePayment(paymentId);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePayment = createAsyncThunk(
    'payment/updatePayment',
    async (payment: any, { rejectWithValue }) => {
        try {
            const { data } = await PaymentService.updatePayment(payment, payment.id);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getPaymentSummary = createAsyncThunk(
    'payment/getPaymentSummary',
    async (params: any, { rejectWithValue }) => {
        try {
            const { data } = await PaymentService.getPaymentSummary(params);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPayment.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    status: 'loading',
                };
            })
            .addCase(addPayment.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    payment: action.payload.payment,
                    isLoading: false,
                    status: 'success',
                    message: action.payload.message,
                };
            })
            .addCase(addPayment.rejected, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    isLoading: false,
                    status: 'failed',
                    message: action.payload.message,
                };
            })
            .addCase(getPayments.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    status: 'loading',
                };
            })
            .addCase(getPayments.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    isLoading: false,
                    status: 'success',
                    payments: action.payload.payments,
                    outstanding_balance: action.payload.outstanding_balance,
                    total_payments: action.payload.total_payments,
                    amt_due: action.payload.amt_due,
                    pagination: action.payload.pagination,
                };
            })
            .addCase(getPayments.rejected, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    isLoading: false,
                    status: 'failed',
                    message: action.payload.message,
                };
            })
            .addCase(deletePayment.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    status: 'loading',
                };
            })
            .addCase(deletePayment.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    isLoading: false,
                    status: 'success',
                    message: action.payload.message,
                };
            })
            .addCase(deletePayment.rejected, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    isLoading: false,
                    status: 'failed',
                    message: action.payload.message,
                };
            })
            .addCase(updatePayment.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    status: 'loading',
                };
            })
            .addCase(updatePayment.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    isLoading: false,
                    payment: action.payload.payment,
                    status: 'success',
                    message: action.payload.message,
                };
            })
            .addCase(updatePayment.rejected, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    isLoading: false,
                    status: 'failed',
                    message: action.payload.message,
                };
            }).addCase(getPaymentSummary.pending, (state) => {
                return {
                    ...state,
                    isLoading: true,
                    status: 'loading',
                };
            }).addCase(getPaymentSummary.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    isLoading: false,
                    status: 'success',
                    paymentSummary: action.payload.summary,
                };
            }
            ).addCase(getPaymentSummary.rejected, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    isLoading: false,
                    status: 'failed',
                    message: action.payload.message,
                };
            });
    }
});

export default paymentSlice.reducer;