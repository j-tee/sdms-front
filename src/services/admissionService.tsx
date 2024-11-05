/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Admission, AdmissionParams } from '../models/admission';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const AdmissionService = {
  getVacancies: (params: AdmissionParams) => axios.get(`${API_URL}api/v1/admissions/registrations/vacancies?branch_id=${params.branch_id}&department_id=${params.department_id}&stage_id=${params.stage_id}&academic_term_id=${params.academic_term_id}&program_id=${params.program_id}&school_id=${params.school_id}`, { headers: authHeader() }),
  getAdmissions: (params: AdmissionParams) =>
    axios.get(`${API_URL}api/v1/admissions?${queryStringFormatter(params)}`, { headers: authHeader() }),
  addAdmission: (admission: Admission) => axios.post(`${API_URL}api/v1/admissions`, admission, { headers: authHeader() }),
  deleteAdmission: (admission: Admission, id: number) => axios.delete(`${API_URL}api/v1/admissions/${id}`, { headers: authHeader() }),
  updateAdmission: (admission: Admission, id: number) => axios.put(`${API_URL}api/v1/admissions/${id}`, admission, { headers: authHeader() }),
  getAdmission: (admissionId: number) => axios.get(`${API_URL}api/v1/admissions/${admissionId}`, { headers: authHeader() }),
};

export default AdmissionService;

