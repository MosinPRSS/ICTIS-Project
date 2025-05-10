class serialize_json:
    def create_prompt(
        character_name: str,
        character_description: str,
        character_fst_message: str, # first message
        character_scenario: str
    ) -> str:
        pass
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
        
