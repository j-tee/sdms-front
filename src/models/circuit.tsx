import { District } from "./district";

export interface Circuit {
    id: number; // Assuming 'id' is the primary key
    name: string;
    district_id: number; // Adjust the type based on your actual type for district_id
    created_at: Date;
    updated_at: Date;
    district: District; // A Circuit belongs to one District
  }
  