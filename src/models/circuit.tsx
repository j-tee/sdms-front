import { District, DistrictViewModel } from "./district";
import { PaginationParams } from "./pagination";
import { Region } from "./region";
import { SchoolViewModel } from "./school";

export interface Circuit {
    id: number;
    name: string;
    district_id: number;
    region_id: number;
  }

  export interface CircuitViewModel {
    id: number; // Assuming 'id' is the primary key
    name: string;
    region_id: number; // Adjust the type based on your actual type for region_id
    created_at: Date;
    updated_at: Date;
    region: Region; // A District belongs to one Region
    district_id: number;
    district: DistrictViewModel;
    schools: SchoolViewModel[];
  }
  export interface CircuitState {
    circuits: CircuitViewModel[];
    circuit: Circuit;
    message: string;
    isLoading: boolean;
    pagination: PaginationParams;
  }
  