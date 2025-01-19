/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const RoleService = {
    getRoles: (params: any) => axios.get(`${API_URL}api/v1/roles/index?${queryStringFormatter(params)}`, { headers: authHeader(), params }),
    addUserToRole: (params: any) => axios.post(`${API_URL}api/v1/roles/schools/new_role/add_user_to_role?`,params, { headers: authHeader() }),
    removeUserFromRole: (params: any) => axios.get(`${API_URL}api/v1/roles/schools/new_role/remove_user_from_role?${queryStringFormatter(params)}`, { headers: authHeader(), params }), 
};
export default RoleService;

