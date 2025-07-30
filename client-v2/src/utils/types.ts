export interface Bot {
    // Перенести из Джанго сюда
    id: string,
    public_name: string,
    chat_name: string, // TODO in DJANGO

    // booleans
    is_public: boolean,
    hide_info: boolean,

}

export interface User {
    id: string,
    username: string,
    description: string
    created_at: string
}