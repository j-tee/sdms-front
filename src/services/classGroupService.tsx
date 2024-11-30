/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { ClassGroup, ClassGroupParams } from '../models/classGroup';
import queryStringFormatter from '../utility/queryStringFormatter';
import { getStudentClassGroup } from '../redux/slices/classGroupSlice';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ClassGroupService = {
  getStudentClassGroups: (params: ClassGroupParams) => axios.get(`${API_URL}api/v1/schools/class_groups/student_class_groups?${queryStringFormatter(params)}`, { headers: authHeader() }), 
  getClassGroups: (params: ClassGroupParams) => 
  axios.get(`${API_URL}api/v1/class_groups?${queryStringFormatter(params)}`, { headers: authHeader() }),
  addClassGroup: (class_group: ClassGroup) => axios.post(`${API_URL}api/v1/class_groups`, class_group, { headers: authHeader() }),
  deleteClassGroup: (class_groupId: number) => axios.delete(`${API_URL}api/v1/class_groups/${class_groupId}`, { headers: authHeader() }),
  updateClassGroup: (class_group: ClassGroup, id:number) => axios.put(`${API_URL}api/v1/class_groups/${id}`, class_group, { headers: authHeader() }),
  getClassGroup: (class_groupId: number) => axios.get(`${API_URL}api/v1/class_groups/${class_groupId}`, { headers: authHeader() }),
  getClassGroupList: (params: ClassGroupParams) => axios.get(`${API_URL}api/v1/class_groups/program_subjects/lessons/class_group_list?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&paginate=false`, { headers: authHeader() }),  
  getStudentClassGroup: (params: any) => axios.get(`${API_URL}api/v1/schools/class_groups/student_class_group?${queryStringFormatter(params)}`, { headers: authHeader() }),
  getStaffClassGroups: (params: any) => axios.get(`${API_URL}api/v1/class_groups/program_subjects/lessons/staff_class_group_list?${queryStringFormatter(params)}`, { headers: authHeader() }),
};

export default ClassGroupService;

