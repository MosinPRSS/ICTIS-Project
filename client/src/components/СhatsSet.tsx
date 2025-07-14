import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { useRegister } from "../context/UserIsRegisteredContext"
import { Bot, ChatsSetProps } from "../types/interfaces"
import { Button } from "./ui/button"
import { PenIcon, TrashIcon, X } from "lucide-react"
import { useState } from "react"
import { Input } from "./ui/input"

export default function ChatsSet({ bot, isChatFunc, setChatFunc }: ChatsSetProps) {
  const { theme, chatFunc } = useRegister()
    const [reduct, setReduct] = useState('')
    
  function handleClick(e: Bot, chat: string) {
        isChatFunc(false)
        setChatFunc(chat)
    chatFunc(Number(e.id))
    }

    return (
        <div className={`flex flex-col w-full ${theme.options.bgColor}`}>
            <div className="flex-1 p-10 flex flex-row overflow-hidden">
                <div className="flex flex-col w-[60%]">
                    <p className="text-3xl">Выберите чат</p>
                    
                    <Avatar className="mt-10 ml-3 justify-start h-40 w-40">
                        <AvatarImage className="object-cover rounded-4xl outline" src={bot.image} alt={bot.name} />
                        <p className="ml-[30px] mt-5 text-3xl">{bot.name}</p>
                    </Avatar>
                </div>
                <div className="p-6 mr-10 flex flex-col mt-20">
                    <div className={`flex items-start ${theme.options.mgColor} outline rounded-2xl flex-col shadow-md p-10`}>
                        {bot.chats?.map((chat) => (
                            <div key={chat} className="flex flex-row w-full space-y-5 space-x-2">
                                {reduct != chat ? 
                                <Button variant='outline' onClick={() => handleClick(bot, chat)} className={`h-[50px] w-[20dvw] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer justify-start`}>
                                    <span>{chat}</span>
                                </Button> : <Input placeholder="Имя чата" className={`h-[50px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer justify-start w-[20dvw]`} />}
                                <Button onClick={() => setReduct(reduct == chat ? '' : chat)} variant='outline' className={`h-[50px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`}>
                                    {reduct == chat ? <X /> : <PenIcon />}
                                </Button>
                                <Button variant='outline' className={`h-[50px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`}>
                                    <TrashIcon />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}