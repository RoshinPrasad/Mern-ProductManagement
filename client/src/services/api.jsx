import axios from 'axios';

const api = axios.create({
  baseURL: 'http://clientapi.vercel.app/api',
});

export default api;
