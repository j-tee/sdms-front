import { Pagination } from "./pagination";

export interface Region {
  id: number; // Assuming 'id' is the primary key
  name: string;
}

export interface RegionState {
  regions: Region[];
  region: Region;
  message: string;
  isLoading: boolean;
  pagination: Pagination;
}
