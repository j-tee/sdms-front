/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { StudentOptionalCourse } from '../models/optionalCourseRegistration';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentCourseRegService = {
  registerOptionalCourses: (formData: StudentOptionalCourse[]) => axios.post(`${API_URL}api/v1/student_optional_courses`, formData, { headers: authHeader() }), 
  };
export default StudentCourseRegService;
