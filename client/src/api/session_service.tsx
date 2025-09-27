import apiClient from "./api_client";

export default function useSessionService() {
	// ОЧЕНЬ ВАЖНЫЕ МОМЕНТЫ.
	// 1. перед самим созданием сессии пользователю нужно выбрать персону (отобразить всех персон)
	// 2. генерация сообщений будет ОЧЕНЬ долгой на локалке.
	// 3. Методы для взаимодейстия с сообщениями вынесены в message_service.tsx
	const createSession = async (persona_id: string, chatbot_id: string) => {
		try {
			const res = await apiClient.post("c/create", {
				persona: persona_id,
				chatbot: chatbot_id,
			});
			return res.data;
			// хотя по сути должно сразу перекидывать в чат
			// и сразу быть произведен метод readMessages
			// (оставлен) здесь т.к. задействуется метод
		} catch (error: any) {
			throw new Error("S_ERROR_CREATE");
		}
	};

	const readSessions = async () => {
		// примерный вывод сессий
		/*
        [
            {
                "id": "2a8f18dc-f8de-4d97-8fb2-8f0d914649d6",
                "last_message": "hello, хз, i am test3",
                "chatbot": {
                    "id": "1d0a1708-3d83-4dff-8860-0a9c0cf62ef1",
                    "name": "test3",
                    "chatname": "idk",
                    "avatar": "http://localhost:8000/media/Default_Avatar.svg",
                    "public_description": "gnome",
                    "description": "idk",
                    "scenario": "",
                    "first_message": "hello, {{user}}, i am {{char}}",
                    "created_at": "2025-09-24T13:35:46.463742+03:00",
                    "updated_at": "2025-09-24T13:35:46.463752+03:00",
                    "rate": 0,
                    "hide_info": false,
                    "is_public": true,
                    "tags": [],
                    "user": {
                        "id": "2a0bca70-2305-4d70-a906-3f178d112184",
                        "username": "mosinprss",
                        "date_joined": "2025-09-08T17:57:00.710551+03:00",
                        "avatar": "http://localhost:8000/media/Default_Avatar.svg",
                        "description": ""
                    }
                },
                "persona": {
                    "id": "acb785a6-54a5-4169-ab4a-9d70779510bf",
                    "name": "хз",
                    "avatar": "http://localhost:8000/media/Default_Avatar.svg",
                    "description": "это я"
                }
            }
        ]
        */
		try {
			const res = await apiClient.get("c/list/chats");

			return res.data;
		} catch (error: any) {
			throw new Error("S_ERROR_READ");
		}
	};

	const deleteSession = async (session_id: string) => {
		// лист сессий можно получить из метода
		// readSessions()
		try {
			const res = await apiClient.delete(`c/delete/${session_id}`);
			return res.status; // 204 должно вернуть
		} catch (error: any) {
			throw new Error("S_ERROR_DELETE");
		}
	};

	const readMessages = async (session: string) => {
		// важный момент - акцент на роли: assistant и user
		// role: assistant - это БОТ.
		// Примерный вывод:
		/*
        [
            {
                "id": 47,
                "session": "2a8f18dc-f8de-4d97-8fb2-8f0d914649d6",
                "role": "assistant",
                "name": "хз",
                "avatar": "/media/Default_Avatar.svg",
                "content": "hello, хз, i am test3",
                "timestamp": "2025-09-24T13:59:26.612397+03:00",
                "eval_count": 10
            },
            {
                "id": 50,
                "session": "2a8f18dc-f8de-4d97-8fb2-8f0d914649d6",
                "role": "user",
                "name": "test3",
                "avatar": "/media/Default_Avatar.svg",
                "content": "Повтори свое имя, пожалуйста",
                "timestamp": "2025-09-24T18:17:17.380425+03:00",
                "eval_count": 10 // количество токенов при генерации
            },
            {
                "id": 51,
                "session": "2a8f18dc-f8de-4d97-8fb2-8f0d914649d6",
                "role": "assistant",
                "name": "хз",
                "avatar": "/media/Default_Avatar.svg",
                "content": "Охорошо, пользователь, пользователь напись пишет...",
                "timestamp": "2025-09-24T18:17:17.394118+03:00",
                "eval_count": 0
            },
            {
                "id": 52,
                "session": "2a8f18dc-f8de-4d97-8fb2-8f0d914649d6",
                "role": "user",
                "name": "test3",
                "avatar": "/media/Default_Avatar.svg",
                "content": "Что с тобой?",
                "timestamp": "2025-09-24T18:20:50.340703+03:00",
                "eval_count": 7
            },
            {
                "id": 53,
                "session": "2a8f18dc-f8de-4d97-8fb2-8f0d914649d6",
                "role": "assistant",
                "name": "хз",
                "avatar": "/media/Default_Avatar.svg",
                "content": "Окак, ой... щажшшшшшшшшшшшшшшшшшшшшшшшшшшшшшшш",
                "timestamp": "2025-09-24T18:20:50.371277+03:00",
                "eval_count": 0
            }
        ]
        
        */
		try {
			const res = await apiClient.get(`c/list/messages/${session}`);
			return res.data;
		} catch (error: any) {
			throw new Error("M_ERROR_GET_MESSAGES");
		}
	};

	return {
		createSession,
		deleteSession,

		readSessions,
		readMessages,
	};
}
