
import { Circuit } from "./circuit";
import { PaginationParams } from "./pagination";
import { Region } from "./region";

export interface District {
  id?: number; // Assuming 'id' is the primary key
  name: string;
  region_id: number; // Adjust the type based on your actual type for region_id
}

export interface DistrictViewModel {
  id?: number; // Assuming 'id' is the primary key
  name: string;
  region_id: number; // Adjust the type based on your actual type for region_id
  region_name: string; // A District belongs to one Region
  circuits: Circuit[]; // A District can have many Circuits
}
export interface DistrictState {
  districts: DistrictViewModel[];
  district: DistrictViewModel;
  message: string;
  isLoading: boolean;
  pagination: PaginationParams;
}