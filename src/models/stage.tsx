import { PaginationParams } from "./pagination";

export interface Stage {
  id?: number;
  stage_name: string;
  branch_id: number;
}

export interface StageViewModel {
  id: number;
  stage_name: string;
  branch_id: number;
  branch_name: string;
  school_name: string;
}

export interface StageState {
  stages: StageViewModel[];
  message: string;
  status: string;
  stage: StageViewModel;
  isLoading: boolean;
  pagination: PaginationParams
}

export interface StageParams {
  school_id?: number;
  stage_id?:number,
  program_id?: number;
  branch_id?: number;
  department_id?: number;
  pagination?:PaginationParams
  paginate?:boolean;
}