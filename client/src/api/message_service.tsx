import apiClient from "./api_client";

export default function useMessageService() {
    // Учитывая, что мы находимся в сессии, используются здешние методы
    const sendMessage = async(
        session: string,
        content: string
    ) => {
        // Метод на первое время ОЧЕНЬ долгий. 
        // Поэтому потребуется что-то вроде
        // анимации загрузки блоба сообщения чела

        // Примерный вывод:
        /*
        {
            "id": 55,
            "content": "Охорошо, пользователь, я просто немного запутался в своих мыслях. Но я здесь, чтобы помочь! Что у тебя на уме?",
            "role": "assistant",
            "timestamp": "2025-09-24T16:22:01.556981Z",
            "eval_count": 39
        }
        
        Достаточно просто добавить сообщение к общему списку на фронте
        */
        try {
            const res = await apiClient.post(
                "c/generate",
                {
                    "session": session,
                    "content": content
                }
            );
            return res.data;
        } catch (error: any) {
            throw new Error("M_ERROR_SEND_MESSAGE");
        }
    };

    const deleteMessage = async(
        pk: number, // id сообщения, выдаваемый при ответе чтение сообщений
    ) => {
        // Здесь очень аккуратно. При удалении сообщения,
        // все последующие (поздние) также удалятся.
        // (сделано для того, чтобы не терялась целостность повествования)
        // После удаления необходимо сделать readMessages из session_service.tsx

        try {
            const res = await apiClient.delete(`c/message/delete/${pk}`);
            return res.data; // 204
        } catch (error: any) {
            throw new Error("M_ERROR_DELETE")
        }
    };  

    const updateMessage = async(
        pk: number,
        content: string
    ) => {
        try {
            const res = await apiClient.patch(
                "c/message/update",
                {
                    "content": content
                }
            );
            return res.data;
            // возвращается:
            /*
            {
                "id": 55,
                "session": "2a8f18dc-f8de-4d97-8fb2-8f0d914649d6",
                "role": "assistant",
                "name": "хз",
                "avatar": "/media/Default_Avatar.svg",
                "content": "екарный бабай я поломался",
                "timestamp": "2025-09-24T19:22:01.556981+03:00",
                "eval_count": 39
            }
            */
        } catch (error: any) {
            throw new Error("M_ERROR_UPDATE");
        }
    }


    return {
        sendMessage,
        deleteMessage,
        updateMessage,
    };
}