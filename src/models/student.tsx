import { Pagination } from "./pagination";

export interface Student {
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  other_names: string;
  nationality: string;
  parent_id: number;
  student_id: string;
  avatar: File | null;
}

export interface StudentViewModel {
  id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  other_names: string;
  nationality: string;
  parent_id: number;
  student_id: string;
  image_url: string;
  fathers_name: string;
  mothers_name: string;
  contact_number: string;
  email_address: string;
}

export interface StudentParams {
  parent_id: number;
  school_id: number;
  branch_id: number;
  stage_id: number;
  classgroup_id: number;
  subject_id: number;
  admission_id: number;
  academic_year_id: number;
  academic_term_id: number;
  pagination: Pagination;
  paginate: boolean;
}

export interface country {
  name: string;
}

export interface StudentState {
  students: StudentViewModel[];
  countries: country[];
  student: StudentViewModel;
  std_message: string;
  isLoading: boolean;
  std_status: string;
  pagination: Pagination
}

export interface StudentRegParams {
  student_id?: number;
  reg_date?: string;
  stage_id?: number;
  program_id?: number;
  department_id?: number;
  branch_id?: number;
  school_id?: number;
  term_id?: number;
  class_group_id?: number;
  pagination?: Pagination
}

export interface StudentRegistration {
  student_id: number;
  class_group_id: number;
  academic_term_id: number;
  reg_date: string;
}

export interface StudentRegViewModel {
  id: 0,
  student_class: string;
  student_program: string;
  student_stage: string;
  first_name: string,
  last_name: string;
  birth_date: string;
  gender: string;
  other_names: string;
  nationality: string;
  student_id: string;
  parent_id: 0,
  image_url: string;
  fathers_name: string;
  mothers_name: string;
  contact_number: string;
  email_address: string;
}

export interface StudentRegState {
  registrations: StudentRegViewModel[];
  isLoading: boolean;
  pagination?: Pagination;
  status:string;
  message:string;
  reg_info: {
    all_unregistered_students: StudentRegViewModel[];
    registered: StudentRegViewModel[];
    registered_in_previous_term: StudentRegViewModel[];
    continuing_students_not_registered: StudentRegViewModel[];
    admitted_but_not_regsitered: StudentRegViewModel[];
  }
}