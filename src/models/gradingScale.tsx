import { PaginationParams } from "./pagination";

export interface GradingScaleState {
    gradingScales: GradingScale[];
    gradingScale: GradingScale;
    message: string;
    status: string;
    isLoading: boolean;
    pagination: PaginationParams
}

export interface GradingScale {
  id?: number;
  branch_id: number;
  grade: string;
  lower_limit: number;
  upper_limit: number;
  remarks: string;
}

export interface GradingScaleViewModel {
  id: number;
  branch_name: string;
  school_name: string;
  grade: string;
  lower_limit: number;
  upper_limit: number;
  remark: string;
}