"""
Пока есть неопределенность с тем, что брать, мы можем написать
свой собственный модуль для работы с нейронкой через Оллама

Используется асинхрон.
"""

import asyncio, aiohttp, typing, datetime
from .collector import PromptTools as pt
from ..logging.ai_logs import AiLogs as log

class Common():
    async def ollama_payload(
            MODEL:  str,
            PROMPT: str,
            THINK:  bool,
            **kwargs
    ) -> dict:
        payload: dict = {
            "model": MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": ""
                }
            ],
            "options": {},
            "think": THINK,
            "stream": False
        }
        options: dict = {}
        character_name:        str = str()
        character_description: str = str()
        character_scenario:    str = str()
        persona_name:          str = str()
        persona_description:   str = str()
        
        for key, val in kwargs.items():
            # options
            if key == "temperature":
                options["temperature"] = val
            if key == "tokens":
                options["max_predict"] = val
            
            # prompt preparation
            if key == "char_name":
                character_name         = val
            if key == "char_desc":
                character_description  = val
            if key == "char_scenario":
                character_scenario     = val
            if key == "pers_name":
                persona_name           = val
            if key == "pers_desc":
                persona_description    = val

        completed_prompt: str = pt.collect_prompt(
            PROMPT, 
            character_name, 
            character_description,
            character_scenario,
            persona_name,
            persona_description
        )
        payload["options"] = options
        payload["messages"][0]["content"] = completed_prompt
            
class OllamaAPI():
    API_HOST: str = "http://localhost:11434/api/chat"
    PROMPT: str = """
    """

    MODEL_NAME: str = str()


    async def send_message(self):
        async with aiohttp.ClientSession() as session:
            async with session.post(url=self.API_HOST, json=Common.ollama_payload(
                ...
            )) as response:
                status = response.status 
                log.create_log(status)
                print(response)

if __name__ == "__main__":
    asyncio.run(OllamaAPI.send_message())


