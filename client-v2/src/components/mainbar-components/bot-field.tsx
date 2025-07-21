import Bot from "./bot";

export default function BotField() {

    const GetBots = () => {
        let BotsObjects = []
        for (let i = 0; i < 42; i++) {
            BotsObjects.push(<Bot />);
        }
        return BotsObjects
    }
    
    return (
        <>
        <div className="relative">
            <div className="
            bg-transparent
            flex
            flex-row
            ">
                <a className="text-right pt-4">Заглушка для страниц</a>
            </div>
            <div className="
            relative
            z-20
            grid
            grid-cols-1
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-6
            gap-2
            overflow-y-hidden
            overflow-x-hidden
            bg-gray-100
            
            ">{GetBots()}</div>
            <div className="
            bg-transparent
            flex
            flex-row-reverse
            p-2
            ">
                <a className="text-right">Заглушка для страниц</a>
            </div>
        </div>
       
        </>
    )
}