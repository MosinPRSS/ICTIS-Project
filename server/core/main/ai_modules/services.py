import asyncio
import aiohttp
from typing import Dict, Any, Optional
from collector import PromptTools as pt


class Common:
    @staticmethod
    async def ollama_payload(
        MODEL: str,
        PROMPT: str,
        CONTEXT: dict,
        THINK: bool = True,
        messages_history: list = None,
        **kwargs
    ) -> Dict[str, Any]:
        character_name = kwargs.get("char_name", None)
        character_description = kwargs.get("char_desc", None)
        character_scenario = kwargs.get("char_scenario", None)
        persona_name = kwargs.get("pers_name", None)
        persona_description = kwargs.get("pers_desc", None)

        system_content = pt.collect_prompt(
            PROMPT,
            character_name,
            character_description,
            character_scenario,
            persona_name,
            persona_description
        )

        options = {}
        if "temperature" in kwargs:
            options["temperature"] = float(kwargs["temperature"])
        if "tokens" in kwargs:
            options["num_predict"] = int(kwargs["tokens"])

        messages = [
            {
                "role": "system",
                "content": system_content.strip()
            }
        ]

        if messages_history:
            for msg in messages_history:
                messages.append({
                    "role": msg.role,
                    "content": msg.content
                })

        messages.append({
            "role": "user",
            "content": kwargs.get("user_input", "")
        })

        payload = {
            "model": MODEL,
            "messages": messages,
            "options": options,
            "stream": False,
            "think": THINK
        }

        return payload

class OllamaAPI:
    API_HOST: str = "http://localhost:11434/api/chat"
    
    def __init__(self, model_name: str):
        self.MODEL_NAME = model_name

    async def send_message(
        self,
        user_prompt: str,
        session_id: str,
        think: bool = False,
        **kwargs
    ) -> Optional[Dict[str, Any]]:
        from main.models import Messages
        history = Messages.get_recent_messages_with_token_limit(session_id, token_limit=4000)

        payload = await Common.ollama_payload(
            MODEL=self.MODEL_NAME,
            PROMPT=user_prompt,
            CONTEXT={},
            THINK=think,
            messages_history=history,
            user_input=kwargs.get("user_input", ""),
            **kwargs
        )

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url=self.API_HOST, json=payload) as response:
                    status = response.status
                    print("Payload sent:", payload)

                    if status != 200:
                        return None
                    
                    response_data = await response.json()
                    return response_data

        except Exception as e:
            print(f"Ошибка запроса: {e}")
            return None

if __name__ == "__main__":
    async def main():
        api = OllamaAPI(model_name="deepseek-r1")

        response = await api.send_message(
            user_prompt="Ты — мудрый наставник. Помоги {{user}} разобраться в жизни.",
            char_name="Мудрец",
            char_desc="Старый философ, живущий в горах. Говорит метафорами.",
            char_scenario="Наставление молодому путнику.",
            pers_name="your mom",
            temperature=0.7,
            tokens=300,
            think=True
        )
        print(response)

    asyncio.run(main())