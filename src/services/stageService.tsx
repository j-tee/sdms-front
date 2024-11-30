/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Stage, StageParams, StageViewModel } from '../models/stage';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StageService = {
  getStudentStages: (params: StageParams) => axios.get(`${API_URL}api/v1/parents/students/stages/student_stages?${queryStringFormatter(params)}`, { headers: authHeader() }),  
  getStages: (params: StageParams) => axios.get(`${API_URL}api/v1/stages?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&current_page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}&paginate=${params.paginate}`, { headers: authHeader() }),
  addStage: (stage: Stage) => axios.post(`${API_URL}api/v1/stages`, stage, { headers: authHeader() }),
  deleteStage: (stage: StageViewModel) => axios.delete(`${API_URL}api/v1/stages/${stage.id}`, { headers: authHeader() }),
  updateStage: (stage: Stage, id: number) => axios.put(`${API_URL}api/v1/stages/${id}`, stage, { headers: authHeader() }),
  getStage: (id: number) => axios.get(`${API_URL}api/v1/stages/${id}`, { headers: authHeader() }),
  getStageList: (params: StageParams) => axios.get(`${API_URL}api/v1/stages/program_subjects/lessons/stage_list?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&paginate=false`, { headers: authHeader() }),  
};
export default StageService;

