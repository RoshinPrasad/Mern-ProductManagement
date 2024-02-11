import axios from 'axios';

const api = axios.create({
  baseURL: 'http://client275.vercel.app/api',
});

export default api;
