"""
Пока есть неопределенность с тем, что брать, мы можем написать
свой собственный модуль для работы с нейронкой через Оллама

Используется асинхрон.
"""

import asyncio, aiohttp, typing, datetime

API_HOST: str = "http://localhost:11434/api/generate" 

PROMPT: str = """
    go sex
"""

MODEL_NAME: str = "llama3.2"

PAYLOAD: dict = {
    "model": MODEL_NAME,
    "prompt": PROMPT,
    "options": {
        "termperature": 0.7,
        "num_predict": 100 # how much tokens he will generate
    },
    "think": False,
    "stream": False,
    # there is will be prompt w/ persona
}

async def send_message():
    async with aiohttp.ClientSession() as session:
        async with session.post(url=API_HOST, json=PAYLOAD) as response:
            status = response.status
            time_now = datetime.datetime.now()
            print(f"[LOG] OLLAMA ({MODEL_NAME}) - {time_now} - STATUS: {status}")
            print(response)


async def main():
    await send_message()


if __name__ == "__main__":
    asyncio.run(main())



