import { PaginationParams } from "./pagination";

export interface Program {
  id?: number;
  prog_name: string;
  department_id: number;
}

export interface ProgramParams {
  school_id?: number;
  paginate?: boolean;
  branch_id: number;
  department_id?: number;
  pagination?: PaginationParams
}

export interface ProgramViewModel {
  id: number;
  prog_name: string;
  department_id: number;
  dept_name: string;
}

export interface ProgramState {
  programs: ProgramViewModel[],
  program: ProgramViewModel;
  message: string;
  isLoading: boolean;
  status: string;
  pagination: PaginationParams
}