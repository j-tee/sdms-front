import { PaginationParams } from "./pagination";

export interface BillsFees {
    id?: number;
    academic_term_id: number;
    unit_cost: number;
    quantity: number;
    class_group_id: number;
    item: string;
  }
  export interface BillsFeesState {
    fees: BillsFees[];
    total_bill: number;
    fee: BillsFees;
    status: string;
    message: string;
    isLoading: boolean;
    pagination: PaginationParams
  }
  export interface BillsFeesViewModel {
    id: number;
    academic_term_id: number;
    unit_cost: number;
    quantity: number;
    class_group_id: number;
    item: string;
    academic_term_name: string;
    class_group_name: string;
  }
      