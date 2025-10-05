import apiClient from "./api_client";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./consts";

export function useAuth() {
	const login = async (email: string, password: string) => {
		try {
			const res = await apiClient.post("a/api-token", {
				email,
				password,
			});

			if (res.status === 200) {
				localStorage.setItem(ACCESS_TOKEN, res.data.access);
				localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
				localStorage.setItem("userID", res.data.user.id);
				localStorage.setItem("username", res.data.user.username);
				localStorage.setItem("avatarUrl", res.data.user.avatar);
				return 200;
			} else if (res.status === 401) {
				return 401;
			} else if (res.status >= 500) {
				return 500;
			} else {
				return -1;
			}
		} catch (error: any) {
			const status = error.response?.status || 500;

			if (status >= 404) {
			} else {
				throw new Error("U_ERROR_LOGIN");
			}

			return 404;
		}
	};

	const register = async (
		username: string,
		email: string,
		password: string
	) => {
		try {
			const res = await apiClient.post("u/create", {
				username,
				email,
				password,
			});
			console.log(res.data);

			if (res.status === 201 || res.status === 200) {
				// localStorage.setItem(ACCESS_TOKEN, res.data.access);
				// localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
				// localStorage.setItem("userID", res.data.id);                    жду бэк
				// localStorage.setItem("username", res.data.username);
				// localStorage.setItem("avatarUrl", res.data.avatar);

				return "Успешно";
			} else {
				// Обрабатываем HTTP ошибки
				switch (res.status) {
					case 409: {
						return "Пользователь с таким email уже существует";
					}
					case 400: {
						return "Некорректные данные для регистрации";
					}
					default: {
						return "Ошибка при регистрации";
					}
				}
			}
		} catch (error: any) {
			return "Произошла ошибка при подключении к серверу";
		}
	};

	return { login, register };
}
