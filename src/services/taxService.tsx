/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Tax } from '../models/tax';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const TaxService = {
  getTaxes: () => axios.get(`${API_URL}api/v1/taxes`, { headers: authHeader() }),
  addTax: (tax: Tax) => axios.post(`${API_URL}api/v1/taxes`, tax, { headers: authHeader() }),
  deleteTax: (tax: Tax) => axios.delete(`${API_URL}api/v1/taxes/${tax.id}`, { headers: authHeader() }),
  updateTax: (tax: Tax, id: number) => axios.put(`${API_URL}api/v1/taxes/${id}`, tax, { headers: authHeader() }),
  getTax: (id: number) => axios.get(`${API_URL}api/v1/taxes/${id}`, { headers: authHeader() }),
};
export default TaxService;

