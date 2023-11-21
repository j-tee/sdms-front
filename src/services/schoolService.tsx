import axios from "axios";
import authHeader from "../utility/authHeader";
import { SchoolParams } from "../models/school";

const API_URL = process.env.REACT_APP_API_BASE_URL;

const SchoolService = {
  addBranch: (school_id: number) => axios.post(`${API_URL}`),
  getSchools:(params:SchoolParams) =>{
    const queryParams = `
    category=${params.category}
    &ownership_category=${params.ownership_category}
    &religious_affiliation=${params.religious_affiliation}
    &region_id=${params.region_id}
    &district_id=${params.district_id}
    &circuit_id=${params.circuit_id}
    &user_id=${params.user_id}
    &parent_id=${params.parent_id}
    &student_id=${params.student_id}
    &per_page=${params.pagination.per_page}
    &page=${params.pagination.current_page}
    `
    return axios.get(`${API_URL}api/v1/schools?${queryParams}`,)
  },
    addSchool: (school: FormData) => {
        return axios.post(`${API_URL}api/v1/schools`, school, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...authHeader(),
          },
        });
      },
    getCategories: () => axios.get(`${API_URL}api/v1/schools/:school_id/categories`, {headers: authHeader()}),
    getOwnershipCategories: () => axios.get(`${API_URL}api/v1/schools/:school_id/ownership_categories`, {headers: authHeader()}),
    getLevels: () => axios.get(`${API_URL}api/v1/schools/:school_id/levels`, {headers: authHeader()}),
    getReligiousAffiliation: () => axios.get(`${API_URL}api/v1/schools/:school_id/religious_affiliations`, {headers: authHeader()})
};

export default SchoolService;
