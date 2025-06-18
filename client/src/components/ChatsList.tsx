import { useRegister } from "../context/UserIsRegisteredContext"
import { Button } from "./ui/button"
import ava from '../../public/images/dashboardBackground.png'
import BotsData from '../utils/data.json'
import { Dispatch, useEffect, useState } from "react"
import { MenuIcon, SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { bot } from "../types/interfaces"

export default function ChatsList({isChatsFunc}: Dispatch<React.SetStateAction<boolean>>) {
    const BotsDataSort = BotsData.toSorted((a, b) => b.writeCount - a.writeCount)
    const {theme, chatFunc} = useRegister()
    const [collapsed, setCollapsed] = useState(false)
    const [botsList, setBotsList] = useState(BotsDataSort)
    const [find, setFind] = useState('')
    

    function handleClick(e: bot) {
        isChatsFunc(false)
        chatFunc(e.id)
    }

    useEffect(() => {
        if (find == '') {
            setBotsList(BotsDataSort)
        }
        const findBots = BotsDataSort.filter((e) => e.name.toLowerCase().includes(find) || e.name.toUpperCase().includes(find) || e.name.includes(find))
        setBotsList(findBots)
    }, [find])

    return (
        <div className={`border-r border-b rounded-sm ${collapsed ? 'w-[7%]' : 'w-[20%]'} ${theme.options.bgColor3} flex flex-col max-h-screen`}>
            <div className={`py-3 px-4 max-h-[56px] flex flex-row ${!collapsed ? 'justify-between' : 'justify-center'}`}>
                {!collapsed && <p className="text-2xl ml-2">Чаты</p>}
                <Button onClick={() => setCollapsed((collapsed) => !collapsed)} className={`border right-0 rounded-full p-0 ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`}>
                    <MenuIcon className="rounded-full"/>
                </Button>
            </div>
            <div className="m-4">
                {collapsed ? <SearchIcon className="ml-[5px] outline rounded-sm p-2 h-10 w-10" /> : <Input placeholder="Поиск" onChange={(e) => setFind(e.target.value)} />}
            </div>
            <div className="flex-1 overflow-y-auto pl-4 pr-5 pb-4 border-t justify-center">
                <div className={`justify-center`}>
                    {botsList.length != 0 && botsList.map((bot) => (
                        <Button 
                            key={bot.id}
                            className={`${!collapsed && 'flex flex-col'} p-0 w-full justify-baseline pl-[7px] flex-row mt-3 h-[60px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} transition-all duration-300 ease-in-out cursor-pointer`}
                            variant="outline"
                            onClick={() => handleClick(bot)}
                        >
                        <img src={ava} className="rounded-full h-8 w-8 outline-2"/>
                        {!collapsed && <p className="text-xl">{bot.name}</p>}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}