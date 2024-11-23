import { PaginationParams } from "./pagination";

export interface QueryParams {
  id?:number;
  lesson_id?: number;
  academic_term_id?: number;
  attendance_date?: string;
  stage_id?: number;
  student_id?: number,
  admission_date?: string;
  branch_id?: number;
  program_id?: number;
  department_id?: number;
  assessment_id?: number;
  assessment_type_id?: number;
  category?: string;
  paginate?: boolean;
  pagination?: PaginationParams,
  school_id?: number;
  level_id?: number;
  category_id?: number;
  ownership_category_id?: number;
  religious_affiliation_id?: number;
  region_id?: number;
  district_id?: number;
  circuit_id?: number;
  user_id?: number;
  parent_id?: number;
  staff_id?: number;
  program_subject_id?: number;
  day_of_week?: string;
  academic_year_id?: number;
  reg_date?: string;
  subject_id?: number;
  class_group_id?: number;
  stage_name?: string;
  class_name?: string;
  email?: string;
  start_time?: string;
  end_time?: string;
}