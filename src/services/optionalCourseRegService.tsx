/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { StudentOptionalCourse, StudentOptionalCourseParams, StudentOptionalCourseViewModel } from '../models/optionalCourseRegistration';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentOptionalCourseService = {
  getStudentOptionalCourses: (params: StudentOptionalCourseParams) => {
    const queryParams = `branch_id=${params.branch_id}&` +
        `department_id=${params.department_id}&` +
        `program_id=${params.program_id}&` +
        `stage_id=${params.stage_id}&` +
        `student_id=${params.student_id}&` +
        `program_id=${params.academic_term_id}&` +
        `program_id=${params.school_id}&` +
        `current_page=${params.pagination?.current_page}&` +
        `per_page=${params.pagination?.per_page}&` +
        `paginate=${params.paginate}`;
    return axios.get(`${API_URL}api/v1/student_optional_courses?${queryParams}`, { headers: authHeader() });
  },
  
  addStudentOptionalCourse: (student_optional_course: StudentOptionalCourse) => axios.post(`${API_URL}api/v1/student_optional_courses`, student_optional_course, { headers: authHeader() }),
  deleteStudentOptionalCourse: (student_optional_course: StudentOptionalCourseViewModel) => axios.delete(`${API_URL}api/v1/student_optional_courses/${student_optional_course.id}`, { headers: authHeader() }),
  updateStudentOptionalCourse: (student_optional_course: StudentOptionalCourse, id: number) => axios.put(`${API_URL}api/v1/student_optional_courses/${id}`, student_optional_course, { headers: authHeader() }),
  getStudentOptionalCourse: (id: number) => axios.get(`${API_URL}api/v1/student_optional_courses/${id}`, { headers: authHeader() }),
};
export default StudentOptionalCourseService;

