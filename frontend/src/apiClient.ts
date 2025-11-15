// frontend/src/apiClient.ts

import axios from 'axios';

// 1. .env-லிருந்து Base URL-ஐப் பெறவும்
const API_URL = import.meta.env.VITE_API_BASE_URL;

// 2. ஒரு புதிய Axios instance-ஐ உருவாக்கவும்
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // CORS-க்காக சில சமயங்களில் தேவைப்படலாம்
});

// 3. Request Interceptor-ஐச் சேர்க்கவும்
apiClient.interceptors.request.use(
  (config) => {
    // 4. Request-ஐ அனுப்புவதற்கு முன்
    const token = localStorage.getItem('access_token');
    if (token) {
      // 5. Token இருந்தால், Authorization header-ஐச் சேர்க்கவும்
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Request error-க்காக
    return Promise.reject(error);
  }
);

export default apiClient;