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
  avatar:File|null;
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
  image_url:string;
  fathers_name:string;
  mothers_name:string;
  contact_number:string;
  email_address:string;
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
  pagination:Pagination;
  paginate:boolean;
}

export interface StudentState {
students:StudentViewModel[];
student:StudentViewModel;
std_message:string;
isLoading:boolean;
std_status:string;
pagination:Pagination
}