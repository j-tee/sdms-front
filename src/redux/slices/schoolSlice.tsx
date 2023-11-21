import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SchoolState } from '../../models/school';
import SchoolService from '../../services/schoolService';


const initialState: SchoolState = {
  schools: [],
  levels: [],
  religions: [],
  categories: [],
  ownershipCategories: [],
  message: '',
  school: {
    religious_affiliation: '',
    school_name: '',
    category: '',
    ownership_category: '',
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
      .addCase(registerSchool.fulfilled, (state, action) => ({
        ...state,
        school: action.payload, isLoading: false
      }));
    builder
      .addCase(registerSchool.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(registerSchool.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
    builder
      .addCase(getSchools.fulfilled, (state, action) => {
        const schoolData = action.payload.schools.data || []; // Extract schools data from payload
        const schoolsFormatted = schoolData.map((school: any) => ({
          id: school.id,
          religious_affiliation: school.attributes.religious_affiliation,
          school_name: school.attributes.school_name,
          ownership_category: school.attributes.ownership_category,
          crest_image_url: school.attributes.crest_image_url,
          bg_image_url: school.attributes.bg_image_url,

        }));
        return { ...state, schools: schoolsFormatted, isLoading: false };
      });
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
