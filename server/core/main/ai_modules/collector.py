from ..models import *

class serialize_json:
    prompt: str = f""

    def create_prompt(
        character_name: str,
        character_description: str,
        character_fst_message: str, # first message
        character_scenario: str
    ) -> str:
        """
        Здесь получаем данные о боте для генерации. 
        """
        Chatbots.objects.filter()
        
    def prepare_persona(
        persona_name: str,
        persona_description: str 
    ) -> str:
        pass
    def serialize(
        prompt: str,
        model: str,
    ) -> dict:
        pass
        
