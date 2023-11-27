/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CircuitService = {
    getCircuits: (params: any) => axios.get(`${API_URL}api/v1/regions/${params.region_id}/districts/${params.district_id}/circuits/?page=${params.page}&per_page=${params.perPage}`, { headers: authHeader() }),
    addCircuit: (department: any) => axios.post(`${API_URL}api/v1/regions/${department.region_id}/districts/${department.district_id}/circuits/${department.id}`, department, { headers: authHeader() }),
    deleteCircuit: (department: any) => axios.delete(`${API_URL}api/v1/regions/${department.region_id}/districts/${department.district_id}/circuits/${department.id}`, { headers: authHeader() }),
    updateCircuit: (department: any) => axios.put(`${API_URL}api/v1/regions/${department.region_id}/districts/${department.district_id}/circuits/${department.id}`, department, { headers: authHeader() }),
    getCircuit: (department: any) => axios.get(`${API_URL}api/v1/regions/${department.region_id}/districts/${department.district_id}/circuits/${department.id}`, { headers: authHeader() }),
};

export default CircuitService;

