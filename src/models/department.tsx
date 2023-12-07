import { Pagination } from "./pagination";

export interface Department {
  dept_name?: string;
  branch_id?: number;
}

export interface DepartmentParams{
  branch_id?:number;
  school_id?:number;
  paginate?:boolean;
  pagination?:Pagination
}

export interface DepartmentViewModel {
  id: number;
  dept_name: string;
  branch_id: number;
  branch_name: string;
}

export interface DepartmentState {
  departments: DepartmentViewModel[],
  department: DepartmentViewModel;
  message: string;
  isLoading: boolean;
  status: string;
  pagination: Pagination
}