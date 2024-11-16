import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor for Token Refresh
api.interceptors.response.use(
    (response) => response, // Return response if successful
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 (unauthorized), try refreshing the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite retry loops
            const refreshToken = localStorage.getItem(REFRESH_TOKEN);

            if (refreshToken) {
                try {
                    const { data } = await axios.post(
                        `${import.meta.env.VITE_API_URL}/api/v1/auth/token/refresh/`,
                        { refresh: refreshToken }
                    );

                    // Store the new access token
                    localStorage.setItem(ACCESS_TOKEN, data.access);
                    originalRequest.headers.Authorization = `Bearer ${data.access}`;

                    // Retry original request with new token
                    return api(originalRequest);
                } catch (refreshError) {
                    // If refresh fails, clear tokens and redirect to login
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                    window.location.href = '/'; // Adjust the route as needed
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;