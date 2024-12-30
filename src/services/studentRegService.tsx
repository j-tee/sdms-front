/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Registration, StudentRegParams } from '../models/student';
import queryStringFormatter from '../utility/queryStringFormatter';
import { QueryParams } from '../models/queryParams';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentRegService = {
  updateRegistration: (registration: Registration) => axios.put(`${API_URL}api/v1/schools/students/registrations/update_student_registration/${registration.id}`, registration, { headers: authHeader() }),
  getStudentRegistration: (params: any) => axios.get(`${API_URL}api/v1/schools/students/registrations/student_registration?${queryStringFormatter(params)}`, { headers: authHeader() }),  
  registerStudents: (registrations: any) => axios.post(`${API_URL}api/v1/registrations`, registrations, { headers: authHeader() }), 
  getRegistrationInformation: (params: QueryParams) => axios.get(`${API_URL}api/v1/registrations/students/new_registrations/registration_info?${queryStringFormatter(params)}`, { headers: authHeader() }),
  getRegisteredStudents: (params: QueryParams) => axios.get(`${API_URL}api/v1/registrations?${queryStringFormatter(params)}`, { headers: authHeader() }),
  getOptionalCourseRegistrations: (params: any) => axios.get(`${API_URL}api/v1/students/course_options/student_course_options_registrations/unregistered_students_for_optional_subject?${queryStringFormatter(params)}`, { headers: authHeader() }), 
  getRegisteredStudentsForRecordingScores:(params: StudentRegParams) => axios.get(`${API_URL}api/v1/registrations/score_sheets/assessments/record_assessment/students/registered_students_assessment?${queryStringFormatter(params)}`, { headers: authHeader() }),
};

export default StudentRegService;

