import { Pagination } from "./pagination";

export interface Program {
  prog_name: string;
  department_id: number;
}

export interface ProgramParams {
  paginate: boolean;
  branch_id: number;
  department_id: number;
  pagination: Pagination
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
  pagination: Pagination
}