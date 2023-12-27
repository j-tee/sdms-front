/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const RoleService = {
    addUserToRole: (params: QueryParams) => axios.post(`${API_URL}api/v1/roles/schools/new_role/add_user_to_role?`,params, { headers: authHeader() }),
};
export default RoleService;

