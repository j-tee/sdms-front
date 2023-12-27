import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RoleState } from "../../models/role";
import RoleService from "../../services/roleService";

const initialState: RoleState = {
  roles: [],
  status: '',
  message: '',
  isLoading: false,
}

export const addUserToRole = createAsyncThunk(
  'role/addUserToRole',
  async (params: any, thunkAPI) => {
    try {
      const response = await RoleService.addUserToRole(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserToRole.fulfilled, (state, action) => ({
        ...state,
        roles: action.payload.roles, isLoading: false
      }));
    builder
      .addCase(addUserToRole.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addUserToRole.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
  },
});

export default roleSlice.reducer;