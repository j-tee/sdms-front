import { Pagination } from "./pagination";

export interface ParamObject {
  academic_term_id?: number;
  stage_id?: number;
  student_id: string,
  admission_date?: string;
  branch_id?: number;
  program_id?: number;
  department_id?: number;
  category?: string;
  paginate?:boolean;
  pagination?:Pagination
}