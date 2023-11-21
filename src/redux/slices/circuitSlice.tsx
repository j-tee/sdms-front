import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CircuitService from '../../services/circuitService';
import { Circuit, CircuitState } from '../../models/circuit';

const initialState: CircuitState = {
  circuits: [],
  message: '',
  circuit: {
    id: 0,
    name: '',
    district_id: 0,
    region_id: 0
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addCircuit = createAsyncThunk(
  'circuit/addCircuit',
  async (circuit: Circuit, thunkAPI) => {
    try {
      const response = await CircuitService.addCircuit(circuit);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCircuits = createAsyncThunk(
  'circuit/getCircuits',
  async (params, thunkAPI) => {
    try {
      const response = await CircuitService.getCircuits(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const circuitSlice = createSlice({
  name: 'circuit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCircuits.fulfilled, (state, action) => ({
        ...state,
        circuits: action.payload, isLoading: false
      }));
    builder
      .addCase(getCircuits.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getCircuits.rejected, (state, action) => ({ 
        ...state, message: "Action Failed", isLoading: false }));

    builder
      .addCase(addCircuit.fulfilled, (state, action) => ({
        ...state,
        circuit: action.payload, isLoading: false
      }));
    builder
      .addCase(addCircuit.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addCircuit.rejected, (state, action) => ({
         ...state, message: "Action Failed", isLoading: false }));

  },
});

export default circuitSlice.reducer;
