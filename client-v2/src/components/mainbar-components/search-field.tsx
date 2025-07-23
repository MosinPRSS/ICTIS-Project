export default function SearchBox() {
    const GetRandom = (max: Number) => {
        return Math.floor(Math.random() * max)
    }

    let RandomStrings = [
        "🔎 Начни свой путь отсюда...",
        "🌄 Сегодня мне повезет...",
        "❤️ Поиск тебе поможет..."
    ]
    return (
        <div className="w-full p-4 bg-transparent relative z-10">
            <input type="text" placeholder={RandomStrings[GetRandom(3)]} className="
            w-full 
            p-2
            border
            rounded-sm
            bg-transparent
            transition
            duration-300
            hover:shadow-xl/10
            focus:shadow-xl/50
            " />
        </div>
    )
}