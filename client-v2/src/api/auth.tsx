import axios from "axios";
import { env_api } from "./consts";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        try {
            const res = await axios({
                method: 'post',
                url: `${env_api}a/api-token`,
                data: {
                    "email": email,
                    "password": password
                }
            });

            if (res.status === 200) {
                console.log("Working! Code: " + res.status);
                console.log(res.data);
                return 0;
            } else if (res.status === 401) {
                console.log("Not correct login or password: " + res.status);
                return -1;
            } else if (res.status >= 500) {
                // Перенаправление на страницу ошибки
                navigate(`/error/${res.status}`);
                return -1;
            } else {
                console.log("smth went wrong... but still works: " + res.status);
                return -1;
            }

        } catch (error: any) {
            // Axios выбрасывает ошибку при 4xx/5xx
            const status = error.response?.status || 500;

            if (status >= 404) {
                navigate(`/error/${status}`);
            } else {
                console.error("Ошибка авторизации:", error.message);
            }

            return -1;
        }
    };

    return { login };
}