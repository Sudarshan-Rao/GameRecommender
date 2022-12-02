import axios from 'axios';

axios.defaults.withCredentials = true

const BASE_URL =
  process.env.REACT_APP_NODE_BACKEND_BASE_URL || 'http://localhost:3001';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});
