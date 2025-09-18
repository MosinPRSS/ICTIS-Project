import { useNavigate } from "react-router";
import { useCallback } from "react";
import apiClient from "./api_client";

export default function useUserActions() {
    const navigate = useNavigate();

    const readAuthUser = useCallback(async (id: string) => {
        try {
            const res = await apiClient.get(`/u/read/${id}`);
            if (res.status === 200 && res.data?.user) {
                return res.data.user;
            } else {
                console.warn("Пользователь не найден или ответ не содержит user");
                return null;
            }
        } catch (error: any) {
            console.error("Ошибка при загрузке пользователя:", error);
            if (error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }, []);

    return { readAuthUser };
}