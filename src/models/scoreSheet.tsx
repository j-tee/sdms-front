import { PaginationParams } from "./pagination";

export interface ScoreSheet {
  id?: number;
  student_id?: number;
  score?: number;
  assessment_id?: number;
}

export interface ScoreSheetState {
  student_reports: StudentReport[];
  score_sheets: ScoreSheetViewModel[];
  score_sheet: ScoreSheetViewModel;
  message: string;
  status: string;
  isLoading: boolean;
  pagination: PaginationParams
}

export interface ScoreSheetViewModel {
  id: number;
  student_id: number;
  score: number;
  assessment_id: number;
  student_name: string;
  assessment_name: string;
  subject_name: string;
  category: string;
  student_score: string;
  percentage_score: number;
  class_group_name: string;
}

export interface TerminalReport {
  subject_name: string;
  ca_score: number;
  ta_score: number;
  total: number;
  attendances_count: number;
  position: string;
  grade: string;
  remark: string;
}

export interface StudentReport {
  reports: TerminalReport[];
  student_id: string;
  over_all_total: number;
  over_all_position: string;
}