/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { StudentRegParams } from '../models/student';
import queryStringFormatter from '../utility/queryStringFormatter';
import { QueryParams } from '../models/queryParams';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentRegService = {
  registerStudents: (registrations: any) => axios.post(`${API_URL}api/v1/student_registrations`, registrations, { headers: authHeader() }), 
  getRegistrationInformation: (params: QueryParams) => axios.get(`${API_URL}api/v1/registrations/students/new_registrations/regisration_info?${queryStringFormatter(params)}`, { headers: authHeader() }),
  getRegisteredStudents: (params: QueryParams) => axios.get(`${API_URL}api/v1/student_registrations?${queryStringFormatter(params)}`, { headers: authHeader() }),
  getRegisteredStudentsForRecordingScores:(params: StudentRegParams) => axios.get(`${API_URL}api/v1/registrations/score_sheets/assessments/record_assessment/students/registered_students_assessment?${queryStringFormatter(params)}`, { headers: authHeader() }),
};

export default StudentRegService;

