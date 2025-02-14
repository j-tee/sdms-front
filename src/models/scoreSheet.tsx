import { PaginationParams } from "./pagination";

export interface ScoreSheet {
  id?: number;
  student_id?: number;
  score?: number;
  assessment_id?: number;
  assessment_date?: string;
  remarks?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    hidden?: boolean;
  }[];
}

export interface ScoreSheetState {
  student_subject_averages: ChartData;
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
  base_mark?: number;
  pass_mark?: number;
  assessment_id: number;
  student_name: string;
  assessment_name: string;
  subject_name: string;
  category: string;
  student_score: string;
  percentage_score: number;
  class_group_name: string;
  remarks: string;
  assessment_date: string;
}

export interface TerminalReport {
  subject_name: string;
  ca_score: number;
  ta_score: number;
  total: number;
  attendances_count: number;
  position_in_subject: string;
  grade: string;
  remark: string;
}

export interface StudentReport {
  reports: TerminalReport[];
  student_id: string;
  over_all_total: number;
  over_all_position: string;
}

export interface StudentSubjectAverages{
  labels: string[];
  datasets: any[];

}