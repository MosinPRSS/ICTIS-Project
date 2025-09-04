from main.models import AiLogging
from .codes import Codes

class AiLogs():
    def create_log(
            status: int
            ) -> None:
        description = Codes.STATUS_CODES.get(f"{status}")
        AiLogging.objects.create(
            code=status,
            description=description
        )
        return None