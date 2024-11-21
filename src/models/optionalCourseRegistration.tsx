import { PaginationParams } from "./pagination";

export interface StudentOptionalCourse {
  student_id: number;
  program_subject_id: number;
  reg_date: string;
}

export interface StudentOptionalCourseFormData {
  course_registration: StudentOptionalCourse;
}

export interface StudentOptionalCourseState {
  student_optional_courses: StudentOptionalCourseViewModel[];
  student_optional_course: StudentOptionalCourseViewModel;
  message: string;
  status: string;
  isLoading: boolean;
  paginate: boolean;
  pagination: PaginationParams;
}
export interface StudentOptionalCourseViewModel {
  id: number;
  student_id: number;
  program_subject_id: number;
  subject_code: string;
  subject_name: string;
  term_name: string;
  stage_name: string;
  program_name: string;
  student_name: string;
  reg_date: string;
}

export interface StudentOptionalCourseParams {
  student_id?: number;
  program_subject_id?: number;
  // academic_term_id?: number;
  department_id?: number;
  academic_year_id?: number;
  branch_id?: number;
  program_id?: number;
  stage_id?: number;
  school_id?: number;
  reg_date?: string;
  paginate?: boolean;
  pagination?: PaginationParams
}