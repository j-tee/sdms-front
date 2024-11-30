import axios from "axios";
import authHeader from "../utility/authHeader";
import { SchoolParams } from "../models/school";
import { Branch, BranchParams } from '../models/branch';
import queryStringFormatter from "../utility/queryStringFormatter";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const SchoolService = {
  getSchools: (params: SchoolParams) => axios.get(`${API_URL}api/v1/schools?${queryStringFormatter(params)}`, { headers: authHeader() }),

  addBranch: (branch: Branch) => axios.post(`${API_URL}api/v1/schools/${branch.school_id}/circuits/${branch.circuit_id}/branches`, branch, { headers: authHeader() }),

  getBranches: (params: BranchParams) => axios.get(`${API_URL}api/v1/schools/${params.school_id}/circuits/${params.circuit_id}/branches?${queryStringFormatter(params)}`, { headers: authHeader() }),

  addSchool: (school: FormData) => {
    return axios.post(`${API_URL}api/v1/schools`, school, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...authHeader(),
      },
    });
  },
  getStudentBranches: (params: any) => axios.get(`${API_URL}api/v1/branches/parents/students/student_branches?${queryStringFormatter(params)}`, { headers: authHeader() }),  
  getStudentSchools: (params: any) => axios.get(`${API_URL}api/v1/schools/parents/my_wards/Student_schools?${queryStringFormatter(params)}`, { headers: authHeader() }),
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
