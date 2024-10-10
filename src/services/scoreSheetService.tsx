/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../utility/authHeader';
import { QueryParams } from '../models/queryParams';
import { ScoreSheet } from '../models/scoreSheet';
import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ScoreSheetService = {
  getStudentScoreSheets: (params: any) => axios.get(`${API_URL}api/v1/schools/student/score_sheets/student_core_sheet?${queryStringFormatter(params)}`, { headers: authHeader() }), 
  getScoreSheets: (params: QueryParams) => axios.get(`${API_URL}api/v1/score_sheets?${queryStringFormatter(params)}`, { headers: authHeader() }),
  addScoreSheet: (scoreSheet: any) => axios.post(`${API_URL}api/v1/score_sheets`, scoreSheet, { headers: authHeader() }),
  deleteScoreSheet: (scoreSheet: ScoreSheet) => axios.delete(`${API_URL}api/v1/score_sheets/${scoreSheet.id}`, { headers: authHeader() }),
  updateScoreSheet: (scoreSheet: ScoreSheet) => axios.put(`${API_URL}api/v1/score_sheets/${scoreSheet.id}`, scoreSheet, { headers: authHeader() }),
  getScoreSheet: (id: number) => axios.get(`${API_URL}api/v1/score_sheets/${id}`, { headers: authHeader() }),
  getTerminalReport: (params: QueryParams) => axios.get(`${API_URL}api/v1/score_sheets/summary/students/evaluation/report/terminal_report?${queryStringFormatter(params)}`, { headers: authHeader() }),  
  getStudentTerminalReport: (params: QueryParams) => axios.get(`${API_URL}api/v1/schools/student/terminal_report/student_terminal_report?${queryStringFormatter(params)}`, { headers: authHeader() }),  
};
export default ScoreSheetService;

