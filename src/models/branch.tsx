import { Pagination } from './pagination';


export interface BranchParams {
    school_id:number;
    level_id:number;
    category_id: number;
    ownership_category_id: number;
    religious_affiliation_id: number;
    region_id: number;
    district_id: number;
    circuit_id: number;
    user_id: number;
    parent_id: number;
    student_id: number;
    pagination: Pagination
  }

  export interface Branch {
    branch_name: string;
    postal_address: string;
    website: string;
    email_address: string;
    residential_address: string;
    phone1: string;
    phone2: string;
    school_id: number;
    circuit_id: number; 
  }

  export interface BranchViewModel{
    id:number;
    branch_name: string;
    level: string;
    postal_address: string;
    website: string;
    email_address: string;
    residential_address: string;
    phone1: string;
    phone2: string;
    school_id: number; // Adjust the type based on your actual type for school_id
    circuit_id: number; // Adjust the type based on your actual type for circuit_id
    school_name:string;
    crest_url:string;
    bg_image_url:string;
    region_id: number;
    region_name:string;
    district_name:string;
    circuit_name:string;
  }
  
  // If you have additional types, such as Circuit, you may need to define them as well.
  