import { PaginationParams } from "./pagination";

export interface Subject {
  id?: number;
  subject_name: string;
  subject_code: string;
  branch_id: number;
}

export interface ProgramSubjectParams {
  subject_id?: number;
  program_id?: number;
  stage_id?: number;
  academic_year_id?: number;
  department_id?: number;
  branch_id?: number;
  school_id?: number;
  credit_hours?: number;
  optional?: number;
  pagination: PaginationParams;
  paginate: boolean;
}

export interface ProgramSubjectState {
  course_options: ProgramSubjectViewModel[];
  course_option: ProgramSubjectViewModel;
  status: string;
  message: string;
  isLoading: boolean;
  paginate: boolean;
  pagination: PaginationParams;
}

export interface ProgramSubject {
  id?: number;
  stage_id: number;
  academic_year_id: number;
  subject_id: number;
  program_id: number;
  optional: number;
  credit_hours: number;
}

export interface ProgramSubjectViewModel {
  id: number;
  stage_id: number;
  academic_term_id: number;
  academic_year_id: number;
  subject_id: number;
  subject_name: string;
  program_id: number;
  stage_name: string;
  program_name: string;
  term_name: string;
  dept_name: string;
  optional: number;
  credit_hours: number;
}

export interface SubjectState {
  subject_list:string[]
  subjects_from_timetable:SubjectViewModel[];
  staff_subject_list: string[];
  subjects: SubjectViewModel[];
  subject: SubjectViewModel;
  status: string;
  message: string;
  isLoading: boolean;
  pagination: PaginationParams;
}
export interface SubjectParams {
  student_id?: number;
  staff_id?: number;
  school_id?: number;
  branch_id?: number;
  department_id?: number;
  program_id?: number;
  academic_term_id?: number;
  stage_id?: number;
  paginate: boolean;
  pagination: PaginationParams;
}

export interface SubjectViewModel {
  id: number;
  subject_id: number;
  subject_name: string;
  subject_code: string;
  branch_id: number;
  branch_name: string;
  department_id?: number;
  department_name?: string;
  program_id?: number;
  program_name?: string;
  staff_name: string;
}
