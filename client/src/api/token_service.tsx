import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN, env_api } from "./consts";

function AuthClean() {
	// в будущем нужно будет вывести из локального в более защищенное
	localStorage.removeItem(ACCESS_TOKEN);
	localStorage.removeItem(REFRESH_TOKEN);
	localStorage.removeItem("username");
	localStorage.removeItem("userID");
	localStorage.removeItem("avatarUrl");
}


// здесь содержатся куча проверок токенов
// в основном, автоматическая проверка используется всегда
// однако
export const verifyToken = async (token: string): Promise<boolean> => {
	try {
		const res = await axios.post(`${env_api}a/api-token/`, {
			token: token,
		});
		return res.status === 200;
	} catch (error) {
		return false;
	}
};

export const refreshToken = async (): Promise<string | null> => {
	try {
		const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN);
		if (!refreshTokenValue) return null;

		const res = await axios.post(`${env_api}a/api-token/refresh`, {
			refresh: refreshTokenValue,
		});

		if (res.status === 200) {
			localStorage.setItem(ACCESS_TOKEN, res.data.access);
			return res.data.access;
		}
		return null;
	} catch (error) {
		AuthClean();
		return null;
	}
};

export const getValidAccessToken = async (): Promise<string | null> => {
	const accessToken = localStorage.getItem(ACCESS_TOKEN);

	if (!accessToken) return null;

	const isValid = await verifyToken(accessToken);

	if (isValid) {
		return accessToken;
	}

	return await refreshToken();
};

export const isAuthenticated = async (): Promise<boolean> => {
	const token = await getValidAccessToken();
	return token !== null;
};

export const logoutApi = async (): Promise<void> => {
	const res = await axios.post(`${env_api}a/api-token/logout`, {
		refresh: localStorage.getItem(REFRESH_TOKEN),
	});
	try {
		if (res.status === 205) {
			console.log("Completed");
			AuthClean();
		} else {
			console.warn(
				`Something went wrong with server: ${res.status} - but data cleaned`
			);
			AuthClean();
			return;
		}
	} catch (error) {
		console.warn(`Serious error occured - but data cleaned`);
		AuthClean();
		return;
	}
};
