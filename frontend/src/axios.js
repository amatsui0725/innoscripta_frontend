import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.defaults.baseURL = 'http://localhost:8000';
api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('userLoginData'))?.token}`;

export const setAxiosToken = (token) => {
  if (token) { 
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
}

export default api;