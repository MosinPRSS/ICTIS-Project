import aiohttp
from typing import Dict, Any, Optional
from main.ai_modules.collector import PromptTools as pt
from main.models import Message


class Common:
    @staticmethod
    def ollama_payload(
        MODEL: str,
        PROMPT: str,
        THINK: bool = True,
        messages_history: list = None,
        **kwargs
    ) -> Dict[str, Any]:
        character_name = kwargs.get("char_name")
        character_description = kwargs.get("char_desc")
        character_scenario = kwargs.get("char_scenario")
        persona_name = kwargs.get("pers_name")
        persona_description = kwargs.get("pers_desc")

        # Сбор системного промпта
        system_content = pt.collect_prompt(
            PROMPT,
            character_name,
            character_description,
            character_scenario,
            persona_name,
            persona_description,
        )

        options = {}
        if "temperature" in kwargs and kwargs["temperature"] is not None:
            options["temperature"] = float(kwargs["temperature"])
        if "tokens" in kwargs and kwargs["tokens"] is not None:
            options["num_predict"] = int(kwargs["tokens"])

        messages = [{"role": "system", "content": system_content}]

        if messages_history:
            for msg in messages_history:
                messages.append({"role": msg.role, "content": msg.content})

        messages.append(
            {"role": "user", "content": kwargs.get("user_input", "")}
        )

        return {
            "model": MODEL,
            "messages": messages,
            "options": options,
            "stream": False,
            "think": THINK,
        }


class OllamaAPI:
    API_HOST: str = "http://localhost:11434/api/chat"

    def __init__(self, model_name: str):
        self.MODEL_NAME = model_name

    async def send_message(
        self,
        system_prompt: str,
        session_id: str,
        think: bool = False,
        **kwargs,
    ) -> Optional[Dict[str, Any]]:
        history_qs = Message.aget_recent_messages_with_token_limit(
            session_id, token_limit=12000
        )
        history = await history_qs

        payload = Common.ollama_payload(
            MODEL=self.MODEL_NAME,
            PROMPT=system_prompt,
            THINK=think,
            messages_history=history,
            **kwargs,
        )

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    url=self.API_HOST, json=payload
                ) as response:
                    if response.status != 200:
                        return None
                    return await response.json()
        except Exception as e:
            print(f"Ошибка запроса: {e}")
            return None
