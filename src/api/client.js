import axios from 'axios';

export const SESSION_KEY = 'field-notes-auth';

export function readSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
}

export function getApiError(error) {
  return error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';
}

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api' });

api.interceptors.request.use((config) => {
  const session = readSession();
  if (session?.token && !config.headers.Authorization) config.headers.Authorization = `Basic ${session.token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.skipAuthRedirect) {
      sessionStorage.removeItem(SESSION_KEY);
      if (window.location.pathname !== '/login') window.location.assign('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
