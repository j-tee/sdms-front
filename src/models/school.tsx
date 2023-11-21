import { BranchViewModel } from "./branch";
import { Pagination } from "./pagination";

export interface SchoolParams {
  level:string;
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

export interface SchoolViewModel {
  religious_affiliation: string;
  school_name: string;
  category: string;
  ownership_category: string;
  crest_image_url:string;
  bg_image_url: string;
  branches: BranchViewModel[]
}
export interface School {
  religious_affiliation: string;
  school_name: string;
  category: string;
  ownership_category: string;
  crest_image: File | null;
  background_picture_image: File | null;
}

export interface Category {
  id:number,
  name:string
}

export interface OwnershipCategory {
  id:number;
  ownership:string;
}

export interface Level {
  id:number;
  name:string;
}

export interface ReligiousAffiliation {
  id:number;
  religion:string;
}

export interface SchoolState {
  schools: School[];
  school: School;
  levels: Level[];
  religions:ReligiousAffiliation[]
  categories: Category[];
  ownershipCategories:OwnershipCategory[];
  message: string;
  isLoading: boolean;
  pagination: Pagination;
}
