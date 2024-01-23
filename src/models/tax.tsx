import { PaginationParams } from "./pagination";

export interface Tax {
  id?: number;
  tax_name: string;
  rate: number;
  unit: string;
}

export interface TaxState {
  taxes: Tax[];
  tax: Tax;
  status: string;
  message: string;
  isLoading: boolean;
  pagination: PaginationParams;
}