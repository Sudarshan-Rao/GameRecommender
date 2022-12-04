import axios from 'axios';

axios.defaults.withCredentials = true

const BASE_URL = 'https://gamerecommenderbackendnode.onrender.com' || 'http://localhost:3001';

export default axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});
