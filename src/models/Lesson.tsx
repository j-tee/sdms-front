import { PaginationParams } from "./pagination";

export interface Lesson {
  id?: number;
  class_group_id: number;
  staff_id: number;
  program_subject_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

export interface LessonParams {
  school_id?: number;
  branch_id?: number;
  department_id?: number;
  program_id?: number;
  stage_id?: number;
  class_group_id?: number;
  staff_id?: number;
  program_subject_id?: number;
  assessment_type_id?: number;
  academic_term_id?: number;
  academic_year_id?: number;
  day_of_week?: string;
  paginate: boolean;
  pagination: PaginationParams;
}

export interface LessonViewModel {
  id: number;
  class_group_id: number;
  staff_id: number;
  program_subject_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  class_group_name: string;
  staff_name: string;
  subject_name: string;
  program_name: string;
  stage_name: string;
  term_name: string;
  dept_name: string;
}

export interface LessonState {
  lessons: LessonViewModel[];
  lesson: LessonViewModel;
  status: string;
  message: string;
  isLoading: boolean;
  paginate: boolean;
  pagination: PaginationParams;
} 