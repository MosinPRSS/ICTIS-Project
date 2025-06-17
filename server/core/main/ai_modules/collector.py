import asyncio, re

class PromptTools():
    """
    Tools for analyzing and creating RP-prompt.\n
    The common goal is to return complete prompt for LLM.
    """
    PLACEHOLDERS = {
        'user': lambda persona_name: persona_name,
        'user_description': lambda persona_description: persona_description,
        'char': lambda character_name: character_name,
        'char_description': lambda character_description: character_description,
        'char_scenario': lambda character_scenario: character_scenario,
        'char_fst_message': lambda character_fst_message: character_fst_message
    }

    @staticmethod
    def replace_placeholders(
        text: str,
        character_name: str,
        character_description: str,
        character_scenario: str,
        character_fst_message: str,
        persona_name: str,
        persona_description: str
    ) -> str:

        def replacer(match: str) -> str:
            key = match.group(1).strip().lower()
            if key == "user":
                return persona_name
            elif key == "user_description":
                return persona_description
            elif key == "char":
                return character_name
            elif key == "char_description":
                return character_description
            elif key == "char_scenario":
                return character_scenario
            elif key == "char_fst_message":
                return character_fst_message
            else:
                return match.group(0)

        pattern = r'\{\{\s*(.*?)\s*\}\}'
        return re.sub(pattern, replacer, text, flags=re.IGNORECASE)
    

    def analyze_first_message(
        character_fst_message: str,
        character_name: str,
        persona_name: str,
    ) -> str:
        return PromptTools.replace_placeholders(
            character_fst_message,
            character_name,
            "",  # char_description not used
            "",  # char_scenario not used
            "",  # char_fst_message not used
            persona_name,
            "", # persona_desc not used
        )

    def analyze_scenario(
        character_scenario: str,
        character_name: str,
        persona_name: str,
    ) -> str:
        return PromptTools.replace_placeholders(
            character_scenario,
            character_name,
            "",  # char_description not used
            "",  # char_scenario not used
            "",  # char_fst_message not used
            persona_name,
            "",  # persona_desc not used
        )

    def analyze_description(
        character_description: str,
        character_name: str,
        persona_name: str,
    ) -> str:
        return PromptTools.replace_placeholders(
            character_description,
            character_name,
            "",  # char_description not used
            "",  # char_scenario not used
            "",  # char_fst_message not used
            persona_name,
            "",  # persona_desc not used
        )
    
    def collect_prompt(
        system_prompt: str,
        character_name: str,
        character_description: str,
        character_scenario: str,
        persona_name: str,
        persona_description: str
    ) -> str:
        temp_description = PromptTools.analyze_description(
            character_description, 
            character_name, 
            persona_name, 
            persona_description
        )
        temp_scenario = PromptTools.analyze_scenario(
            character_scenario, 
            character_name, 
            persona_name, 
            persona_description
        )
        result = PromptTools.replace_placeholders(
            system_prompt,
            character_name,
            temp_description,
            temp_scenario,
            "",  # char_fst_message not used
            persona_name,
            persona_description
        )

        return result
