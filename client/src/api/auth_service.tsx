import apiClient from './api_client';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './consts';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const res = await apiClient.post('a/api-token', {
                email,
                password
            });

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem("userID", res.data.user.id)
                localStorage.setItem("username", res.data.user.username)
                localStorage.setItem("avatarUrl", res.data.user.avatar)
                return 0;
            } else if (res.status === 401) {
                return -1;
            } else if (res.status >= 500) {
                navigate(`/error/${res.status}`);
                return -1;
            } else {
                return -1;
            }

        } catch (error: any) {
            const status = error.response?.status || 500;

            if (status >= 404) {
                navigate(`/error/${status}`);
            } else {
                console.error("Ошибка авторизации:", error.message);
            }

            return -1;
        }
    };

    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        try {
            const res = await apiClient.post('u/create', {
                username,
                email,
                password
            });

            if (res.status === 201 || res.status === 200) {
                return 0;
            } else {
                if (res.status === 409) {
                    return "Пользователь с таким email уже существует";
                }
                if (res.status === 400) {
                    return "Некорректные данные для регистрации";
                }
                return -1;
            }

        } catch (error: any) {
            const status = error.response?.status || 500;
            
            if (status >= 404) {
                navigate(`/error/${status}`);
            } else {
                console.error("Ошибка регистрации:", error.message);
                if (status === 409) {
                    return "Пользователь с таким email уже существует";
                }
                if (status === 400) {
                    return "Некорректные данные для регистрации";
                }
            }
            
            return -1;
        }
    };

    return { login, register };
}