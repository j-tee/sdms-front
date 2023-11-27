/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { AcademicTerm, TermParams, YearParams } from '../models/calendar';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CalendarService = {
  getAcademicYears: (params: YearParams) => axios.get(`${API_URL}api/v1/academic_years?school_id=${params.school_id}&branch_id=${params.branch_id}&page=${params.pagination.current_page}&per_page=${params.pagination.per_page}`, { headers: authHeader() }),
  addAcademicYear: (year: any) => axios.post(`${API_URL}api/v1/academic_years`, year, { headers: authHeader() }),
  deleteAcaemicYear: (year: any) => axios.delete(`${API_URL}api/v1/academic_years/${year.id}`, { headers: authHeader() }),
  updateAcademicYear: (year: any) => axios.put(`${API_URL}api/v1/academic_years/${year.id}`, year, { headers: authHeader() }),
  getAcademicYear: (id: number) => axios.get(`${API_URL}api/v1/academic_years/${id}`, { headers: authHeader() }),
  getAcademicTerms: (params: TermParams) => axios.get(`${API_URL}api/v1/academic_years/${params.year_id}/academic_terms?page=${params.pagination.current_page}&per_page=${params.pagination.per_page}`, { headers: authHeader() }),
  addAcademicTerm: (term: AcademicTerm) => axios.post(`${API_URL}api/v1/academic_years/${term.academic_year_id}/academic_terms`, term, { headers: authHeader() }),
  deleteAcaemicTerm: (termId: number) => axios.delete(`${API_URL}api/v1/academic_years/${termId}`, { headers: authHeader() }),
  updateAcademicTerm: (term: AcademicTerm, id:number) => axios.put(`${API_URL}api/v1/academic_years/${id}`, term, { headers: authHeader() }),
  getAcademicTerm: (id: number) => axios.get(`${API_URL}api/v1/academic_years/${id}`, { headers: authHeader() }),
};

export default CalendarService;
