import axios from 'axios';
import { GradingScale } from '../models/gradingScale';
import queryStringFormatter from '../utility/queryStringFormatter';
import authHeader from '../utility/authHeader';


const API_URL = process.env.REACT_APP_API_BASE_URL;
const GradingScaleService = {
    getGradingScales: (params: any) => axios.get(`${API_URL}api/v1/grading_scales?${queryStringFormatter(params)}`,{headers:authHeader()}),
    getGradingScale: (id: number) => axios.get(`${API_URL}api/v1/grading_scales/${id}`,{headers:authHeader()}),
    addGradingScale: (gradingScale: GradingScale) => axios.post(`${API_URL}api/v1/grading_scales`,gradingScale,{headers:authHeader()}), 
    updateGradingScale: (gradingScale: GradingScale) => axios.put(`${API_URL}api/v1/grading_scales/${gradingScale.id}`,gradingScale,{headers:authHeader()}),    
    deleteGradingScale: (id: number) => axios.delete(`${API_URL}api/v1/grading_scales/${id}`,{headers:authHeader()}),
}
export default GradingScaleService;