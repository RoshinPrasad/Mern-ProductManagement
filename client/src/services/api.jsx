import axios from 'axios';

const api = axios.create({
  baseURL: 'http://clientapi-roan.vercel.app/api',
});

export default api;
