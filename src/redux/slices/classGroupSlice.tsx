import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ClassGroup, ClassGroupParams, ClassGroupState } from '../../models/classGroup';
import ClassGroupService from '../../services/classGroupService';

const initialState: ClassGroupState = {
  class_groups: [],
  class_group_list: [],
  status: '',
  message: '',
  class_group: {
    id: 0,
    class_name: '',
    branch_id: 0,
    dept_name: '',
    branch_name: '',
    stage_name: '',
    program_name: '',
    class_grp_name: ''
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

export const getClassGroupList = createAsyncThunk(
  'classGroup/getClassGroupList',
  async (params: any, thunkAPI) => {
    try {
      const response = await ClassGroupService.getClassGroupList(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateClassGroup = createAsyncThunk(
  'classGroup/updateClassGroup',
  async (classGroup: ClassGroup, thunkAPI) => {
    try {
      const response = await ClassGroupService.updateClassGroup(classGroup, classGroup.id || 0);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteClassGroup = createAsyncThunk(
  'classGroup/deleteClassGroup',
  async (classGroup: ClassGroup, thunkAPI) => {
    try {
      const response = await ClassGroupService.deleteClassGroup(classGroup.id!);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStudentClassGroup = createAsyncThunk(
  'classGroup/getStudentClassGroup',
  async (params: any, thunkAPI) => {
    try {
      const response = await ClassGroupService.getStudentClassGroup(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const getStaffClassGroups = createAsyncThunk(
  'classGroup/getStaffClassGroups',
  async (params: any, thunkAPI) => {
    try {
      const response = await ClassGroupService.getStaffClassGroups(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const getStudentClassGroups = createAsyncThunk(
  'classGroup/getStudentClassGroups',
  async (params: any, thunkAPI) => {
    try {
      const response = await ClassGroupService.getStudentClassGroups(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)
export const classGroupSlice = createSlice({
  name: 'classGroup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentClassGroups.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      class_groups: action.payload.class_groups, isLoading: false, message: action.payload.message, 
      status: action.payload.status
    }));
    builder.addCase(getStudentClassGroups.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getStudentClassGroups.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder.addCase(getStaffClassGroups.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      class_group_list: action.payload.class_groups, isLoading: false, message: action.payload.message, 
      status: action.payload.status
    }))
    builder.addCase(getStaffClassGroups.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(getStaffClassGroups.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
    builder.addCase(deleteClassGroup.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      classGroup: action.payload.class_group, isLoading: false, message: action.payload.message, status: action.payload.status
    }));
    builder.addCase(deleteClassGroup.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(deleteClassGroup.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false }));
    builder.addCase(updateClassGroup.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      classGroup: action.payload.class_group, isLoading: false, 
      message: action.payload.message, status: action.payload.status
    }));
    builder.addCase(updateClassGroup.pending, (state) => ({ ...state, isLoading: true }));  
    builder.addCase(updateClassGroup.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false })); 
      
    builder.addCase(getClassGroupList.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      class_groups: action.payload.class_groups, isLoading: false, message: action.payload.message, 
      status: action.payload.status
    }));
    builder
      .addCase(getClassGroups.fulfilled, (state, action: PayloadAction<any>) => ({
        ...state,
        class_groups: action.payload.class_groups, isLoading: false, message: action.payload.message, 
        status: action.payload.status,
        pagination: action.payload.pagination
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
    builder
    .addCase(getStudentClassGroup.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      class_group: action.payload.class_group, isLoading: false, message: action.payload.message, 
      status: action.payload.status
    }));

    builder
    .addCase(getStudentClassGroup.pending, (state) => ({ ...state, isLoading: true}));
    builder
    .addCase(getStudentClassGroup.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, status: action.payload.status, isLoading: false
    }));
  },
});

export default classGroupSlice.reducer;
