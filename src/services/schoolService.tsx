import axios from "axios";
import authHeader from "../utility/authHeader";
import { SchoolParams } from "../models/school";
import { Branch, BranchParams } from '../models/branch';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const SchoolService = {
  getSchools: (params: SchoolParams) => {
    const queryParams = `level_id=${params.level_id}&` +
      `category_id=${params.category_id}&` +
      `ownership_category_id=${params.ownership_category_id}&` +
      `religious_affiliation_id=${params.religious_affiliation_id}&` +
      `user_id=${params.user_id}&` +
      `parent_id=${params.parent_id}&` +
      `student_id=${params.student_id}&` +
      `per_page=${params.pagination.per_page}&` +
      `page=${params.pagination.current_page}`;
    return axios.get(`${API_URL}api/v1/schools?${queryParams}`, { headers: authHeader() })
  },

  addBranch: (branch: Branch) => axios.post(`${API_URL}api/v1/schools/${branch.school_id}/circuits/${branch.circuit_id}/branches`, branch, { headers: authHeader() }),

  getBranches: (params: BranchParams) => {
    const queryParams = `level_id=${params.level_id}&` +
      `category_id=${params.category_id}&` +
      `ownership_category_id=${params.ownership_category_id}&` +
      `religious_affiliation_id=${params.religious_affiliation_id}&` +
      `region_id=${params.region_id}&` +
      `district_id=${params.district_id}&` +
      `circuit_id=${params.circuit_id}&` +
      `user_id=${params.user_id}&` +
      `parent_id=${params.parent_id}&` +
      `student_id=${params.student_id}&` +
      `per_page=${params.pagination.per_page}&` +
      `page=${params.pagination.current_page}`;

    return axios.get(`${API_URL}api/v1/schools/${params.school_id}d/circuits/${params.circuit_id}/branches?${queryParams}`, { headers: authHeader() });
  },

  addSchool: (school: FormData) => {
    return axios.post(`${API_URL}api/v1/schools`, school, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...authHeader(),
      },
    });
  },
  getSchool: (school_id: number) => axios.get(`${API_URL}api/v1/schools/${school_id}`, { headers: authHeader() }),
  getCategories: () => axios.get(`${API_URL}api/v1/schools/:school_id/categories`, { headers: authHeader() }),
  getOwnershipCategories: () => axios.get(`${API_URL}api/v1/schools/:school_id/ownership_categories`, { headers: authHeader() }),
  getLevels: () => axios.get(`${API_URL}api/v1/schools/:school_id/levels`, { headers: authHeader() }),
  getReligiousAffiliation: () => axios.get(`${API_URL}api/v1/schools/:school_id/religious_affiliations`, { headers: authHeader() }),
  updateSchool: (school: FormData) => axios.put(`${API_URL}api/v1/schools/${school.get('school[id]')}`, school, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...authHeader(),
    },
  }),
  updateBranch: (branch: Branch) => axios.put(`${API_URL}api/v1/schools/${branch.school_id}/circuits/${branch.circuit_id}/branches/${branch.id}`, branch, { headers: authHeader() }), 
  deleteBranch: (branch: Branch) => axios.delete(`${API_URL}api/v1/schools/${branch.school_id}/circuits/${branch.circuit_id}/branches/${branch.id}`, { headers: authHeader() }), 
};

export default SchoolService;
