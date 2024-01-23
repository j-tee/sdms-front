/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Parent, ParentParams } from '../models/parent';
import queryStringFormatter from '../utility/queryStringFormatter';
import { QueryParams } from '../models/queryParams';


const API_URL = process.env.REACT_APP_API_BASE_URL;

const ParentService = {
  getMyWards: (params: QueryParams) => 
  axios.get(`${API_URL}api/v1/parents/subscriptions/students/my_wards?${queryStringFormatter(params)}`, { headers: authHeader() }),
  getParentByEmail:(email:string) => axios.get(`${API_URL}api/v1/parents/email/get_parent_by_email?email_address=${email}`, { headers: authHeader() }),
  getParents: (params: ParentParams) => 
  axios.get(`${API_URL}api/v1/parents?${queryStringFormatter(params)}`, { headers: authHeader() }),
  addParent: (parent: Parent) => axios.post(`${API_URL}api/v1/parents`, parent, { headers: authHeader() }),
  deleteParent: (parent: Parent, id:number) => axios.delete(`${API_URL}api/v1/parents/${id}`, { headers: authHeader() }),
  updateParent: (parent: Parent, id:number) => axios.put(`${API_URL}api/v1/parents/${id}`, parent, { headers: authHeader() }),
  getParent: (parentId: number) => axios.get(`${API_URL}api/v1/parents/${parentId}`, { headers: authHeader() }),
};

export default ParentService;

