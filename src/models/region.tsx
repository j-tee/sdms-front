import { District } from "./district";

export interface Region {
    id: number; // Assuming 'id' is the primary key
    Name: string;
    created_at: Date;
    updated_at: Date;
    districts: District[]; // A Region can have many Districts
  }
  