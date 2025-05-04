"""
ПОЯСНЕНИЕ К ЭТОЙ ЧАСТИ:
Пока что сделана работа с Ollama-моделями. 
В будущем, возможно, получится получить доступ к внешнему серверу с моделью

На данный момент модуль отсылает запросы к ollama и возвращает ее ответы, 
которые нужно отпарсить...
"""

import requests, os, json, asyncio, aiohttp

# Запуск модели - хотя, думаю, стоит сделать под Докер?
AUTH = {"Authorization:": "Bearer cpk_87a9e78336e44c299eb91ddf0e4b0949.732e0bae689e575b94ada3803eeba737.7Q34sBlnT4dUCQpwWW9yKY2wFVeJSh1s"}

HOST = "https://llm.chutes.ai/v1/chat/completions"
JSON_QUERY = {
    "model": "Qwen/Qwen3-14B",
    "messages": 
    [ 
        {
        "role": "user", 
        "content": "are you okay?"
        } 
    ],
    "temperature": 0.6,
    "stream": False
}

async def get_response() -> dict:
    headers = {
        "Authorization": "Bearer cpk_87a9e78336e44c299eb91ddf0e4b0949.732e0bae689e575b94ada3803eeba737.7Q34sBlnT4dUCQpwWW9yKY2wFVeJSh1s",
        "Content-Type": "application/json"
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(url=HOST, json=JSON_QUERY, headers=headers) as response:
            print(f"status: {response.status}")
            if response.status == 200:
                return await response.json()
            else: Exception() 
                

async def main():
    try:
        data = await get_response()
        print(data['choices'][0]['message']['content'])
    except Exception:
        Exception("smth reaaly went wrong man")
    
if "__main__" == __name__:
    asyncio.run(main())
