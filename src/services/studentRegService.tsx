/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { StudentRegParams } from '../models/student';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentRegService = {
  registerStudents: (registrations: any) => axios.post(`${API_URL}api/v1/student_registrations`, registrations, { headers: authHeader() }), 
  getRegistrationInformation: (params: StudentRegParams) => axios.get(`${API_URL}api/v1/registrations/students/new_registrations/regisration_info?stage_id=${params.stage_id}&program_id=${params.program_id}&department_id=${params.department_id}&branch_id=${params.branch_id}&school_id=${params.school_id}&academic_term_id=${params.academic_term_id}&class_group_id=${params.class_group_id}&page=${params?.pagination?.current_page}&per_page=${params.pagination?.per_page}`, { headers: authHeader() }),
  getRegisteredStudents: (params: StudentRegParams) => axios.get(`${API_URL}api/v1/student_registrations?stage_id=${params.stage_id}&program_id=${params.program_id}&department_id=${params.department_id}&branch_id=${params.branch_id}&school_id=${params.school_id}&academic_term_id=${params.academic_term_id}&class_group_id=${params.class_group_id}&page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}`, { headers: authHeader() }),
};

export default StudentRegService;

