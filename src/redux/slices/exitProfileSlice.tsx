import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExitProfile, ExitProfileState } from "../../models/exitProfile";
import { PaginationParams } from "../../models/pagination";
import ExitProfileService from "../../services/exitProfileService";


const initialState: ExitProfileState = {
    exitProfiles: [],
    exitProfile: {} as ExitProfile,
    status: '',
    message: '',
    isLoading: true,
    pagination: {} as PaginationParams
}

export const addExitProfile = createAsyncThunk(
    'exitProfile/addExitProfile',
    async (exitProfile: ExitProfile, { rejectWithValue }) => {
        try {
            const { data } = await ExitProfileService.addExitProfile(exitProfile);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getExitProfiles = createAsyncThunk(
    'exitProfile/getExitProfiles',
    async (params: any, { rejectWithValue }) => {
        try {
            const { data } = await ExitProfileService.getExitProfiles(params);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getExitProfile = createAsyncThunk(
    'exitProfile/getExitProfile',
    async (exitProfileId: number, { rejectWithValue }) => {
        try {
            const { data } = await ExitProfileService.getExitProfile(exitProfileId);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateExitProfile = createAsyncThunk(
    'exitProfile/updateExitProfile',
    async (exitProfile: ExitProfile, { rejectWithValue }) => {
        try {
            if (exitProfile.id === undefined) {
                throw new Error("ExitProfile ID is undefined");
            }
            const { data } = await ExitProfileService.updateExitProfile(exitProfile, exitProfile.id);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteExitProfile = createAsyncThunk(
    'exitProfile/deleteExitProfile',
    async (exitProfileId: number, { rejectWithValue }) => {
        try {
            const { data } = await ExitProfileService.deleteExitProfile(exitProfileId);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const exitProfileSlice = createSlice({
    name: 'exitProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addExitProfile.fulfilled, (state, action:PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                status: 'success',
                exitProfile: action.payload.exit_profile,
                message: action.payload.message
            }
        }).addCase(addExitProfile.rejected, (state, action:PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                status: 'failed',
                message: action.payload.message
            }
        }).addCase(addExitProfile.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                status: 'loading'
            }
        }).addCase(getExitProfiles.fulfilled, (state, action:PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                status: 'success',
                exitProfiles: action.payload.exit_profiles,
                pagination: action.payload.pagination
            }
        }).addCase(getExitProfiles.rejected, (state, action:PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                status: 'failed',
                message: action.payload.message
            }
        }).addCase(getExitProfiles.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                status: 'loading'
            }
        }).addCase(getExitProfile.fulfilled, (state, action:PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                status: 'success',
                exitProfile: action.payload.exit_profile
            }
        }).addCase(getExitProfile.rejected, (state, action:PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                status: 'failed',
                message: action.payload.message
            }
        }).addCase(getExitProfile.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                status: 'loading'
            }
        }).addCase(updateExitProfile.fulfilled, (state, action:PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                status: 'success',
                exitProfile: action.payload.exit_profile,
                message: action.payload.message
            }
        }).addCase(updateExitProfile.rejected, (state, action:PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                status: 'failed',
                message: action.payload.message
            }
        }).addCase(updateExitProfile.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                status: 'loading'
            }
        }).addCase(deleteExitProfile.fulfilled, (state, action:PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                status: 'success',
                message: action.payload.message
            }
        }).addCase(deleteExitProfile.rejected, (state, action:PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                status: 'failed',
                message: action.payload.message
            }
        });
    }
});

export default exitProfileSlice.reducer;
