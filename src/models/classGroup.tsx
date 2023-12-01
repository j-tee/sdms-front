import { Pagination } from "./pagination";

export interface ClassGroup {
  class_name: string;
  branch_id: number;
  capacity: number;
  stage_id: number;
  program_id: number;
}

export interface ClassGroupParams {
  stage_id:number;
  class_group_id: number;
  branch_id: number;
  program_id: number;
  school_id: number;
  paginate: boolean;
  pagination: Pagination
}

export interface ClassGroupViewModel {
  id: number;
  class_name:string;
  dept_name: string;
  branch_id: number;
  branch_name: string;
  stage_name:string;
  program_name:string;
}

export interface ClassGroupState {
  class_groups: ClassGroupViewModel[],
  class_group: ClassGroupViewModel;
  message: string;
  isLoading: boolean;
  status: string;
  pagination: Pagination
}