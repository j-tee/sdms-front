import { Pagination } from "./pagination";

export interface CalendarState {
  pagination: Pagination;
  academic_years: AcademicYearViewModel[]
  academic_terms: AcademicTermViewModel[]
  academic_term: AcademicTermViewModel;
  academic_year: AcademicYearViewModel;
  message: string;
  isLoading: boolean;
  status: string;
}

export interface AcademicYear {
  start_date: string;
  end_date: string;
  branch_id: number | "" | undefined
}

export interface AcademicTerm {
  term_name: string;
  start_date: string;
  end_date: string;
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
  id: number;
  term_name: string;
  branch_name: string;
  school_name: string;
  start_date: string;
  end_date: string;
  academic_year: string;
  start_year: number;
  end_year: number;
}

export interface YearParams {
  school_id: number | undefined;
  branch_id: number;
  pagination: Pagination;
}

export interface TermParams {
  year_id: number;
  pagination: Pagination
}