import apiClient from "./api_client";
import { IBot } from "@/interfaces/interfaces";

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

	const createBot = async (fields: IBot) => {
		console.log(fields);

		if (fields.name === undefined) throw new Error("NAME_REQUIRED");
		if (fields.description === undefined) throw new Error("DESC_REQUIRED");
		if (fields.first_message === undefined)
			throw new Error("FSTMESSAGE_REQUIRED");

		const formData = new FormData();

		formData.append("name", fields.name);
		formData.append("chatname", fields.chatname ?? fields.name);
		formData.append("description", fields.description);
		formData.append("public_description", fields.public_description ?? "");
		formData.append("first_message", fields.first_message);
		formData.append("scenario", fields.scenario ?? "");

		formData.append("is_public", String(Boolean(fields.is_public)));
		formData.append("hide_info", String(Boolean(fields.hide_info)));
		formData.append("tags", fields.tags);

		// для авы
		if (fields.avatar !== undefined) {
			formData.append(
				"avatar",
				fields.avatar instanceof File ? fields.avatar : ""
			);
		}

		try {
			console.log(formData);

			const res = await apiClient.post("b/create", formData);
			console.log(res);

			return res.data;
		} catch (error: any) {
			throw new Error("B_ERROR_CREATE");
		}
	};
	const readBot = async (pk: string) => {
		try {
			const res = await apiClient.get(`b/read/${pk}`, {
				headers: {
					Authorization: "" // спасение
				}
			});
			return res.data;
		} catch (error: any) {
			throw new Error("B_ERROR_READ");
		}
	};

	const updateBot = async (fields: IBot, pk: string) => {
		const formData = new FormData();

		if (fields.name !== undefined) formData.append("name", fields.name);
		if (fields.chatname !== undefined)
			formData.append("chatname", fields.chatname);
		if (fields.description !== undefined)
			formData.append("description", fields.description);
		if (fields.public_description !== undefined)
			formData.append("public_description", fields.public_description);
		if (fields.first_message !== undefined)
			formData.append("first_message", fields.first_message);
		if (fields.scenario !== undefined)
			formData.append("scenario", fields.scenario);

		if (fields.is_public !== undefined)
			formData.append("is_public", String(Boolean(fields.is_public)));
		if (fields.hide_info !== undefined)
			formData.append("hide_info", String(Boolean(fields.hide_info)));

		if (fields.avatar !== undefined) {
			formData.append(
				"avatar",
				fields.avatar instanceof File ? fields.avatar : ""
			);
		}

		try {
			const res = await apiClient.patch(`b/update/${pk}`, formData);
			return res.data;
		} catch (error: any) {
			throw new Error("B_ERROR_UPDATE");
		}
	};

	const deleteBot = async (pk: string) => {
		try {
			const res = await apiClient.delete(`b/delete/${pk}`);
			return res.status; // должно вернуть 204
		} catch (error: any) {
			throw new Error("B_ERROR_DELETE");
		}
	};

	const listBot = async (
		next: string,
		method: number = 1,
		sort_by: number = 1,
	) => {
		// Пока не будет сейчас серьезно
		// реализовано на этой неделе
		// Однако листинг поддерживает кучу параметров...

		// sort_by: 0=алфавит, 1=рейтинг, 2=сессии, 3=время
        // method: 0=возрастание, 1=убывание

		/*
        {
			"count": 2,
			"next": "http://localhost:8000/api/b/list?method=0&page=2&page_size=1&sort_by=1",
			"previous": null,
			"results": [
				{
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
					"session_count": 1,
					"user": {
						"id": "2a0bca70-2305-4d70-a906-3f178d112184",
						"username": "mosinprss",
						"date_joined": "2025-09-08T17:57:00.710551+03:00",
						"avatar": "http://localhost:8000/media/img/user/_.jpeg",
						"description": ""
					}
				}
			]
		}
        
        */

		try {
			const res = await apiClient.get(next, {
				params: {
					sort_by: sort_by,
					method: method
				},
				headers: {
					Authorization: "" // спасение
				}
			});

			return res.data;
		} catch (error: any) {
			throw new Error("B_ERROR_LIST");
		}
	};

	const listUserBots = async () => {
		// ОТНОСИТСЯ К САМОМУ ПОЛЬЗОВАТЕЛЮ
		try {
			const res = await apiClient.get("b/list/user");

			return res.data;
		} catch (error: any) {
			throw new Error("B_ERROR_LIST_USER");
		}
	};

	return {
		createBot,
		readBot,
		updateBot,
		deleteBot,

		listBot,
		listUserBots,
	};
}
