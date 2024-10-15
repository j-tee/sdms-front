import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';
import queryStringFormatter from '../utility/queryStringFormatter';
const API_URL = process.env.REACT_APP_API_BASE_URL;

const BillsFeesService = {
    addFee: (fee: any) => axios.post(`${API_URL}api/v1/schools/fees/create`, fee, { headers: authHeader() }),
    getFees: (params: QueryParams) => 
    axios.get(`${API_URL}api/v1/schools/fees/index?${queryStringFormatter(params)}`, { headers: authHeader() }),    
    deleteFee: (feeId: number) => axios.delete(`${API_URL}api/v1/fees/${feeId}`, { headers: authHeader() }),    
    updateFee: (fee: any, id:number) => axios.put(`${API_URL}api/v1/fees/${id}`, fee, { headers: authHeader() }),   
    getFee: (feeId: number) => axios.get(`${API_URL}api/v1/fees/${feeId}`, { headers: authHeader() }),
    getStudentFees: (params: any) => axios.get(`${API_URL}api/v1/schools/student/fees/student_fees?${queryStringFormatter(params)}`, { headers: authHeader() }),
  };
  
  export default BillsFeesService;
  
