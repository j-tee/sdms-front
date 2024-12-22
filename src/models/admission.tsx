import { PaginationParams } from "./pagination";

export interface Admission {
  id?: number;
  academic_term_id: number;
  stage_id: number;
  student_id: number;
  admission_date: string;
  branch_id?: number;
  program_id: number;
  category: string;
}

export interface AdmissionState {
  admissions: AdmissionViewModel[];
  admission: AdmissionViewModel;
  message: string;
  status: string;
  vacancies:{
    admitted: number;
    places:number,
    registered:number,
    capacity:number,
    vacancy_percentage:number,
    reported:number;
    reported_percentage:number
  };
  isLoading: boolean;
  pagination: PaginationParams
}

export interface AdmissionViewModel {
  id: number;
  department_id: number;
  dept_name: string;
  academic_term_id: number;
  student_id: number;
  admission_date: string;
  stage_id: number;
  program_id: number;
  category: string;
  student_name: string;
  admission_stage: string;
  admission_program: string
}

export interface AdmissionParams {
  academic_term_id?:number;
  stage_id?: number;
  program_id?: number;
  department_id?: number;
  branch_id?: number;
  school_id?: number;
  paginate?: boolean;
  pagination?: PaginationParams
}