/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { Region } from '../models/region';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const RegionService = {
    getRegions: (params: any) => axios.get(`${API_URL}api/v1/regions?page=${params.page}&per_page=${params.perPage}`, { headers: authHeader() }),
    addRegion: (region: Region) => axios.post(`${API_URL}api/v1/regions`, region, { headers: authHeader() }),
    deleteRegion: (region: Region) => axios.delete(`${API_URL}api/v1/regions/${region.id}`, { headers: authHeader() }),
    updateRegion: (region: Region) => axios.put(`${API_URL}api/v1/regions/`, region, { headers: authHeader() }),
    getRegion: (region: Region) => axios.get(`${API_URL}api/v1/regions/${region.id}`, { headers: authHeader() }),
};

export default RegionService;

