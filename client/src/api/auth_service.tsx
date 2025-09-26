import apiClient from "./api_client";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./consts";

export function useAuth() {
	const login = async (email: string, password: string) => {
		// Для входа потребуется два поля - почта и пароль
		// "email": "xxxxx",
		// "password": "xxxxxx"

		// возвращаемые значения:
		/*
        {
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc2MTI1MzMwOCwiaWF0IjoxNzU4NjYxMzA4LCJqdGkiOiI3ZjVjYTVlNjI3ZWU0MjFmOWY1NjFiNzI1ZGUzOWQ4ZCIsInVzZXJfaWQiOiJmNWI2N2I0Ni0yZTYxLTRjMDAtOTkxZC1iNWM4ZDcyMTVlMWUifQ.oqWQntvsqOtNSGlJL21wRl-x4Ujnys0rZg-t1FONmTI",
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU4NjYzMTA4LCJpYXQiOjE3NTg2NjEzMDgsImp0aSI6IjYyZTNjOWNmMTI5NDQ0ODhiZGYwNTZhY2VjZjJhM2U3IiwidXNlcl9pZCI6ImY1YjY3YjQ2LTJlNjEtNGMwMC05OTFkLWI1YzhkNzIxNWUxZSJ9._zK2gm6cm2VFLoAGaVWeVGbW94LHpHagm6kgpA2W3vg",
            "user": {
                "id": "f5b67b46-2e61-4c00-991d-b5c8d7215e1e",
                "email": "forrandomspam111@gmail.com",
                "username": "MosinPRSS",
                "avatar": "/media/img/user/artworks-MFW6wgLo50IdHKGG-Ivkv9Q-t1080x1080.jpg",
                "description": ""
            }
        }
        */
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
				localStorage.setItem("avatarUrl", res.data.user.avatar); // нерационально, не использовать
				return 0;
			} else if (res.status === 401) {
				return -1;
			} else if (res.status >= 500) {
				return -1;
			} else {
				return -1;
			}
		} catch (error: any) {
			const status = error.response?.status || 500;

			if (status >= 404) {
			} else {
				throw new Error("U_ERROR_LOGIN");
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
			const res = await apiClient.post("u/create", {
				username,
				email,
				password,
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
