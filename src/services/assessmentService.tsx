/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';
import { AssessmentType } from '../models/assessmentTypes';
import { Assessment } from '../models/assessment';
import qs from 'qs';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const AssessmentService = {
  getAssessmentTypes: (params: QueryParams) =>
    axios.get(`${API_URL}api/v1/assessment_types?branch_id=${params.branch_id}&school_id=${params.school_id}&current_page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}&paginate=${params.paginate}`, { headers: authHeader() }),
  addAssessmentType: (assessmentType: AssessmentType) => axios.post(`${API_URL}api/v1/assessment_types`, assessmentType, { headers: authHeader() }),
  deleteAssessmentType: (assessmentType: AssessmentType, id: number) => axios.delete(`${API_URL}api/v1/assessment_types/${id}`, { headers: authHeader() }),
  updateAssessmentType: (assessmentType: AssessmentType, id: number) => axios.put(`${API_URL}api/v1/assessment_types/${id}`, assessmentType, { headers: authHeader() }),
  getAssessmentType: (assessmentTypeId: number) => axios.get(`${API_URL}api/v1/assessment_types/${assessmentTypeId}`, { headers: authHeader() }),
//   //////////////////////////////////////////////////////////////////////////
getAssessments: (params: QueryParams) =>axios.get(`${API_URL}api/v1/assessments?${queryStringFormatter(params)}`, { headers: authHeader() }),
  addAssessment: (assessment: Assessment) => axios.post(`${API_URL}api/v1/assessments`, assessment, { headers: authHeader() }),
  deleteAssessment: (id: number) => axios.delete(`${API_URL}api/v1/assessments/${id}`, { headers: authHeader() }),
  updateAssessment: (assessment: Assessment) => axios.put(`${API_URL}api/v1/assessments/${assessment.id}`, assessment, { headers: authHeader() }),
  getAssessment: (assessmentId: number) => axios.get(`${API_URL}api/v1/assessments/${assessmentId}`, { headers: authHeader() }),
  getStaffAssessmentSummary:(params: QueryParams) => axios.get(`${API_URL}api/v1/assessments/summary/staffs/evaluation/lessons/assessment_summary?${queryStringFormatter(params)}`, { headers: authHeader() }), 
  getNotConductedAssessments:(params: QueryParams) => axios.get(`${API_URL}api/v1/assessments/exercises/staff/not_conducted_assessments?${queryStringFormatter(params)}`, { headers: authHeader() }), 
};

export default AssessmentService;

