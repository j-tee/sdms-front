/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Student, StudentParams } from '../models/student';


const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentService = {
//   getStudentByEmail:(email:string) => axios.get(`${API_URL}api/v1/students/email/get_parent_by_email?email_address=${email}`, { headers: authHeader() }),
  getStudents: (params: StudentParams) => 
  axios.get(`${API_URL}api/v1/students?$branch_id={params.branch_id}&school_id=${params.school_id}&page=${params.pagination.current_page}&per_page=${params.pagination.per_page}&paginate=${params.paginate}`, { headers: authHeader() }),
  addStudent: (student: FormData) => axios.post(`${API_URL}api/v1/students`, student, { headers: authHeader() }),
  deleteStudent: (student: Student, id:number) => axios.delete(`${API_URL}api/v1/students/${id}`, { headers: authHeader() }),
  updateStudent: (student: Student, id:number) => axios.put(`${API_URL}api/v1/students/${id}`, student, { headers: authHeader() }),
  getStudent: (studentId: number) => axios.get(`${API_URL}api/v1/students/${studentId}`, { headers: authHeader() }),
};

export default StudentService;

