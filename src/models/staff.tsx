import { PaginationParams } from "./pagination";


export interface StaffParams {
  school_id?: number;
  branch_id?: number;
  department_id?: number;
  program_id?: number;
  subject_id?: number;
  staff_id?: number;
  class_group_id?: number;
  pagination?: PaginationParams
  paginate?: boolean;
}

export interface Staff {  
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  dob: string;
  designation: string;
  gender: string;
  phone_number: string;
  branch_id: number;
  avatar:File | null;
}

export interface StaffState {
  staffs: StaffViewModel[];
  staff: StaffViewModel;
  message: string;
  status: string;
  isLoading: boolean;
  pagination: PaginationParams
}

export interface StaffViewModel { 
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  dob: string;
  designation: string;
  gender: string;
  phone_number: string;
  branch_id: number;
  branch_name: string;
  image_url: string;
}