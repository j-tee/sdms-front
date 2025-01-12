import { PaginationParams } from "./pagination"

export interface SubscriptionFeeState {
  subscriptionFees: SubscriptionFee[]
  subscriptionFee: SubscriptionFee
  pagination: PaginationParams
  isLoading: boolean
  message: string
}

export interface SubscriptionFee {
  id?: number
  amount: number
  duration: number
}