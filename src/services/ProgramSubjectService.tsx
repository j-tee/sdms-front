/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { ProgramSubject, ProgramSubjectParams, ProgramSubjectViewModel } from '../models/subject';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ProgramSubjectService = {
  getCourseOptions: (params: ProgramSubjectParams) => axios.get(`${API_URL}api/v1/program_subjects?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&stage_id=${params.stage_id}&current_page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}&paginate=${params.paginate}`, { headers: authHeader() }),
  addCourseOption: (subject: ProgramSubject) => axios.post(`${API_URL}api/v1/program_subjects`, subject, { headers: authHeader() }),
  deleteCourseOption: (subjectId: number) => axios.delete(`${API_URL}api/v1/program_subjects/${subjectId}`, { headers: authHeader() }),
  updateCourseOption: (subject: ProgramSubject) => axios.put(`${API_URL}api/v1/program_subjects/${subject.id}`, subject, { headers: authHeader() }),
  getCourseOption: (params: any) => axios.get(`${API_URL}api/v1/program_subjects/lessons/student_course_option?${queryStringFormatter(params)}`, { headers: authHeader() }),

};
export default ProgramSubjectService;
