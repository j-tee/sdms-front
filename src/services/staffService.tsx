/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Staff, StaffParams, StaffViewModel } from '../models/staff';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StaffService = {
  getStaffs: (params: StaffParams) => axios.get(`${API_URL}api/v1/staffs?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}&paginate=${params.paginate}`, { headers: authHeader() }),
  addStaff: (staff: FormData) => axios.post(`${API_URL}api/v1/staffs`, staff, { headers: authHeader() }),
  deleteStaff: (staff: StaffViewModel) => axios.delete(`${API_URL}api/v1/staffs/${staff.id}`, { headers: authHeader() }),
  updateStaff: (staff: Staff, id: number) => axios.put(`${API_URL}api/v1/staffs/${id}`, staff, { headers: authHeader() }),
  getStaff: (id: number) => axios.get(`${API_URL}api/v1/staffs/${id}`, { headers: authHeader() }),
};
export default StaffService;

