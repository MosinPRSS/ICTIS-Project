"""
Пока есть неопределенность с тем, что брать, мы можем написать
свой собственный модуль для работы с нейронкой через Оллама

Используется асинхрон.
"""

import asyncio, aiohttp, typing, datetime

API_HOST: str = "http://localhost:11434/api/generate" 

SYSTEM_PROMPT: str = """

"""

MODEL_NAME: str = "qwen3"

PAYLOAD = {
    # there is will be prompt w/ persona
}

async def send_message():
    async with aiohttp.ClientSession() as session:
        async with session.post(url=API_HOST, json=PAYLOAD) as response:
            status = response.status
            time_now = datetime.datetime.now()
            print(f"[LOG]: OLLAMA ({MODEL_NAME}) - {time_now} - STATUS: {status}")


async def main():
    await send_message()


if __name__ == "__main__":
    asyncio.run(main())



