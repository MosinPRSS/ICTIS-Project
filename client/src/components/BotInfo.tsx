import { useRegister } from "../context/UserIsRegisteredContext"
import { bot} from "../types/interfaces"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "./ui/button"



export default function BotInfo({bot}: bot) {
    const {theme} = useRegister()
    
    return (
            <div className={`border rounded-sm w-[40%] ${theme.options.bgColor3} h-full transition-all duration-300 ease-in-out flex flex-col max-h-screen`}>
                <div className="flex-1 flex flex-col px-4 pb-4 border-t justify-center">
                    <div className={`justify-center mx-3 space-y-3 h-full flex flex-col`}>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <div className="flex flex-col space-x-1 items-center">
                                    <Avatar className='rounded-full h-50 w-50 outline overflow-hidden mt-5'>
                                        <AvatarImage className='w-full object-cover' src={bot.image} alt={bot.name} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            <div>
                                <p className="text-bold text-lg">Имя</p>
                                <p className="text-sm">{bot.name}</p>
                            </div>
                            <div>
                                <p className="text-bold text-lg">Автор</p>
                                <p className="text-sm">{bot.author}</p>
                            </div>
                            <div>
                                <p className="text-bold">Описание</p>
                                <p className="text-sm">{bot.description}</p>
                            </div>
                        </div>
                            <div className="space-y-2">
                                <p className="text-bold">Теги</p>
                                <div className="flex flex-row space-x-2 flex-wrap space-y-2">
                                    {bot.tags.map((e) => (
                                        <p className={`text-sm ${theme.options.bgColor2} ${theme.options.textColor2} rounded-lg h-[28px] min-w-[30px] text-center p-1`}>{e}</p>
                                    ))}
                                </div>
                            </div>
                            <Button className={`w-[90%] h-[50px] mt-auto ${theme.options.bgColor2} ${theme.options.textColor2} cursor-pointer hover:scale-105 ml-3`}>
                                <span>Новый чат</span>
                            </Button>
                        </div>
                    </div>
                </div>
    )
}