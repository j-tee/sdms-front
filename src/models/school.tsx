import { Branch, BranchViewModel } from "./branch";
import { PaginationParams } from "./pagination";

export interface SchoolParams {
  school_id: number;
  level_id: number;
  category_id: number;
  ownership_category_id: number;
  religious_affiliation_id: number;
  region_id: number;
  district_id: number;
  circuit_id: number;
  user_id: number;
  parent_id: number;
  student_id: number;
  paginate:boolean;
  pagination: PaginationParams
}

// export interface SchoolViewModel {
//   religious_affiliation: string;
//   school_name: string;
//   category: string;
//   ownership_category: string;
//   crest_image_url: string;
//   bg_image_url: string;
//   branches: BranchViewModel[]
// }

export interface SchoolViewModel {
  id:0,
  level_id: number;
  category_id: number;
  religious_affiliation_id: number;
  ownership_category_id: number;
  school_name: string;
  religion: string;
  level_name: string;
  category_name: string;
  number_of_branches: number;
  ownership: string;
  bg_image_url: string;
  crest_image_url: string;
}
export interface School {
  id?: number;
  level_id: number;
  category_id: number;
  religious_affiliation_id: number;
  ownership_category_id: number;
  school_name: string;
  crest_image: File | null;
  background_picture_image: File | null;
}

export interface Category {
  id: number,
  name: string
}

export interface OwnershipCategory {
  id: number;
  ownership: string;
}

export interface Level {
  id: number;
  name: string;
}

export interface ReligiousAffiliation {
  id: number;
  religion: string;
}

export interface SchoolState {
  categoriesLoaded: boolean,
  levelsLoaded: boolean,
  ownershipCategoriesLoaded: boolean,
  religionsLoaded: boolean,
  status:string;
  schoolViewModel: SchoolViewModel;
  branch: Branch;
  schools: SchoolViewModel[];
  branches: BranchViewModel[];
  school: School;
  levels: Level[];
  religions: ReligiousAffiliation[]
  categories: Category[];
  ownershipCategories: OwnershipCategory[];
  message: string;
  isLoading: boolean;
  pagination: PaginationParams;
}
