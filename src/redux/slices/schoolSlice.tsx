import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SchoolState } from '../../models/school';
import SchoolService from '../../services/schoolService';


const initialState: SchoolState = {
  schools: [],
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

// export const getListOfFarms = createAsyncThunk(
//   'school/getListOfFarms',
//   async (user_id: number, thunkAPI) => {
//     try {
//       const response = await FarmService.getListOfFarms(user_id);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );
// export const getFarms = createAsyncThunk(
//   'school/getFarms',
//   async (params: any, thunkAPI) => {
//     try {
//       const response = await FarmService.getFarms(params.id, params.page, params.perPage);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );

// export const getFarm = createAsyncThunk(
//   'school/getFarm',
//   async (farm_id: number, thunkAPI) => {
//     try {
//       const response = await FarmService.getFarm(farm_id);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );


// export const addConsultant = createAsyncThunk(
//   'school/addConsultant',
//   async (params: any, thunkAPI) => {
//     try {
//       const response = FarmService.addConsultant(params);
//       return (await response).data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );

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

// export const updateFarm = createAsyncThunk(
//   'school/updateFarm',
//   async (params: any, thunkAPI) => {
//     try {
//       const response = FarmService.updateFarm(params.school, params.id);
//       return (await response).data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );

// export const deleteFarm = createAsyncThunk(
//   'school/deleteFarm',
//   async (id: number, thunkAPI) => {
//     try {
//       const response = FarmService.deleteFarm(id);
//       return (await response).data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );

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
    // builder
    //   .addCase(getListOfFarms.fulfilled, (state, action) => {
    //     const farmsData = action.payload.schools.data || []; // Extract schools data from payload
    //     const farmsFormatted = farmsData.map((school: any) => ({
    //       id: school.id,
    //       farm_name: school.attributes.farm_name,
    //       date_commenced: school.attributes.date_commenced,
    //       phone1: school.attributes.phone1,
    //       phone2: school.attributes.phone2,
    //       address: school.attributes.address,
    //       country: school.attributes.country,
    //       user_id: school.attributes.user_id,
    //       consultant_id: school.attributes.consultant_id,
    //       email: school.attributes.email
    //       // Add other attributes as needed
    //     }));
    //     return { ...state, schools: farmsFormatted, isLoading: false };
    //   });
    // builder
    //   .addCase(getListOfFarms.pending, (state) => ({ ...state, isLoading: true }));
    // builder
    //   .addCase(getListOfFarms.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
    // builder
    //   .addCase(getFarm.fulfilled, (state, action) => {
    //     const farmData = action.payload.school.data || []; // Extract schools data from payload
    //     const farmFormatted: any = {
    //       id: farmData.id,
    //       farm_name: farmData.attributes.farm_name,
    //       date_commenced: farmData.attributes.date_commenced,
    //       phone1: farmData.attributes.phone1,
    //       phone2: farmData.attributes.phone2,
    //       address: farmData.attributes.address,
    //       country: farmData.attributes.country,
    //       user_id: farmData.attributes.user_id,
    //       consultant_id: farmData.attributes.consultant_id,
    //       email: farmData.attributes.email
    //       // Add other attributes as needed
    //     };
    //     return { ...state, schools: farmFormatted, pagination: action.payload.pagination, isLoading: false };
    //   });
    // builder
    //   .addCase(getFarm.pending, (state) => ({ ...state, isLoading: true }));
    // builder
    //   .addCase(getFarm.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
    // builder
    //   .addCase(getFarms.fulfilled, (state, action) => {
    //     const farmsData = action.payload.schools.data || []; // Extract schools data from payload
    //     const farmsFormatted = farmsData.map((school: any) => ({
    //       id: school.id,
    //       farm_name: school.attributes.farm_name,
    //       country: school.attributes.country,
    //       branches: school.attributes.total_branches,
    //       date_commenced: school.attributes.date_commenced,
    //       phone1: school.attributes.phone1,
    //       phone2: school.attributes.phone2,
    //       address: school.attributes.address,
    //       user_id: school.attributes.user_id,
    //       consultant_id: school.attributes.consultant_id,
    //       email: school.attributes.email
    //       // Add other attributes as needed
    //     }));
    //     return { ...state, schools: farmsFormatted, pagination: action.payload.pagination, isLoading: false };
    //   });
    // builder
    //   .addCase(getFarms.pending, (state) => ({ ...state, isLoading: true }));
    // builder
    //   .addCase(getFarms.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));

    // builder
    //   .addCase(addConsultant.fulfilled, (state, action) => ({ ...state, message: action.payload.message, isLoading: false }));
    // builder
    //   .addCase(addConsultant.pending, (state) => ({ ...state, isLoading: true }));
    // builder
    //   .addCase(addConsultant.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
    // builder
    //   .addCase(updateFarm.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    // builder
    //   .addCase(updateFarm.pending, (state) => ({ ...state, isLoading: true }));
    // builder
    //   .addCase(updateFarm.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
    // builder
    //   .addCase(deleteFarm.fulfilled, (state, action) => ({ ...state, message: action.payload, isLoading: false }));
    // builder
    //   .addCase(deleteFarm.pending, (state) => ({ ...state, isLoading: true }));
    // builder
    //   .addCase(deleteFarm.rejected, (state, action) => ({ ...state, message: "Action Failed", isLoading: false }));
  },
});

export default schoolSlice.reducer;
