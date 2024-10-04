import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';
import queryStringFormatter from '../utility/queryStringFormatter';
const API_URL = process.env.REACT_APP_API_BASE_URL;

const PaymentService = {
    addPayment: (payment: any) => axios.post(`${API_URL}api/v1/schools/fees/payments/create`, payment, { headers: authHeader() }),
    getPayments: (params: QueryParams) => 
    axios.get(`${API_URL}api/v1/schools/fees/payments/index?${queryStringFormatter(params)}`, { headers: authHeader() }),    
    getPaymentSummary: (params: QueryParams) => 
        axios.get(`${API_URL}api/v1/schools/fees/payments/payment_summary?${queryStringFormatter(params)}`, { headers: authHeader() }),    
        
    deletePayment: (paymentId: number) => axios.delete(`${API_URL}api/v1/payments/${paymentId}`, { headers: authHeader() }),    
    updatePayment: (payment: any, id:number) => axios.put(`${API_URL}api/v1/payments/${id}`, payment, { headers: authHeader() }),   
    getPayment: (paymentId: number) => axios.get(`${API_URL}api/v1/payments/${paymentId}`, { headers: authHeader() }),
  };
  
  export default PaymentService;