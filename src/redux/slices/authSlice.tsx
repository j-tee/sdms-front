import { createAsyncThunk, createSlice, isAction } from '@reduxjs/toolkit';
import AuthService from '../../services/authService';
import { RegisterUserModel, ResetPasswdUserData, UserData, UserRole, loginUserInfo } from '../../models/authModel';
import { UserModel } from '../../models/userModel';

const initialState = {
  momotoken:{},
  isLoggedIn: false,
  isLoading: false,
  isSuccessful: false,
  user: {} as UserModel,
  message: '',
  roles: [] as string[],
  user_roles: [] as string[],
  role: {},
};

export const resetMessage = createAsyncThunk(
  'auth/resetMessage',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.resetMessage();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      // API call to register user
      const response = await AuthService.getCurrentUser();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterUserModel, thunkAPI) => {
    try {
      // API call to register user
      const response = await AuthService.register(userData.username, userData.email, userData.password, userData.password_confirmation);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.logout();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: loginUserInfo, thunkAPI) => {
    try {
      const response = await AuthService.login(userData.email, userData.password);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (email: string, thunkAPI) => {
    try {
      const response = await AuthService.requestPasswordReset(email);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (pwd: ResetPasswdUserData, thunkAPI) => {
    try {
      const response = await AuthService.resetPassword(pwd);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUserByEmail = createAsyncThunk(
  'auth/getUserByEmail',
  async (email: string, thunkAPI) => {
    try {
      const response = await AuthService.getUserByEmail(email);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getRoles = createAsyncThunk(
  'auth/getRoles',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getRoles();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const getCurrentUserRoles = createAsyncThunk(
  'auth/getCurrentUserRoles',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getCurrentUserRoles();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUserRoles = createAsyncThunk(
  'auth/getUserRoles',
  async (user_id: number, thunkAPI) => {
    try {
      const response = await AuthService.getUserRoles(user_id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addUserToRole = createAsyncThunk(
  'auth/addUserToRole',
  async (userRole: UserRole, thunkAPI) => {
    try {
      const response = await AuthService.addUserToRole(userRole);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const removeRole = createAsyncThunk(
  'auth/removeRole',
  async (userRole: UserRole, thunkAPI) => {
    try {
      const response = await AuthService.removeRole(userRole.user_id, userRole.role_id);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getMomoToken = createAsyncThunk(
  'auth/getMomoToken',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getMomoToken();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMomoToken.fulfilled, (state, action) => {
        state.momotoken = action.payload.data;
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(getMomoToken.rejected, (state, action) => {
        state.message = 'The action requested has failed';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(getMomoToken.pending, (state, action) => {
        state.message = "";
        state.isSuccessful = false;
        state.isLoading = true;
      })
      .addCase(removeRole.fulfilled, (state, action) => {
        state.message = action.payload;
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(removeRole.rejected, (state, action) => {
        state.message = 'The action requested has failed';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(removeRole.pending, (state, action) => {
        state.message = "";
        state.isSuccessful = false;
        state.isLoading = true;
      })
      .addCase(addUserToRole.fulfilled, (state, action) => {
        state.role = action.payload;
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(addUserToRole.rejected, (state, action) => {
        state.message = 'The requested action failed';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(addUserToRole.pending, (state, action) => {
        state.message = '';
        state.isSuccessful = false;
        state.isLoading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.message = 'The requested action failed';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(getRoles.pending, (state, action) => {
        state.message = 'Action pending';
        state.isSuccessful = false;
        state.isLoading = true;
      })
      .addCase(getUserRoles.fulfilled, (state, action) => {
        state.user_roles = action.payload;
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(getUserRoles.rejected, (state, action) => {
        state.message = 'The requested action failed';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(getUserRoles.pending, (state, action) => {
        state.message = 'Action pending';
        state.isSuccessful = false;
        state.isLoading = true;
      })
      .addCase(getCurrentUserRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(getCurrentUserRoles.rejected, (state, action) => {
        state.message = 'The requested action failed';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(getCurrentUserRoles.pending, (state, action) => {
        state.message = 'Action pending';
        state.isSuccessful = false;
        state.isLoading = true;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.message = '';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(getUserByEmail.pending, (state, action) => {
        state.message = 'Action pending';
        state.isSuccessful = false;
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.message = 'Password reset failed';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.message = 'Action pending';
        state.isSuccessful = false;
        state.isLoading = true;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.message = 'The requested action failed';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(requestPasswordReset.pending, (state, action) => {
        state.message = 'Action pending';
        state.isSuccessful = false;
        state.isLoading = true;
      })
      .addCase(resetMessage.fulfilled, (state) => {
        state.message = 'Action successfully completed';
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(resetMessage.rejected, (state) => {
        state.message = 'Action failed';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(resetMessage.pending, (state) => {
        state.message = 'Action pending';
        state.isSuccessful = false;
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.message = 'User looged out successfully!!';
        state.isSuccessful = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.message = 'User logged out Failure!!';
        state.isSuccessful = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoggedIn = true;
        state.isLoading = true;
        state.message = 'User log out pending!!';
        state.isSuccessful = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.message = 'User successfully registered!!';
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.message = `Registration failed!! ${action.payload}`;
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.message = 'User logged In Successfully!!';
        state.isSuccessful = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.message = 'User log in failure!!';
        state.isSuccessful = false;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoggedIn = false;
        state.isLoading = true;
        state.message = 'User log in pending';
        state.isSuccessful = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.message = 'User Profile Retrieved Successfully';
        state.isSuccessful = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.message = 'User Profile Retrieval failed';
        state.isSuccessful = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoggedIn = false;
        state.isLoading = true;
        state.message = 'User Profile Retrieval pending';
        state.isSuccessful = false;
      });
  },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
