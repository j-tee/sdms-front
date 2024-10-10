/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { AcademicTerm, AcademicTermViewModel, TermParams, YearParams } from '../models/calendar';
import { QueryParams } from '../models/queryParams';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CalendarService = {
  getTermCount: (branch_id: number) => axios.get(`${API_URL}api/v1/academic_years/registration/admission/current_academic_year/get_term_count/${branch_id}`, { headers: authHeader() }), 
  getCurrentAcademicYear: (branch_id: number) => axios.get(`${API_URL}api/v1/academic_years/registration/admission/current_academic_year/${branch_id}`, { headers: authHeader() }),
  getCurrentTerm: (branch_id: number) => axios.get(`${API_URL}api/v1/academic_terms/terms/current_term/${branch_id}`, { headers: authHeader() }),
  getAcademicYears: (params: YearParams) => axios.get(`${API_URL}api/v1/academic_years?school_id=${params.school_id}&branch_id=${params.branch_id}&current_page=${params.pagination.current_page}&per_page=${params.pagination.per_page}`, { headers: authHeader() }),
  addAcademicYear: (year: any) => axios.post(`${API_URL}api/v1/academic_years`, year, { headers: authHeader() }),
  deleteAcaemicYear: (year: any) => axios.delete(`${API_URL}api/v1/academic_years/${year.id}`, { headers: authHeader() }),
  updateAcademicYear: (year: any) => axios.put(`${API_URL}api/v1/academic_years/${year.id}`, year, { headers: authHeader() }),
  getAcademicYear: (id: number) => axios.get(`${API_URL}api/v1/academic_years/${id}`, { headers: authHeader() }),
  getAcademicTerms: (params: QueryParams) => axios.get(`${API_URL}api/v1/academic_years/${params.academic_year_id}/academic_terms?current_page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}`, { headers: authHeader() }),
  addAcademicTerm: (term: AcademicTerm) => axios.post(`${API_URL}api/v1/academic_years/${term.academic_year_id}/academic_terms`, term, { headers: authHeader() }),
  deleteAcademicTerm: (term: AcademicTermViewModel) => axios.delete(`${API_URL}api/v1/academic_years/${term.academic_year_id}/academic_terms/${term.id}`, { headers: authHeader() }),
  updateAcademicTerm: (term: AcademicTerm, id: number) => axios.put(`${API_URL}api/v1/academic_years/${term.academic_year_id}/academic_terms/${id}`, term, { headers: authHeader() }),
  getAcademicTerm: (id: number) => axios.get(`${API_URL}api/v1/academic_years/${id}`, { headers: authHeader() }),
  getStudentAcademicYears: (params: QueryParams) => axios.get(`${API_URL}api/v1/schools/student/registration/student_academic_years?${queryStringFormatter(params)}`, { headers: authHeader() }), 
};

export default CalendarService;

