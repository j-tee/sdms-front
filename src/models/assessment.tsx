import { PaginationParams } from "./pagination";

export interface Assessment {
  id?: number;
  assessment_name: string;
  base_mark: number;
  pass_mark: number;
  class_group_id: number;
  program_subject_id: number;
  assessment_type_id: number;
}

export interface AssessmentState {
  assessments: AssessmentViewModel[];
  assessment: AssessmentViewModel;
  message: string;
  status: string;
  isLoading: boolean;
  pagination: PaginationParams
}

export interface AssessmentViewModel {
  id: number;
  assessment_name: string;
  base_mark: number;
  pass_mark: number;
  class_group_name: string;
  program_name: string;
  subject_name: string;
  assessment_category: string;
  class_group_id: number;
  program_subject_id: number;
  assessment_type_id: number;
}