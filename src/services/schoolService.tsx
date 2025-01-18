import axios from "axios";
import authHeader from "../utility/authHeader";
import { SchoolParams } from "../models/school";
import { Branch, BranchParams } from '../models/branch';
import queryStringFormatter from "../utility/queryStringFormatter";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const SchoolService = {
  addCategory: (category: any) => axios.post(`${API_URL}api/v1/categories`, category, { headers: authHeader() }),
  updateCategory: (category: any) => axios.put(`${API_URL}api/v1/categories/${category.id}`, category, { headers: authHeader() }),  
  deleteCategory: (id: any) => axios.delete(`${API_URL}api/v1/categories/${id}`, { headers: authHeader() }),
  addOwnershipCategory: (category: any) => axios.post(`${API_URL}api/v1/ownership_categories`, category, { headers: authHeader() }),  
  updateOwnershipCategory: (category: any) => axios.put(`${API_URL}api/v1/ownership_categories/${category.id}`, category, { headers: authHeader() }), 
  deleteOwnershipCategory: (id: Number) => axios.delete(`${API_URL}api/v1/ownership_categories/${id}`, { headers: authHeader() }),  
  addLevel: (level: any) => axios.post(`${API_URL}api/v1/levels`, level, { headers: authHeader() }),  
  updateLevel: (level: any) => axios.put(`${API_URL}api/v1/levels/${level.id}`, level, { headers: authHeader() }),  
  deleteLevel: (id: any) => axios.delete(`${API_URL}api/v1/levels/${id}`, { headers: authHeader() }),  
  addReligiousAffiliation: (affiliation: any) => axios.post(`${API_URL}api/v1/religious_affiliations`, affiliation, { headers: authHeader() }), 
  updateReligiousAffiliation: (affiliation: any) => axios.put(`${API_URL}api/v1/religious_affiliations/${affiliation.id}`, affiliation, { headers: authHeader() }),                                                             
  deleteReligiousAffiliation: (id: any) => axios.delete(`${API_URL}api/v1/religious_affiliations/${id}`, { headers: authHeader() }),                                                                                                                                                                                                                                                                                                                          
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
  getSchoolList: (params: any) => axios.get(`${API_URL}api/v1/schools/subscriptions/school_subscriptions/schools_list?${queryStringFormatter(params)}`, { headers: authHeader() }),
  getStudentBranches: (params: any) => axios.get(`${API_URL}api/v1/branches/parents/students/student_branches?${queryStringFormatter(params)}`, { headers: authHeader() }),  
  getStudentSchools: (params: any) => axios.get(`${API_URL}api/v1/schools/parents/my_wards/Student_schools?${queryStringFormatter(params)}`, { headers: authHeader() }),
  getSchool: (school_id: number) => axios.get(`${API_URL}api/v1/schools/${school_id}`, { headers: authHeader() }),
  getCategories: () => axios.get(`${API_URL}api/v1/schools/:school_id/categories`, { headers: authHeader() }),
  getOwnershipCategories: () => axios.get(`${API_URL}api/v1/ownership_categories`, { headers: authHeader() }),
  getLevels: () => axios.get(`${API_URL}api/v1/levels`, { headers: authHeader() }),
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
