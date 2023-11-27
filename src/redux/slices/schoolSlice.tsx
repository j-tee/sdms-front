import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SchoolState } from '../../models/school';
import SchoolService from '../../services/schoolService';
import { Branch } from '../../models/branch';


const initialState: SchoolState = {
  branches:[],
  schools: [],
  levels: [],
  religions: [],
  categories: [],
  ownershipCategories: [],
  message: '',
  branch:{
    branch_name: '',
    postal_address: '',
    website: '',
    email_address: '',
    residential_address: '',
    phone1: '',
    phone2: '',
    school_id: 0,
    circuit_id: 0,
  },
  schoolViewModel:{
    id:0,
    level_id: 0,
    category_id: 0,
    religious_affiliation_id: 0,
    ownership_category_id: 0,
    school_name: '',
    religion: '',
    level_name: '',
    category_name: '',
    ownership: '',
    bg_image_url: '',
    crest_image_url: '',
  },
  school: {
    level_id:0,
    religious_affiliation_id: 0,
    school_name: '',
    category_id: 0,
    ownership_category_id: 0,
    crest_image: null,
    background_picture_image: null,
    // branches: []
  },
  isLoading: false,
  pagination: {
    current_page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0
  }
};

export const registerSchool = createAsyncThunk(
  'school/registerSchool',
  async (school: FormData, thunkAPI) => {
    try {
      const response = SchoolService.addSchool(school);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);


export const addBranch = createAsyncThunk(
  'school/addBranch',
  async (branch: Branch, thunkAPI) => {
    try {
      const response = SchoolService.addBranch(branch);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getSchools = createAsyncThunk(
  'school/getSchools',
  async (params: any, thunkAPI) => {
    try {
      const response = await SchoolService.getSchools(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const getBranches = createAsyncThunk(
  'school/getBranches',
  async (params: any, thunkAPI) => {
    try {
      const response = await SchoolService.getBranches(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const getLevels = createAsyncThunk(
  'school/getLevels',
  async (_, thunkAPI) => {
    try {
      const response = await SchoolService.getLevels();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getOwnershipCategories = createAsyncThunk(
  'school/getOwnershipCategories',
  async (_, thunkAPI) => {
    try {
      const response = await SchoolService.getOwnershipCategories();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCategories = createAsyncThunk(
  'school/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await SchoolService.getCategories();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const getReligiousAffiliation = createAsyncThunk(
  'school/getReligiousAffiliation',
  async (_, thunkAPI) => {
    try {
      const response = SchoolService.getReligiousAffiliation();
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBranches.fulfilled, (state, action) => ({ ...state, branches: action.payload.branches, isLoading: false }));
    builder
      .addCase(getBranches.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getBranches.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));

    builder
      .addCase(addBranch.fulfilled, (state, action) => ({
        ...state,
        branch: action.payload, isLoading: false
      }));
    builder
      .addCase(addBranch.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(addBranch.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
    builder
      .addCase(registerSchool.fulfilled, (state, action) => ({
        ...state,
        school: action.payload, isLoading: false
      }));
    builder
      .addCase(registerSchool.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(registerSchool.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
    builder
      .addCase(getSchools.fulfilled, (state, action) => ({ ...state, schools: action.payload.schools, isLoading: false }));
    builder
      .addCase(getSchools.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getSchools.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
      builder
      .addCase(getLevels.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getLevels.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(getLevels.fulfilled, (state, action) => ({
        ...state, levels: action.payload.levels, isLoading: false
      }));
    builder
      .addCase(getOwnershipCategories.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getOwnershipCategories.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(getOwnershipCategories.fulfilled, (state, action) => ({
        ...state, ownershipCategories: action.payload.ownership_categories, isLoading: false
      }));
    builder
      .addCase(getReligiousAffiliation.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getReligiousAffiliation.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(getReligiousAffiliation.fulfilled, (state, action) => ({
        ...state, religions: action.payload.religions, isLoading: false
      }));
    builder
      .addCase(getCategories.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getCategories.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));

    builder
      .addCase(getCategories.fulfilled, (state, action) => ({ ...state, categories: action.payload.categories, isLoading: false }));

  },
});

export default schoolSlice.reducer;
