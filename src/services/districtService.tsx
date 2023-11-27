/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const DistrictService = {
  getDistricts: (params: any) => axios.get(`${API_URL}api/v1/regions/${params.region_id}/districts?page=${params.page}&per_page=${params.perPage}`, { headers: authHeader() }),
  addDistrict: (district: any) => axios.post(`${API_URL}api/v1/regions/${district.region_id}/districts`, district, { headers: authHeader() }),
  deleteDistrict: (district: any) => axios.delete(`${API_URL}api/v1/regions/${district.region_id}/districts/${district.id}`, { headers: authHeader() }),
  updateDistrict: (district: any) => axios.put(`${API_URL}api/v1/regions/${district.region_id}/districts`, district, { headers: authHeader() }),
  getDistrict: (district: any) => axios.get(`${API_URL}api/v1/regions/${district.region_id}/districts/${district.id}`, { headers: authHeader() }),
};

export default DistrictService;

