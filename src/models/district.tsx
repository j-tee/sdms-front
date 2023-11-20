import { Circuit } from "./circuit";
import { Region } from "./region";

export interface District {
    id: number; // Assuming 'id' is the primary key
    name: string;
    region_id: number; // Adjust the type based on your actual type for region_id
    created_at: Date;
    updated_at: Date;
    region: Region; // A District belongs to one Region
    circuits: Circuit[]; // A District can have many Circuits
  }
  