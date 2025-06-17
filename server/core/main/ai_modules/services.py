"""
Пока есть неопределенность с тем, что брать, мы можем написать
свой собственный модуль для работы с нейронкой через Оллама

Используется асинхрон.
"""

import asyncio, aiohttp, typing, datetime
from .collector import PromptTools as pt

class Common():
    ...
class OllamaAPI():
    API_HOST: str = "http://localhost:11434/api/generate" 

    PROMPT: str = """
    """

    MODEL_NAME: str = str()

    async def create_payload(
            MODEL: str,
            PROMPT: str,

            **kwargs
    ) -> dict:
        payload: dict = {}
        options: dict = {}
        new_prompt: str = pt.collect_prompt(
            PROMPT,
        )

        for key, val in kwargs.items():
            if key == "temperature":
                options["temperatute"] = val
            if key == "tokens":
                options["max_predict"] = val


    async def send_message(self):
        async with aiohttp.ClientSession() as session:
            async with session.post(url=self.API_HOST, json=self.create_payload(
                ...
            )) as response:
                status = response.status 
                time_now = datetime.datetime.now()
                print(f"[LOG] OLLAMA ({self.MODEL_NAME}) - {time_now} - STATUS: {status}")
                print(response)



