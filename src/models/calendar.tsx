import { PaginationParams } from "./pagination";

export interface CalendarState {
  pagination: PaginationParams;
  academic_years: AcademicYearViewModel[]
  academic_terms: AcademicTermViewModel[]
  academic_term: AcademicTermViewModel;
  academic_year: AcademicYearViewModel;
  message: string;
  isLoading: boolean;
  status: string;
  term_count: number;
}

export interface AcademicYear {
  id?: number;
  start_date: string;
  end_date: string;
  branch_id: number | "" | undefined;
  // next_term_start_date: string;
}

export interface AcademicTerm {
  id?: number;
  term_name: string;
  start_date: string;
  end_date: string;
  next_term_start_date?: string;
  completed: boolean;
  academic_year_id: number;
}

export interface AcademicYearViewModel {
  id: number;
  branch_name: string;
  school_name: string;
  start_date: string;
  end_date: string;
  academic_year: string;
  start_year: number;
  end_year: number;
}

export interface AcademicTermViewModel {
  id?: number;
  term_name?: string;
  branch_name?: string;
  school_name?: string;
  start_date?: string;
  end_date?: string;
  academic_year_name: string;
  academic_year_id?: number;
  start_year?: number;
  end_year?: number;
  completed?: boolean;
  next_term_start_date?: string;
}

export interface YearParams {
  paginate:boolean;
  school_id: number | undefined;
  branch_id: number;
  pagination: PaginationParams;
}

export interface TermParams {
  year_id: number;
  pagination: PaginationParams
}