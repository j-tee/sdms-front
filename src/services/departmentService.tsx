/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Department, DepartmentParams } from '../models/department';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const DepartmentService = {
  getStudentDepartments: (params: DepartmentParams) => axios.get(`${API_URL}api/v1/parents/students/departments/student_departments?${queryStringFormatter(params)}`, { headers: authHeader() }), 
  getDepartments: (params: DepartmentParams) => 
  axios.get(`${API_URL}api/v1/departments?${queryStringFormatter(params)}`, { headers: authHeader() }),
  addDepartment: (department: Department) => axios.post(`${API_URL}api/v1/departments`, department, { headers: authHeader() }),
  deleteDepartment: (departmentId: number) => axios.delete(`${API_URL}api/v1/departments/${departmentId}`, { headers: authHeader() }),
  updateDepartment: (department: Department, id:number) => axios.put(`${API_URL}api/v1/departments/${id}`, department, { headers: authHeader() }),
  getDepartment: (departmentId: number) => axios.get(`${API_URL}api/v1/departments/${departmentId}`, { headers: authHeader() }),
};

export default DepartmentService;

