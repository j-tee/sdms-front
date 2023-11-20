import { Branch } from "./branch";

export interface Staff {
    id: number;
    email: string;
    last_name: string;
    first_name: string;
    phone_number: string;
    designation: string;
    dob: Date;
    gender: string;
    picture: string; 
    branch_id: number;
    created_at: Date;
    updated_at: Date;
    branch: Branch; 
  }
  