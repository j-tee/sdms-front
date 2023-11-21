
import { Circuit } from "./circuit";
import { Pagination } from "./pagination";
import { Region } from "./region";

export interface District {
  id: number; // Assuming 'id' is the primary key
  name: string;
  region_id: number; // Adjust the type based on your actual type for region_id
}

export interface DistrictViewModel {
  id: number; // Assuming 'id' is the primary key
  name: string;
  region_id: number; // Adjust the type based on your actual type for region_id
  region: Region; // A District belongs to one Region
  circuits: Circuit[]; // A District can have many Circuits
}
export interface DistrictState {
  districts: DistrictViewModel[];
  district: DistrictViewModel;
  message: string;
  isLoading: boolean;
  pagination: Pagination;
}