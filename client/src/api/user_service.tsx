import { useCallback } from "react";
import apiClient from "./api_client";
import axios from "axios";

interface UserFields {
    username?: string;
    password?: string;
    email?: string;
    avatar?: File | null;
    description?: string;
}

export default function useUserService() {

    // чтение пользователя - примерный вывод:
    /*
        {
            "user": {
                "id": "f5b67b46-2e61-4c00-991d-b5c8d7215e1e",
                "username": "MosinPRSS",
                "date_joined": "2025-09-16T23:04:14.317856+03:00",
                "avatar": "/media/img/user/artworks-MFW6wgLo50IdHKGG-Ivkv9Q-t1080x1080.jpg",
                "description": ""
            },
            "bots": [
                {
                    "id": "fb93357d-b6f3-4798-869b-295b2d818b4b",
                    "name": "test2",
                    "avatar": "http://localhost:8000/media/Default_Avatar.svg",
                    "public_description": "",
                    "rate": 0,
                    "hide_info": true,
                    "tags": [],
                    "user": {
                        "id": "f5b67b46-2e61-4c00-991d-b5c8d7215e1e",
                        "username": "MosinPRSS",
                        "date_joined": "2025-09-16T23:04:14.317856+03:00",
                        "avatar": "http://localhost:8000/media/img/user/artworks-MFW6wgLo50IdHKGG-Ivkv9Q-t1080x1080.jpg",
                        "description": ""
                    }
                }
            ]
        }
    */
    // Также сразу момент - инфа о боте неполная для оптимизации.
    // для полного прочтения пользователю нужно открыть бота
    // такое возможно через .../b/read/<uuid:pk>... 
    // в bot_service.tsx
    const readUser = useCallback(async (id: string) => {
        try {
            const res = await apiClient.get(`u/read/${id}`);
            if (res.status === 200 && res.data?.user) {
                return res.data.user;
            } else {
                console.warn("Пользователь не найден или ответ не содержит user");
                return null;
            }
        } catch (error: any) {
            if (error.response?.status === 404) {
                return null;
            }
            throw new Error("U_ERROR_READ");
        }
    }, []);

    // Обновление пользователя через форм-дату, поля указаны выше
    // Необязательно все поля используются, отсюда и обилие if-else
    // мб стоит заменить на switch-case...
    const updateUser = useCallback(async (fields: UserFields) => {
        try {
            const formData = new FormData();

            if (fields.username !== undefined) {
                formData.append('username', fields.username);
            }
            if (fields.password !== undefined) {
                formData.append('password', fields.password);
            }
            if (fields.email !== undefined) {
                formData.append('email', fields.email);
            }
            if (fields.description !== undefined) {
                formData.append('description', fields.description);
            }

            if (fields.avatar instanceof File) {
                formData.append('avatar', fields.avatar);
            } else if (fields.avatar === null) {
                formData.append('avatar', '');
            }

            const res = await apiClient.patch('u/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return res.data;
        } catch (error) {
            throw new Error('U_ERROR_UPDATE');
        }
    }, []);

    const deleteUser = useCallback(async () => {
        // это СЕЛФ-МЕТОД, сразу разлогинится пользователь после удаления
        // возможно будет доработан в будущем
        try {
            const res = await apiClient.delete('u/delete');
            return res.status; // возвращает 200 ОК
        } catch (error: any) {
            throw new Error('U_ERROR_DELETE');
        }
        
    }, []);

    return { 
        readUser, 
        updateUser,
        deleteUser,
    };
}