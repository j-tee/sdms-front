/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';
import { Attendance } from '../models/attendance';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const AttendanceService = {
  getAttendees: (params: QueryParams) => 
  axios.get(`${API_URL}api/v1/student_registrations/registrations/class_groups/attendees/registered_students_attendance?${queryStringFormatter(params)}`, { headers: authHeader() }),    
  getAttendances: (params: QueryParams) => axios.get(`${API_URL}api/v1/attendances?${queryStringFormatter(params)}`, { headers: authHeader() }),
  addAttendance: (attendance: Attendance[]) => axios.post(`${API_URL}api/v1/attendances`, attendance, { headers: authHeader() }),
  deleteAttendance: (attendanceId: number) => axios.delete(`${API_URL}api/v1/attendances/${attendanceId}`, { headers: authHeader() }),
  updateAttendance: (attendance: Attendance, id:number) => axios.put(`${API_URL}api/v1/attendances/${id}`, attendance, { headers: authHeader() }),
  getAttendance: (attendanceId: number) => axios.get(`${API_URL}api/v1/attendances/${attendanceId}`, { headers: authHeader() }),
};

export default AttendanceService;

