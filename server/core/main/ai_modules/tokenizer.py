from transformers import AutoTokenizer

class Tokenization:
    def __init__(self) -> None:
        self.tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-R1")
    def deepseek_tokens(self, text: str) -> dict:
        return len(self.tokenizer.encode(text))