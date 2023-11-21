/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CircuitService = {
    getCircuits: (params: any) => axios.get(`${API_URL}api/v1/regions/${params.region_id}/districts/${params.district_id}/circuits/${params.id}?page=${params.page}&per_page=${params.perPage}`, { headers: authHeader() }),
    addCircuit: (circuit: any) => axios.post(`${API_URL}api/v1/regions/${circuit.region_id}/districts/${circuit.district_id}/circuits/${circuit.id}`, circuit, { headers: authHeader() }),
    deleteCircuit: (circuit: any) => axios.delete(`${API_URL}api/v1/regions/${circuit.region_id}/districts/${circuit.district_id}/circuits/${circuit.id}`, { headers: authHeader() }),
    updateCircuit: (circuit: any) => axios.put(`${API_URL}api/v1/regions/${circuit.region_id}/districts/${circuit.district_id}/circuits/${circuit.id}`, circuit, { headers: authHeader() }),
    getCircuit: (circuit: any) => axios.get(`${API_URL}api/v1/regions/${circuit.region_id}/districts/${circuit.district_id}/circuits/${circuit.id}`, { headers: authHeader() }),
};

export default CircuitService;

