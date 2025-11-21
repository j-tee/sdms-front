/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Student, StudentParams } from '../models/student';
import queryStringFormatter from '../utility/queryStringFormatter';
import { countries } from '../models/countries';


const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentService = {
  getCountries: () => countries,
  getStudentById: (student_id: string) => axios.get(`${API_URL}api/v1/students/student_id/get_student_by_id?student_id=${student_id}`, { headers: authHeader() }),
  getStudents: (params: StudentParams) => axios.get(`${API_URL}api/v1/students?${queryStringFormatter(params)}`, { headers: authHeader() }),
  addStudent: (student: FormData) => axios.post(`${API_URL}api/v1/students`, student, { headers: authHeader() }),
  deleteStudent: (student: Student, id: number) => axios.delete(`${API_URL}api/v1/students/${id}`, { headers: authHeader() }),
  updateStudent: (student: FormData, id: number) => axios.put(`${API_URL}api/v1/students/${id}`, student, { headers: authHeader() }),
  getStudent: (studentId: number) => axios.get(`${API_URL}api/v1/students/${studentId}`, { headers: authHeader() }),
};

export default StudentService;

