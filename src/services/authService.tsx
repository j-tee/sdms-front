import axios from "axios";
import { RegisterUserModel, ResetPasswdUserData, UserRole } from "../models/authModel";
import authHeader from "../utility/authHeader";
import UserSession from "../utility/userSession";

const API_URL = process.env.REACT_APP_API_BASE_URL;
const AuthService = () => {
  const addUserToRole = (userRole: UserRole) => axios.post(`${API_URL}current_user/addUserToRole`, userRole, { headers: authHeader() });
  const removeRole = (userId: number, roleId: number) => axios.get(`${API_URL}current_user/removeRole/${userId}/${roleId}`, { headers: authHeader() });
  const getCurrentUserRoles = () => (UserSession.getroles());
  const getRoles = () => axios.get(`${API_URL}current_user/roles`, { headers: authHeader() });
  const getUserRoles = (user_id: number) => axios.get(`${API_URL}current_user/user/roles/${user_id}`, { headers: authHeader() });
  const getCurrentUser = () => axios.get(`${API_URL}current_user`, { headers: authHeader() });

  const resetPassword = (pwd: ResetPasswdUserData) => axios.put(`${API_URL}password`,
    {
      user: {
        password: pwd.password,
        password_confirmation: pwd.password_confirmation,
        reset_password_token: pwd.reset_password_token,
      },
    });

  const requestPasswordReset = (email: string) => axios.post(`${API_URL}password`,
    {
      user:
      {
        email,
      },
    });
  const getMomoToken = async () => {

    try {
      const response = await axios.get(`${API_URL}api/v1/mobile_moneys/keys/token`, { headers: authHeader() });
      sessionStorage.setItem('momotoken', JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
      throw error; // Re-throw the error or handle it according to your application's requirements.
    }
  };

  const login = (email: string, password: string) => axios
    .post(`${API_URL}login`,
      {
        user: {
          email,
          password,
        },
      })
    .then((response: any) => {
      if (response.headers.authorization) {
        const [bearer, token] = response.headers.authorization.split(' ');
        console.log('token========', token)
        sessionStorage.setItem('bearer', JSON.stringify(bearer));
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
      }

      return response.data;
    });

  const resetMessage = () => undefined;

  const logout = () => axios.delete(`${API_URL}logout`, {
    headers: authHeader(),
    data: JSON.parse(sessionStorage.getItem('user') || '{}')
  })
    .then((response: any) => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      return response;
    });

  const getUserByEmail = (email: string) => axios.get(`${API_URL}users/${email}`, {headers: authHeader()});

  const register = (user:RegisterUserModel) => axios.post(`${API_URL}signup`,
    {
      user: user,
    });

  return {
    getMomoToken,
    login,
    logout,
    register,
    resetMessage,
    getCurrentUser,
    requestPasswordReset,
    resetPassword,
    getUserByEmail,
    getRoles,
    getCurrentUserRoles,
    addUserToRole,
    removeRole,
    getUserRoles,
  };
};

export default AuthService();
