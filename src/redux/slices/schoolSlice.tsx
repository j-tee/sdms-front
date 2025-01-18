import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SchoolState } from '../../models/school';
import SchoolService from '../../services/schoolService';
import { Branch } from '../../models/branch';


const initialState: SchoolState = {
  categoriesLoaded: false,
  levelsLoaded: false,
  ownershipCategoriesLoaded: false,
  religionsLoaded: false,
  branches: [],
  schools: [],
  levels: [],
  religions: [],
  categories: [],
  ownershipCategories: [],
  status: '',
  message: '',
  branch: {
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
  schoolViewModel: {
    id: 0,
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
    number_of_branches: 0
  },
  school: {
    level_id: 0,
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

export const getStudentSchools = createAsyncThunk(
  'school/getStudentSchools',
  async (params: any, thunkAPI) => {
    try {
      const response = await SchoolService.getStudentSchools(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)
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

export const updateSchool = createAsyncThunk(
  'school/updateSchool',
  async (school: FormData, thunkAPI) => {
    try {
      const response = SchoolService.updateSchool(school);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateBranch = createAsyncThunk(
  'school/updateBranch',
  async (branch: Branch, thunkAPI) => {
    try {
      const response = SchoolService.updateBranch(branch);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteBranch = createAsyncThunk(
  'school/deleteBranch',
  async (branch: Branch, thunkAPI) => {
    try {
      const response = SchoolService.deleteBranch(branch);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getStudentBranches = createAsyncThunk(
  'school/getStudentBranches',
  async (params: any, thunkAPI) => {
    try {
      const response = SchoolService.getStudentBranches(params);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const getSchoolList = createAsyncThunk(
  'school/getSchoolList',
  async (params:any, thunkAPI) => {
    try {
      const response = SchoolService.getSchoolList(params);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const addOwnershipCategory = createAsyncThunk(
  'school/addOwnershipCategory',
  async (category: any, thunkAPI) => {
    try {
      const response = SchoolService.addOwnershipCategory(category);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const updateOwnershipCategory = createAsyncThunk(
  'school/updateOwnershipCategory',
  async (category: any, thunkAPI) => {
    try {
      const response = SchoolService.updateOwnershipCategory(category);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const deleteOwnershipCategory = createAsyncThunk(
  'school/deleteOwnershipCategory',
  async (category: any, thunkAPI) => {
    try {
      const response = SchoolService.deleteOwnershipCategory(category);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const addCategory = createAsyncThunk(
  'school/addCategory',
  async (category: any, thunkAPI) => {
    try {
      const response = SchoolService.addCategory(category);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
)

export const updateCategory = createAsyncThunk(
  'school/updateCategory',
  async (category: any, thunkAPI) => {
    try {
      const response = SchoolService.updateCategory(category);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
) 

export const deleteCategory = createAsyncThunk(
  'school/deleteCategory',
  async (id: any, thunkAPI) => {
    try {
      const response = SchoolService.deleteCategory(id);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
) 

export const addLevel = createAsyncThunk(
  'school/addLevel',
  async (level: any, thunkAPI) => {
    try {
      const response = SchoolService.addLevel(level);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
) 

export const updateLevel = createAsyncThunk(
  'school/updateLevel',
  async (level: any, thunkAPI) => {
    try {
      const response = SchoolService.updateLevel(level);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
) 

export const deleteLevel = createAsyncThunk(
  'school/deleteLevel',
  async (id: any, thunkAPI) => {
    try {
      const response = SchoolService.deleteLevel(id);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
) 

export const addReligiousAffiliation = createAsyncThunk(
  'school/addReligiousAffiliation',
  async (affiliation: any, thunkAPI) => {
    try {
      const response = SchoolService.addReligiousAffiliation(affiliation);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
) 

export const updateReligiousAffiliation = createAsyncThunk(
  'school/updateReligiousAffiliation',
  async (affiliation: any, thunkAPI) => {
    try {
      const response = SchoolService.updateReligiousAffiliation(affiliation);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
) 

export const deleteReligiousAffiliation = createAsyncThunk(
  'school/deleteReligiousAffiliation',
  async (id: any, thunkAPI) => {
    try {
      const response = SchoolService.deleteReligiousAffiliation(id);
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
) 

export const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addReligiousAffiliation.fulfilled, (state, action) => ({
      ...state,
      religions: action.payload, isLoading: false
    }));
    builder.addCase(addReligiousAffiliation.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(addReligiousAffiliation.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));
    builder
    .addCase(updateReligiousAffiliation.fulfilled, (state, action) => ({
      ...state,
      religions: action.payload, isLoading: false
    }));
    builder.addCase(updateReligiousAffiliation.pending, (state) => ({ ...state, isLoading: true }));  
    builder.addCase(updateReligiousAffiliation.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));  
    builder.addCase(deleteReligiousAffiliation.fulfilled, (state, action) => ({
      ...state,
      religions: action.payload, isLoading: false
    }));
    builder.addCase(deleteReligiousAffiliation.pending, (state) => ({ ...state, isLoading: true }));  
    builder.addCase(deleteReligiousAffiliation.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));  
    builder.addCase(addLevel.fulfilled, (state, action) => ({
      ...state,
      levels: action.payload, isLoading: false
    }));
    builder.addCase(addLevel.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(addLevel.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));  
    builder.addCase(updateLevel.fulfilled, (state, action) => ({
      ...state,
      levels: action.payload, isLoading: false
    }));
    builder.addCase(updateLevel.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateLevel.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));  
    builder.addCase(deleteLevel.fulfilled, (state, action) => ({
      ...state,
      levels: action.payload, isLoading: false
    }));
    builder.addCase(deleteLevel.pending, (state) => ({ ...state, isLoading: true })); 
    builder.addCase(deleteLevel.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));  
    builder.addCase(addCategory.fulfilled, (state, action) => ({
      ...state,
      categories: action.payload, isLoading: false
    }));
    builder.addCase(addCategory.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(addCategory.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));
    builder.addCase(updateCategory.fulfilled, (state, action) => ({
      ...state,
      categories: action.payload, isLoading: false
    }));
    builder.addCase(updateCategory.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateCategory.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));
    builder.addCase(deleteCategory.fulfilled, (state, action) => ({
      ...state,
      categories: action.payload, isLoading: false
    }));
    builder.addCase(deleteCategory.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(deleteCategory.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));
    builder.addCase(addOwnershipCategory.fulfilled, (state, action) => ({
      ...state,
      ownershipCategories: action.payload, isLoading: false
    }));
    builder.addCase(addOwnershipCategory.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(addOwnershipCategory.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));  

    builder.addCase(deleteOwnershipCategory.fulfilled, (state, action) => ({
      ...state,
      ownershipCategories: action.payload, isLoading: false
    }));
    builder.addCase(deleteOwnershipCategory.pending, (state) => ({ ...state, isLoading: true })); 
    builder.addCase(deleteOwnershipCategory.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));

    builder.addCase(updateOwnershipCategory.fulfilled, (state, action) => ({
      ...state,
      ownershipCategories: action.payload, isLoading: false
    }));
    builder.addCase(updateOwnershipCategory.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateOwnershipCategory.rejected, (state, action:PayloadAction<any>) => ({
      ...state, message: action.payload.message, isLoading: false
    }));
    builder
      .addCase(getSchoolList.fulfilled, (state, action) => ({
        ...state,
        schools: action.payload.schools, isLoading: false,
        message: action.payload.message,
      }));
      builder.addCase(getSchoolList.pending, (state) => ({ ...state, isLoading: true }));
      builder.addCase(getSchoolList.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, isLoading: false
      }));

    builder
      .addCase(getStudentBranches.fulfilled, (state, action) => ({
        ...state,
        branches: action.payload.branches, isLoading: false
      }));
      builder.addCase(getStudentBranches.pending, (state) => ({ ...state, isLoading: true }));
      builder.addCase(getStudentBranches.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, isLoading: false
      }));
    builder
      .addCase(getStudentSchools.fulfilled, (state, action) => ({
        ...state,
        schools: action.payload.schools, isLoading: false,
        pagination: action.payload.pagination,
        message: action.payload.message,
      }));
      builder.addCase(getStudentSchools.pending, (state) => ({ ...state, isLoading: true }));
      builder.addCase(getStudentSchools.rejected, (state, action:PayloadAction<any>) => ({
        ...state, message: action.payload.message, 
        isLoading: false
      }));
    builder
      .addCase(deleteBranch.fulfilled, (state, action) => ({
        ...state,
        branch: action.payload.branch, isLoading: false
      }));
    builder.addCase(deleteBranch.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(deleteBranch.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
    builder
      .addCase(updateBranch.fulfilled, (state, action) => ({
        ...state,
        branch: action.payload.branch, isLoading: false
      }));
    builder.addCase(updateBranch.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateBranch.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
    builder
      .addCase(updateSchool.fulfilled, (state, action) => ({
        ...state,
        school: action.payload, isLoading: false
      }));
    builder.addCase(updateSchool.pending, (state) => ({ ...state, isLoading: true }));
    builder.addCase(updateSchool.rejected, (state, action: PayloadAction<any>) => ({ 
      ...state, 
      message: action.payload.message, isLoading: false }));
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
        school: action.payload, isLoading: false,
        message: action.payload.message
      }));
    builder
      .addCase(registerSchool.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(registerSchool.rejected, (state,  action:PayloadAction<any>) => ({ ...state, 
        message: action.payload.message, isLoading: false }));
    builder
      .addCase(getSchools.fulfilled, (state, action) => ({ ...state, 
        schools: action.payload.schools, 
        pagination:action.payload.pagination, 
        isLoading: false }));
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
        ...state, levels: action.payload, isLoading: false,
        levelsLoaded: true
      }));
    builder
      .addCase(getOwnershipCategories.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getOwnershipCategories.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(getOwnershipCategories.fulfilled, (state, action) => ({
        ...state, ownershipCategories: action.payload, isLoading: false,
        ownershipCategoriesLoaded: true
      }));
    builder
      .addCase(getReligiousAffiliation.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getReligiousAffiliation.rejected, (state, action) => ({
        ...state, message: "Action Failed", isLoading: false
      }));
    builder
      .addCase(getReligiousAffiliation.fulfilled, (state, action) => ({
        ...state, religions: action.payload.religions, isLoading: false,
        religionsLoaded: true
      }));
    builder
      .addCase(getCategories.pending, (state) => ({ ...state, isLoading: true }));
    builder
      .addCase(getCategories.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));

    builder
      .addCase(getCategories.fulfilled, (state, action) => ({ 
        ...state, categories: action.payload.categories, 
        categoriesLoaded: true,
        isLoading: false }));

  },
});

export default schoolSlice.reducer;
