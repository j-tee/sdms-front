/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Stage, StageParams, StageViewModel } from '../models/stage';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StageService = {
  getStages: (params: StageParams) => axios.get(`${API_URL}api/v1/stages?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&page=${params.pagination.current_page}&per_page=${params.pagination.per_page}`, { headers: authHeader() }),
  addStage: (stage: Stage) => axios.post(`${API_URL}api/v1/stages`, stage, { headers: authHeader() }),
  deleteStage: (stage: StageViewModel) => axios.delete(`${API_URL}api/v1/stages/${stage.id}`, { headers: authHeader() }),
  updateStage: (stage: Stage, id: number) => axios.put(`${API_URL}api/v1/stages/${id}`, stage, { headers: authHeader() }),
  getStage: (id: number) => axios.get(`${API_URL}api/v1/stages/${id}`, { headers: authHeader() }),
};
export default StageService;
