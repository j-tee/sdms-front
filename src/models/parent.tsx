import { PaginationParams } from "./pagination";
import { StudentViewModel } from "./student";

export interface ParentState {
  parents:ParentViewModel[];
  parent:ParentViewModel;
  myWards: StudentViewModel[];
  message:string;
  isLoading:boolean;
  status:string;
  pagination:PaginationParams
}
export interface ParentParams {
  school_id: number;
  branch_id: number;
  pagination:PaginationParams;
  paginate:boolean
}

export interface Parent {
  id?:number;
  fathers_full_name: string;
  mothers_full_name: string;
  fathers_occupation: string;
  mothers_occupation: string;
  fathers_email_address: string;
  mothers_email_address: string;
  fathers_contact_number: string;
  mothers_contact_number: string;
  residential_address: string;
  postal_address: string;
  fathers_ghana_card_number: string;
  mothers_ghana_card_number: string;
  title: string;
}

export interface ParentViewModel {
  id?:number;
  fathers_full_name?: string;
  mothers_full_name?: string;
  fathers_occupation?: string;
  mothers_occupation?: string;
  fathers_email_address?: string;
  mothers_email_address?: string;
  fathers_contact_number?: string;
  mothers_contact_number?: string;
  residential_address?: string;
  postal_address?: string;
  title?: string;
}