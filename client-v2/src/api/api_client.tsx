import axios from 'axios';
import { getValidAccessToken, logout } from './token_service';
import { env_api } from './consts';

const apiClient = axios.create({
    baseURL: env_api,
    timeout: 10000,
});

apiClient.interceptors.request.use(
    async (config) => {
        if (config.skipAuth) {
            return config;
        }

        if (!config.headers.Authorization) {
            const token = await getValidAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.skipAuth && error.response?.status === 401) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newToken = await getValidAccessToken();

            if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } else {
                logout();
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;