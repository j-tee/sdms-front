import { UserModel } from "../models/userModel";

// import { showToastify } from './Toastify';
const UserSession = {
  getroles: () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJWT(token);
      return decodedToken?.roles || [];
    }
    return [];
  },

  getUserInfo: () => {
    const token = sessionStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    return {
      userCategory: decodedToken?.user_category || 'Public',
      username: decodedToken?.username || null,
      email: decodedToken?.email || null,
    };
  },

  isUserStaffOrOwner: (userId:number, users:UserModel[]) => {
    return users.some(user => user.id === userId);
  },
  validMomoToken: () => {
    const momotoken = JSON.parse(sessionStorage.getItem('momotoken') || '{}')

    if (!isMomoTokenValid(momotoken)) {
      return false;
    }

    try {
      const payload = decodeJWT(momotoken.access_token);
      const expirationMinutes = payload?.exp || 0;
      const currentTimeMinutes = Math.floor(Date.now() / 1000 / 60);

      return expirationMinutes > currentTimeMinutes;
    } catch (error) {
      return false;
    }
  },

  validateToken: () => {
    const token = sessionStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    const expirationTime = (decodedToken?.exp || 0) * 1000;

    if (expirationTime < Date.now()) {
      handleExpiredToken();
      return false;
    }

    return true;
  },
};

const decodeJWT = (jwt: any) => {
  if (jwt) {
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64)) || {};
  }
  return {};
};

const isMomoTokenValid = (momoToken: any) => {
  return typeof momoToken === 'object' && momoToken.access_token && isJWTValid(momoToken.access_token);
};

const isJWTValid = (jwt: any) => {
  try {
    const payload = decodeJWT(jwt);
    return typeof payload === 'object' && typeof payload.exp === 'number' && payload.exp > Date.now() / 1000 / 60;
  } catch (error) {
    return false;
  }
};

const handleExpiredToken = () => {
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
};

export default UserSession;
