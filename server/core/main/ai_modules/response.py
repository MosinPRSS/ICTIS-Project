"""
ПОЯСНЕНИЕ К ЭТОЙ ЧАСТИ:
Пока что сделана работа с Ollama-моделями. 
В будущем, возможно, получится получить доступ к внешнему серверу с моделью

На данный момент модуль отсылает запросы к ollama и возвращает ее ответы, 
которые нужно отпарсить...
"""

import requests, os, json, asyncio, aiohttp, dotenv

dotenv.load_dotenv()

# Запуск модели - хотя, думаю, стоит сделать под Докер?
conversation = {
    "User": "*comes behind you, wrapping their arms loosely around Roleplay Master's waist*",
}

HOST = "https://llm.chutes.ai/v1/chat/completions"
JSON_QUERY = {
    "model": "chutesai/Llama-4-Maverick-17B-128E-Instruct-FP8",
    "messages": 
    [ 
        {
        "role": "user", 
        "content": f"""
          hello
        """
        } 
    ],
    "temperature": 0.6,
    "stream": False
}

async def get_response() -> dict:
    headers = {
        "Authorization": f"Bearer {os.getenv("api_key")}",
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
        Exception("smth really went wrong man")
    
if "__main__" == __name__:
    asyncio.run(main())
