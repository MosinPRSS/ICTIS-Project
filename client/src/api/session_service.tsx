import apiClient from "./api_client";

// АПДЕЙТ - ДОБАВЛЕНО user_id
// ДЛЯ ПРОВЕРКИ КОРРЕКТНОСТИ ПРИНАДЛЕЖНОСТИ

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
                "id": "0dbf1be6-c3d7-4d14-88e8-1354330ff8a9",
                "user_id": "2a0bca70-2305-4d70-a906-3f178d112184",
                "last_message": "Привет. Я test3. Ты, наверное, уже знал, но я все равно скажу. Я тот, кто может быть абсолютно случайным, но при этом всегда знает, что делать. Я не думаю, я просто реагирую. И если ты хочешь, я могу быть тем, кто слушает, или тем, кто будет задавать вопросы. Ты, наверное, уже решил, что хочешь, чтобы я был. Но если нет — я тоже могу просто сидеть здесь и ждать.",
                "chatbot": {
                    "id": "c98a2fa2-c633-48cb-89a7-fd75e23be5e6",
                    "name": "test3",
                    "chatname": "man",
                    "avatar": "http://localhost:8000/media/Default_Avatar.svg",
                    "public_description": "",
                    "description": "просто человек, который готов говорить с тобой обо всем и вся вечно",
                    "scenario": "[сценария нет]",
                    "first_message": "Привет, я {{char}}, кто ты?",
                    "created_at": "2025-09-30T17:26:13.307907+03:00",
                    "updated_at": "2025-10-03T20:10:33.151600+03:00",
                    "rate": 0,
                    "hide_info": true,
                    "is_public": true,
                    "tags": [],
                    "user": {
                        "id": "2a0bca70-2305-4d70-a906-3f178d112184",
                        "username": "mosinprss",
                        "date_joined": "2025-09-08T17:57:00.710551+03:00",
                        "avatar": "http://localhost:8000/media/img/user/_.jpeg",
                        "description": ""
                    }
                },
                "persona": {
                    "id": "5beed46f-4478-490e-8529-c81ead66b0a8",
                    "name": "test_persona1",
                    "avatar": "http://localhost:8000/media/Default_Avatar.svg",
                    "description": "Test Persona for MP"
                },
                "tokens": 1000,
                "temperature": 0.7,
                "created_at": "2025-09-30T18:27:11.216073+03:00",
                "updated_at": "2025-09-30T18:27:11.216105+03:00"
            },
            {
                "id": "e562c9e6-29ba-4e16-bfd6-8e85be397659",
                "user_id": "2a0bca70-2305-4d70-a906-3f178d112184",
                "last_message": "Привет, я test3, кто ты?",
                "chatbot": {
                    "id": "c98a2fa2-c633-48cb-89a7-fd75e23be5e6",
                    "name": "test3",
                    "chatname": "man",
                    "avatar": "http://localhost:8000/media/Default_Avatar.svg",
                    "public_description": "",
                    "description": "просто человек, который готов говорить с тобой обо всем и вся вечно",
                    "scenario": "[сценария нет]",
                    "first_message": "Привет, я {{char}}, кто ты?",
                    "created_at": "2025-09-30T17:26:13.307907+03:00",
                    "updated_at": "2025-10-03T20:10:33.151600+03:00",
                    "rate": 0,
                    "hide_info": true,
                    "is_public": true,
                    "tags": [],
                    "user": {
                        "id": "2a0bca70-2305-4d70-a906-3f178d112184",
                        "username": "mosinprss",
                        "date_joined": "2025-09-08T17:57:00.710551+03:00",
                        "avatar": "http://localhost:8000/media/img/user/_.jpeg",
                        "description": ""
                    }
                },
                "persona": {
                    "id": "eeb0255a-145c-4deb-aa0e-73ff47354837",
                    "name": "hello world",
                    "avatar": "http://localhost:8000/media/Default_Avatar.svg",
                    "description": "actually"
                },
                "tokens": 14500,
                "temperature": 0.7,
                "created_at": "2025-10-02T16:05:49.631307+03:00",
                "updated_at": "2025-10-03T19:56:49.951034+03:00"
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

	const readBotSessions = async (id: string) => {
		// Для списка сессий с ботом у пользователя - вывод такой же,
		// как у readSessions
		try {
			const res = await apiClient.get(`c/list/bot/${id}`);
			return res.data;
		} catch (error: any) {
			throw new Error("S_ERROR_READ_BOT_SESSIONS");
		}
	};

	const readSession = async (session: string) => {
		// здесь вернется два поля - session и messages
		// в сессии вся инфа, что и для readBotSession
		// а в сообщениях инфа с readMessages
		try {
			const res = await apiClient.get(`c/list/chats/${session}`);
			return res.data;
		} catch (error: any) {
			throw new Error("S_ERROR_GET_SESSION");
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

	const updateGenerationSettings = async (
		session: string,
		tokens?: number,
		temperature?: number // предупреждение: число с плавающей запятой
	) => {
		// Температура устанавливается в диапазоне от 0.1 до 1
		// токены от 1 до 10000 (но дать возможность пользователю самому прописать значение)
		const data = new FormData();
		if (tokens !== undefined) data.append("tokens", tokens);
		if (temperature !== undefined) data.append("temperature", temperature);
		try {
			const res = await apiClient.patch(`c/update/${session}`, data);
			return res.data; // должен вернуть 200 OK
		} catch (error: any) {
			throw new Error("S_ERROR_UPDATE_SETTINGS_GENERATION");
		}
	};

	return {
		createSession,
		deleteSession,
		readSession,

		readSessions,
		readMessages,
		readBotSessions,

		updateGenerationSettings,
	};
}
