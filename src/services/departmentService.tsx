/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Department, DepartmentParams } from '../models/department';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const DepartmentService = {
  getDepartments: (params: DepartmentParams) => 
  axios.get(`${API_URL}api/v1/departments?branch_id=${params.branch_id}&school_id=${params.school_id}&page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}&paginate=${params.paginate}`, { headers: authHeader() }),
  addDepartment: (department: Department) => axios.post(`${API_URL}api/v1/departments`, department, { headers: authHeader() }),
  deleteDepartment: (departmentId: number) => axios.delete(`${API_URL}api/v1/departments/${departmentId}`, { headers: authHeader() }),
  updateDepartment: (department: Department, id:number) => axios.put(`${API_URL}api/v1/departments/${id}`, department, { headers: authHeader() }),
  getDepartment: (departmentId: number) => axios.get(`${API_URL}api/v1/departments/${departmentId}`, { headers: authHeader() }),
};

export default DepartmentService;

