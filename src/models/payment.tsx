import { PaginationParams } from "./pagination";

export interface Payment {
    id?: number;
    student_id: number;
    amount_paid: number;
    payment_date: string;
    academic_term_id: number;
    class_group_id: number;
}

export interface PaymentSummary {
    total_payment: number;
    amount_due: number;
    total_fees: number;
    total_expected_inflows: number;
    outstanding_balance: number;
}

export interface PaymentViewModel {
    id: number;
    student_id: string;
    full_name: string;
    amount_paid: number;
    amt_due: number;
    total_payments: number;
    outstanding_balance: number;
    payment_date: string;
    academic_term_id: number;
    academic_year_id: number;
    academic_year_name: string;
    class_group_id: number;
    term_name: string;
    class_grp_name: string;
}

export interface PaymentState {
    amt_due: number;
    total_payments: number;
    outstanding_balance: number;
    payments: PaymentViewModel[];
    paymentSummary: PaymentSummary;
    payment: Payment;
    status: string;
    message: string;
    isLoading: boolean;
    pagination: PaginationParams
}