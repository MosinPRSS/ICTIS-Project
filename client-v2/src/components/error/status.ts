export const ServerStatus = {
    // all common problems
    "404": {
        "status": "404",
        "description": "Требуемая информация не найдена",
        "solution": "Попробуйте еще раз.",
        "short_status": "404_NOT_FOUND"
    },
    "505": {
        "status": "505",
        "description": "Данная версия HTTP-запроса не поддерживается.",
        "solution": "Похоже, ваш браузер устарел. Попробуйте обновить его или установить новый.",
        "short_status": "505_HTTP_VERSION_NOT_SUPPORTED"
    },
    "500": {
        "status": "500",
        "description": "Внутренняя ошибка сервера.",
        "solution": "Возможно сервер перегружен или отключен. Подождите некоторое время и повторите попытку.",
        "short_status": "500_INTERNAL_SERVER_ERROR"
    },
    "520": {
        "status": "520",
        "description": "Неизвестная ошибка сервера.",
        "solution": "Подождите некоторое время и повторите попытку.",
        "short_status": "520_UNKNOWN_ERROR"
    }
}