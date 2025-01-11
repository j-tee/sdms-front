/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CircuitService = {
    getCircuits: (params: any) => axios.get(`${API_URL}api/v1/regions/${params.region_id}/districts/${params.district_id}/circuits/?current_page=${params.current_page}&per_page=${params.per_page}&paginate=${params.paginate}`, { headers: authHeader() }),
    addCircuit: (circuit: any) => axios.post(`${API_URL}api/v1/regions/${circuit.region_id}/districts/${circuit.district_id}/circuits`, circuit, { headers: authHeader() }),
    deleteCircuit: (circuit: any) => axios.delete(`${API_URL}api/v1/regions/${circuit.region_id}/districts/${circuit.district_id}/circuits/${circuit.id}`, { headers: authHeader() }),
    updateCircuit: (circuit: any) => axios.put(`${API_URL}api/v1/regions/${circuit.circuit.region_id}/districts/${circuit.circuit.district_id}/circuits/${circuit.circuit.id}`, circuit, { headers: authHeader() }),
    getCircuit: (circuit: any) => axios.get(`${API_URL}api/v1/regions/${circuit.region_id}/districts/${circuit.district_id}/circuits/${circuit.id}`, { headers: authHeader() }),
};

export default CircuitService;

