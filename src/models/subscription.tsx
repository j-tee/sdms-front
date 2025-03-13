import { PaginationParams } from "./pagination";

export interface SubscriptionState {
  subscriptions: SubscriptionViewModel[];
  subscription: SubscriptionViewModel;
  message: string;
  isLoading: boolean;
  status: string;
  api_key: string;
  ref_id: string;
  valid: boolean;
  momo_token: {access_token: string};
  pagination: PaginationParams;
}

export interface Subscription {
  status?: boolean;
  message?: string;
  authorization_url?: string;
  access_code?: string;
  reference?: string;
  id?: number;
  amount?: number;
  student_id: number;
  transaction_id: string;
  subscription_fee_id: number;
  subscription_date: string;
  ref_id: string;
  duration: number;
}

export interface SubscriptionViewModel {
  id?: number;
  student_id: number;
  transaction_id: string;
  subscription_fee_id: number;
  subscription_date: string;
  ref_id: string;
  duration: number;
  student_name: string;
  parents_info: string;
  fee: number;
  amt_due: number;
  fee_name: number;
  taxes: number;
  exp_date: string;
  valid_subscription: boolean;
  status: string;
}