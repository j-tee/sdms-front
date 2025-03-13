/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';
import queryStringFormatter from '../utility/queryStringFormatter';
import { Subscription, SubscriptionViewModel } from '../models/subscription';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const SubscriptionService = {
  getMakePayment: (params: any) => {
    const headers = {
      ...authHeader(),
      'token': params.token.access_token,
    };

    return axios.post(`${API_URL}api/v1/subscriptions/payments/student/keys/momo_api_key/momo_token/request_to_pay`, params, {
      headers: headers,
    });
  },
  initializeTransaction: (params: any) => axios.post(`${API_URL}api/v1/parents/subscriptions/initialize_transaction`, params, { headers: authHeader()}),  // eslint-disable-line max-len 
  getMomoToken: () => axios.get(`${API_URL}api/v1/subscriptions/payments/student/keys/momo_api_key/momo_token`, {headers: authHeader()}),
  requestToPay: (params: any) => axios.post(`${API_URL}api/v1/subscriptions/payments/student/keys/momo_api_key/momo_token/request_to_pay`, params, {headers: {...authHeader(), token:sessionStorage.getItem('momo_token')}}),  // eslint-disable-line max-len  
  getMomoApiKey: () => axios.get(`${API_URL}api/v1/subscriptions/payments/student/keys/momo_api_key`, { headers: authHeader() }),
  getSubscriptions: (params: QueryParams) => axios.get(`${API_URL}api/v1/subscriptions?${queryStringFormatter(params)}`, { headers: authHeader() }),
  addSubscription: (subscription: Subscription) => axios.post(`${API_URL}api/v1/subscriptions`, subscription, { headers: authHeader() }),
  deleteSubscription: (subscription: SubscriptionViewModel) => axios.delete(`${API_URL}api/v1/subscriptions/${subscription.id}`, { headers: authHeader() }),
  updateSubscription: (subscription: Subscription, id: number) => axios.put(`${API_URL}api/v1/subscriptions/${id}`, subscription, { headers: authHeader() }),
  getSubscription: (id: number) => axios.get(`${API_URL}api/v1/subscriptions/${id}`, { headers: authHeader() }),
  getStudentRecentSubscription: (params: QueryParams) => axios.get(`${API_URL}api/v1/schools/subscriptions/student_recent_subscription?${queryStringFormatter(params)}`, { headers: authHeader() }),  
};
export default SubscriptionService;

