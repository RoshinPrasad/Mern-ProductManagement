import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mern-products.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
});

export default api;
