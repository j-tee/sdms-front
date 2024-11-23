import { PaginationParams } from "./pagination";

export interface ClassGroup {
  id?: number;
  class_name: string;
  capacity: number;
  stage_id: number;
  program_id: number;
}

export interface ClassGroupParams {
  lesson_id?: number;
  stage_id:number;
  class_group_id: number;
  department_id:number;
  branch_id: number;
  program_id: number;
  school_id: number;
  paginate: boolean;
  pagination: PaginationParams
}

export interface ClassGroupViewModel {
  id: number;
  class_name:string;
  dept_name: string;
  branch_id: number;
  branch_name: string;
  stage_name:string;
  program_name:string;
  class_grp_name:string;
}

export interface ClassGroupState {
  class_group_list: ClassGroupViewModel[];
  class_groups: ClassGroupViewModel[],
  class_group: ClassGroupViewModel;
  message: string;
  isLoading: boolean;
  status: string;
  pagination: PaginationParams
}