/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Program, ProgramParams } from '../models/program';
import { get } from 'http';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ProgramService = {
  getPrograms: (params: ProgramParams) => 
  axios.get(`${API_URL}api/v1/departments/${params.department_id}/programs?branch_id=${params.branch_id}&department_id=${params.department_id}&page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}&paginate=${params.paginate}`, { headers: authHeader() }),
  addProgram: (program: Program) => axios.post(`${API_URL}api/v1/departments/${program.department_id}/programs`, program, { headers: authHeader() }),
  deleteProgram: (program: Program, id:number) => axios.delete(`${API_URL}api/v1/departments/${program.department_id}/programs/${id}`, { headers: authHeader() }),
  updateProgram: (program: Program, id:number) => axios.put(`${API_URL}api/v1/departments/${program.department_id}/programs/${id}`, program, { headers: authHeader() }),
  getProgram: (programId: number) => axios.get(`${API_URL}api/v1/departments/:department_id/programs/${programId}`, { headers: authHeader() }),
  getProgramList: (params: ProgramParams) => axios.get(`${API_URL}api/v1/programs/program_subjects/lessons/program_list?branch_id=${params.branch_id}&department_id=${params.department_id}&paginate=false`, { headers: authHeader() }), 
};

export default ProgramService;

