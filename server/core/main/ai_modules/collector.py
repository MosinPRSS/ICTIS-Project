from ..models import *

class data_prepare:
    """
    Сериализация, подготовка данных...
    """
    
    def create_message(
        self,
        character_name: str,
        character_description: str,
        character_fst_message: str,
        conversation: str,
        character_scenario: str = "is not set.",
    ) -> str:
        if conversation == None:
            conversation = character_fst_message

        MESSAGE_PROMPT: str = f"""
        Используй вот эти "блоки" при составлении промпта
        {character_name}
        {character_description}
        {conversation}
        """ # опционально - {character_fst_message}
