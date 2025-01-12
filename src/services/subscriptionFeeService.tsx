/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';
import { SubscriptionFee } from '../models/subscriptionFee';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const SubscriptionFeeService = {
  getSubscriptionFees: () => axios.get(`${API_URL}api/v1/subscription_fees`, { headers: authHeader() }),
  addSubscriptionFee: (subscriptionFee: SubscriptionFee) => axios.post(`${API_URL}api/v1/subscription_fees`, subscriptionFee, { headers: authHeader() }),
  deleteSubscriptionFee: (subscriptionFee: SubscriptionFee) => axios.delete(`${API_URL}api/v1/subscription_fees/${subscriptionFee.id}`, { headers: authHeader() }),
  updateSubscriptionFee: (subscriptionFee: SubscriptionFee, id: number) => axios.put(`${API_URL}api/v1/subscription_fees/${id}`, subscriptionFee, { headers: authHeader() }),
  getSubscriptionFee: (id: number) => axios.get(`${API_URL}api/v1/subscription_fees/${id}`, { headers: authHeader() }),
};
export default SubscriptionFeeService;

