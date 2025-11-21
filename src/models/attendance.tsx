import { PaginationParams } from "./pagination";
import { StudentRegViewModel, StudentViewModel } from "./student";

export interface Attendance {
  id?: number;
  student_id?: number;
  lesson_id?: number;
  status?: string;
  attendance_date?: string;
}

export interface AttendanceState {
  attendees: StudentRegViewModel[];
  attendances: AttendanceViewModel[];
  attendance: AttendanceViewModel;
  message: string;
  status: string;
  isLoading: boolean;
  attendees_pagination: PaginationParams
  attendances_pagination: PaginationParams
}

export interface AttendanceViewModel {
  id: number;
  student_id: number;
  lesson_id: number;
  status: string;
  start_time:string;
  end_time: string;
  day_of_week: string;
  attendance_date: string;
  admission_id: string
  student_name: string;
  lesson_name: string;
  last_name: string;
  first_name: string;
  class_group_name: string;
}