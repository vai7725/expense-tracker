import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URI });

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.get(`/auth/user`, { withCredentials: true });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const logoutUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.get(`/auth/logout`, { withCredentials: true });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};
