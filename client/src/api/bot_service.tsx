import apiClient from "./api_client";

interface BotFields {
    name?: string,
    chatname?: string,
    description?: string,
    public_description?: string,
    first_message?: string,
    scenario?: string,

    avatar?: File | null,

    is_public?: boolean | false,
    hide_info?: boolean | false,

    tags?: []
}

export default function useBotService() {

    // Все взаимодействие с ботами.
    // Обычный вывод при конфигурации публичен + не скрытая инфа
    /*
    {
        "id": "2866b4bc-63d4-4052-ba6f-ba83cb98b1f1",
        "name": "test6",
        "chatname": "idk",
        "avatar": "http://localhost:8000/media/Default_Avatar.svg",
        "public_description": "gnome",
        "description": "idk",
        "scenario": "",
        "first_message": "hello, {{user}}, i am {{char}}",
        "created_at": "2025-09-21T20:14:24.628034+03:00",
        "updated_at": "2025-09-21T20:18:41.233658+03:00",
        "rate": 0,
        "hide_info": true, // в данном случае бот того же пользователя 
        "is_public": true,
        "tags": [],
        "session_count": 0,
        "user": {
            "id": "f5b67b46-2e61-4c00-991d-b5c8d7215e1e",
            "username": "MosinPRSS",
            "date_joined": "2025-09-16T23:04:14.317856+03:00",
            "avatar": "http://localhost:8000/media/img/user/artworks-MFW6wgLo50IdHKGG-Ivkv9Q-t1080x1080.jpg",
            "description": ""
        }
    }
    
    */
    
    const createBot = async(
        fields: BotFields
    ) => {
        if (fields.name === undefined) throw new Error("NAME_REQUIRED");
        if (fields.description === undefined) throw new Error("DESC_REQUIRED");
        if (fields.first_message === undefined) throw new Error("FSTMESSAGE_REQUIRED");

        const formData = new FormData();

        formData.append("name", fields.name);
        formData.append("chatname", fields.chatname ?? fields.name);
        formData.append("description", fields.description);
        formData.append("public_description", fields.public_description ?? "");
        formData.append("first_message", fields.first_message);
        formData.append("scenario", fields.scenario ?? "");

        formData.append("is_public", String(Boolean(fields.is_public)));
        formData.append("hide_info", String(Boolean(fields.hide_info)));

        // для авы
        if (fields.avatar !== undefined) {
            formData.append('avatar', fields.avatar instanceof File ? fields.avatar : '');
        }

        try {
            const res = await apiClient.post("b/create", formData);
            return res.data;

        } catch (error: any) {
            throw new Error("U_ERROR_CREATE");
        }
    };
    const readBot = async(
        pk: string
    ) => {
        try {
            const res = await apiClient.get(`b/read/${pk}`);
            return res.data;
        } catch (error: any) {

        }
    };
    
    return {
        createBot,
    };
}