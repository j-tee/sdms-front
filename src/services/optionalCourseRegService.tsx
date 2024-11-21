/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { StudentOptionalCourse, StudentOptionalCourseParams, StudentOptionalCourseViewModel } from '../models/optionalCourseRegistration';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentOptionalCourseService = {
  getStudentOptionalCourses: (params: StudentOptionalCourseParams) => axios.get(`${API_URL}api/v1/student_optional_courses?${queryStringFormatter(params)}`, { headers: authHeader() }),  
  addStudentOptionalCourse: (student_optional_course: StudentOptionalCourse) => axios.post(`${API_URL}api/v1/student_optional_courses`, student_optional_course, { headers: authHeader() }),
  deleteStudentOptionalCourse: (student_optional_course: StudentOptionalCourseViewModel) => axios.delete(`${API_URL}api/v1/student_optional_courses/${student_optional_course.id}`, { headers: authHeader() }),
  updateStudentOptionalCourse: (student_optional_course: StudentOptionalCourse, id: number) => axios.put(`${API_URL}api/v1/student_optional_courses/${id}`, student_optional_course, { headers: authHeader() }),
  getStudentOptionalCourse: (id: number) => axios.get(`${API_URL}api/v1/student_optional_courses/${id}`, { headers: authHeader() }),
};
export default StudentOptionalCourseService;

