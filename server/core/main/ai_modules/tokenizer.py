from transformers import AutoTokenizer
import asyncio
class Tokenization:
    def __init__(self) -> None:
        self.tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-R1")

    def deepseek_tokens(self, text: str) -> int:
        return len(self.tokenizer.encode(text))

    async def adeepseek_tokens(self, text: str) -> int:
        """Асинхронная версия подсчёта токенов"""
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(None, self.deepseek_tokens, text)

