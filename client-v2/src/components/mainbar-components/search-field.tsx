export default function SearchBox() {
    return (
        <div className="w-full p-4 bg-transparent relative z-10">
            <input type="text" placeholder="🔎 Поиск ботов по имени или описанию" className="
            w-full 
            p-2
            border
            rounded
            bg-transparent
            transition
            delay-200
            duration-300
            focus:shadow-xl/50
            
            " />
        </div>
    )
}