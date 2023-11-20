import { Pagination } from "./pagination";

export interface SchoolParams {
  category: string;
  ownership_category: string;
  religious_affiliation: string;
  region_id: number;
  district_id: number;
  circuit_id: number;
  user_id: number;
  parent_id: number;
  student_id: number;
  pagination: Pagination
}

export interface School {
  religious_affiliation: string;
  school_name: string;
  category: string;
  ownership_category: string;
  crest_image: File | null;
  background_picture_image: File | null;
  // branches: Branch[];
}

export interface SchoolState {
  schools: School[];
  school: School;
  message: string;
  isLoading: boolean;
  pagination: Pagination;
}
