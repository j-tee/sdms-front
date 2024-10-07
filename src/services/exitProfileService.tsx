import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';
import queryStringFormatter from '../utility/queryStringFormatter';
import { ExitProfile } from '../models/exitProfile';
const API_URL = process.env.REACT_APP_API_BASE_URL;

const ExitProfileService = {
    addExitProfile: (exitProfile: any) => axios.post(`${API_URL}api/v1/schools/exit_profiles/create`, exitProfile, { headers: authHeader() }),
    getExitProfiles: (params: QueryParams) => 
    axios.get(`${API_URL}api/v1/schools/exit_profiles/index?${queryStringFormatter(params)}`, { headers: authHeader() }),    
    getExitProfile: (exitProfileId: number) => axios.get(`${API_URL}api/v1/schools/exit_profiles/${exitProfileId}`, { headers: authHeader() }),
    updateExitProfile: (exitProfile: ExitProfile, id:number) => axios.put(`${API_URL}api/v1/schools/exit_profiles/${id}`, exitProfile, { headers: authHeader() }),   
    deleteExitProfile: (exitProfileId: number) => axios.delete(`${API_URL}api/v1/schools/exit_profiles/${exitProfileId}`, { headers: authHeader() }),    
};

export default ExitProfileService;