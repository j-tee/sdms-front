/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Subject, SubjectParams, SubjectViewModel } from '../models/subject';
import queryStringFormatter from '../utility/queryStringFormatter';
import { get } from 'http';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const SubjectService = {
  getSubjects: (params: SubjectParams) => axios.get(`${API_URL}api/v1/subjects?${queryStringFormatter(params)}`, { headers: authHeader() }),
  addSubject: (subject: Subject) => axios.post(`${API_URL}api/v1/subjects`, subject, { headers: authHeader() }),
  deleteSubject: (subject: SubjectViewModel) => axios.delete(`${API_URL}api/v1/subjects/${subject.id}`, { headers: authHeader() }),
  updateSubject: (subject: Subject, id: number|undefined) => axios.put(`${API_URL}api/v1/subjects/${id}`, subject, { headers: authHeader() }),
  getSubject: (id: number) => axios.get(`${API_URL}api/v1/subjects/${id}`, { headers: authHeader() }),
  getSubjectList: (params: any) => axios.get(`${API_URL}api/v1/subjects/program_subjects/lessons/subject_list?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&optional=${params.optional}&academic_term_id=${params.academic_term_id}&paginate=false`, { headers: authHeader() }),  
  getClassSubjectList: (params: any) => axios.get(`${API_URL}api/v1/schools/class_groups/subjects/class_subject_list?${queryStringFormatter(params)}`, { headers: authHeader() }),  
  getStaffSubjectList:(params: any) => axios.get(`${API_URL}api/v1/subjects/program_subjects/lessons/staff_subject_list?${queryStringFormatter(params)}`, { headers: authHeader() }),  
};
export default SubjectService;

