import { useRegister } from "../context/UserIsRegisteredContext"
import { chatProps } from "../types/interfaces"
import { Button } from "./ui/button"
import ava from '../../public/images/dashboardBackground.png'
import BotsData from '../utils/data.json'
import { useState } from "react"
import { MenuIcon } from "lucide-react"

export default function ChatsList({chatFunc}: chatProps) {
    const {theme} = useRegister()
    const [collapsed, setCollapsed] = useState(false)

    function handleClick(e: object) {
        chatFunc(e.id)
    }
    return (
        <div className={`border-r border-b rounded-sm ${!collapsed && 'w-[20%]'} ${theme.options.bgColor3} flex flex-col max-h-screen`}>
            <div className={`py-3 px-4 max-h-[56px] flex flex-row ${!collapsed ? 'justify-between' : 'justify-center'}`}>
                {!collapsed && <p className="text-2xl">Чаты</p>}
                <Button onClick={() => setCollapsed((collapsed) => !collapsed)} className={`border right-0 rounded-full p-0 ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`}>
                    <MenuIcon className="rounded-full"/>
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-4 border-t justify-center">
                <div className={`justify-center ${collapsed && 'space-y-6'}`}>
                    {BotsData.map((bot) => (
                        <Button 
                            key={bot.name}
                            className={`${!collapsed ? 'w-full h-[60px]' : 'flex flex-col p-0 rounded-full'} mt-3 content-center justify-start ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`}
                            variant="outline"
                            onClick={() => handleClick(bot)}
                        >
                        <img src={ava} className="rounded-full h-9 w-9"/>
                        {!collapsed && <p className="text-xl">{bot.name}</p>}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}