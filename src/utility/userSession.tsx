// import { showToastify } from './Toastify';

const token = localStorage.getItem('token');
const momotoken = JSON.parse(localStorage.getItem('momotoken') || '{}')

const UserSession = {
  getroles: () => {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));
      return decodedToken.roles
    }
  },
  validMomoToken: () => {
    // Check if momotoken is an object and has an access_token field
    if (typeof momotoken !== 'object' || !momotoken.access_token) {
      return false; // Not a valid token
    }

    const access_token = momotoken.access_token;

    try {
      // Split the token into its components
      const tokenParts = access_token.split('.');

      if (tokenParts.length !== 3) {
        // Token is invalid
        return false;
      }

      // Decode the payload (second part of the token)
      const payload = JSON.parse(atob(tokenParts[1]));

      if (!payload || typeof payload !== 'object') {
        // Payload is invalid
        return false;
      }

      if (typeof payload.exp !== 'number') {
        // Invalid expiration time, not a number
        return false;
      }

      // Assuming payload.exp is provided in minutes, not seconds
      const expirationMinutes = payload.exp;

      // Calculate the current time in minutes since the Unix epoch
      const currentTimeMinutes = Math.floor(Date.now() / 1000 / 60);

      // Check when the token expires
      if (expirationMinutes <= currentTimeMinutes) {
        // Token has already expired
        return false;
      }

      // Token is valid, and `expirationMinutes` contains the number of minutes until it expires
      return true;
    } catch (error) {
      // Error occurred during decoding or validation
      return false;
    }
  },
  validateToken: () => {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));
      const expirationTime = new Date(decodedToken.exp * 1000);

      if (expirationTime < new Date()) {
        // Perform necessary actions like logging out the user or redirecting
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
        return false;
      }
      return true;
    }
    // showToastify('No session information found! You must log in!!', 'error');
    return false;
  },
};

export default UserSession;
