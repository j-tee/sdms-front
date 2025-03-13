import { PaginationParams } from "./pagination";

export interface Assessment {
  id?: number;
  assessment_name: string;
  base_mark: number;
  pass_mark: number;
  subject_id: number;
  academic_term_id: number;
  staff_id: number;
  assessment_type_id: number;
  assessment_date: string;
}

export interface AssessmentState {
  assessments: AssessmentViewModel[];
  assessment: AssessmentViewModel;
  staff_assessment_summary:StaffAssessmentSummary[];
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
  category: string;
  academic_term_id?: number;
  class_group_name: string;
  program_name: string;
  subject_name: string;
  subject_id?: number;
  staff_id?: number;
  assessment_category: string;
  class_group_id: number;
  program_subject_id: number;
  assessment_type_id: number;
  academic_term_name: string;
  assessment_date: string;
}

export interface StaffAssessmentSummary {
  staff_id?: number;
  subject_name?: string;
  total?: number;
  // total_students: number;
  // total_mark: number;
  // total_average: number;
  // total_pass: number;
  // total_fail: number;
  // total_absent: number;
  // total_present: number;
  // total_pass_percentage: number;
  // total_fail_percentage: number;
  // total_absent_percentage: number;
  // total_present_percentage: number;
}