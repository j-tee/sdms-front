import { Pagination } from "./pagination";

export interface ParentState {
  parents:ParentViewModel[];
  parent:ParentViewModel;
  message:string;
  isLoading:boolean;
  status:string;
  pagination:Pagination
}
export interface ParentParams {
  school_id: number;
  branch_id: number;
  pagination:Pagination;
  paginate:boolean
}

export interface Parent {
  fathers_full_name: string;
  mothers_full_name: string;
  fathers_occupation: string;
  mothers_occupation: string;
  email_address: string;
  contact_number: string;
  residential_address: string;
  postal_address: string;
  title: string;
}

export interface ParentViewModel {
  id:number;
  fathers_full_name: string;
  mothers_full_name: string;
  fathers_occupation: string;
  mothers_occupation: string;
  email_address: string;
  contact_number: string;
  residential_address: string;
  postal_address: string;
  title: string;
}