import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ClassGroup, ClassGroupParams, ClassGroupState } from '../../models/classGroup';
import ClassGroupService from '../../services/classGroupService';

const initialState: ClassGroupState = {
  class_groups: [],
  status: '',
  message: '',
  class_group: {
    id: 0,
    class_name:'',
    branch_id: 0,
    dept_name: '',
    branch_name: '',
    stage_name:'',
    program_name:'',
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  },
};

export const addClassGroup = createAsyncThunk(
  'classGroup/addClassGroup',
  async (classGroup: ClassGroup, thunkAPI) => {
    try {
      const response = await ClassGroupService.addClassGroup(classGroup);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const getClassGroups = createAsyncThunk(
  'classGroup/getClassGroups',
  async (params: ClassGroupParams, thunkAPI) => {
    try {
      const response = await ClassGroupService.getClassGroups(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const classGroupSlice = createSlice({
  name: 'classGroup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClassGroups.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        classGroups: action.payload.class_groups, isLoading: false, message: action.payload.message, 
        status: action.payload.status
      }));
    builder
      .addCase(getClassGroups.pending, (state) => ({ ...state, isLoading: true}));
    builder
      .addCase(getClassGroups.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, status: action.payload.status, isLoading: false
      }));
    builder
      .addCase(addClassGroup.fulfilled, (state, action:PayloadAction<any>) => ({
        ...state,
        classGroup: action.payload.dept, isLoading: false, message: action.payload.message, status: action.payload.status
      }));
    builder
      .addCase(addClassGroup.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addClassGroup.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
  },
});

export default classGroupSlice.reducer;
