import axios from 'axios';

axios.defaults.withCredentials = true

const BASE_URL =
  'http://localhost:3001' || process.env.REACT_APP_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});
