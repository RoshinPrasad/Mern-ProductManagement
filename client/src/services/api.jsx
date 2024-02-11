import axios from 'axios';

const api = axios.create({
  baseURL: 'https://clientapi-roan.vercel.app/api',
});

export default api;
