/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StaffService = {
  getStaffs: (params: QueryParams) => axios.get(`${API_URL}api/v1/roles/schools/roles/add_user_to_role?branch_id=${params.branch_id}&school_id=${params.school_id}&email=${params.email}`, { headers: authHeader() }),
};
export default StaffService;

