/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { ClassGroup, ClassGroupParams } from '../models/classGroup';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ClassGroupService = {
  getClassGroups: (params: ClassGroupParams) => 
  axios.get(`${API_URL}api/v1/class_groups?branch_id=${params.branch_id}&program_id=${params.program_id}&stage_id=${params.stage_id}&school_id=${params.stage_id}&program_id=${params.program_id}&department_id=${params.department_id}&page=${params.pagination.current_page}&per_page=${params.pagination.per_page}&paginate=${params.paginate}`, { headers: authHeader() }),
  addClassGroup: (class_group: ClassGroup) => axios.post(`${API_URL}api/v1/class_groups`, class_group, { headers: authHeader() }),
  deleteClassGroup: (class_groupId: number) => axios.delete(`${API_URL}api/v1/class_groups/${class_groupId}`, { headers: authHeader() }),
  updateClassGroup: (class_group: ClassGroup, id:number) => axios.put(`${API_URL}api/v1/class_groups/${id}`, class_group, { headers: authHeader() }),
  getClassGroup: (class_groupId: number) => axios.get(`${API_URL}api/v1/class_groups/${class_groupId}`, { headers: authHeader() }),
};

export default ClassGroupService;

