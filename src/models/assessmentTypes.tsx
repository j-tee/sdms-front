import { PaginationParams } from './pagination';
export interface AssessmentType {
  id?: number;
  category: string;
  percentage_score: number;
  branch_id: number;
}

export interface AssessmentTypeState {
  assessment_types: AssessmetTypeViewModel[];
  assessment_type: AssessmetTypeViewModel;
  message: string;
  status: string;
  isLoading: boolean;
  pagination: PaginationParams
}

export interface AssessmetTypeViewModel {
  id: number;
  category: string;
  branch_name: string;
  school_name: string;
  percentage_score: number;
  branch_id: number;
}