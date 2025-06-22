import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { user } from "../utils/data"
import UserPersonas from "../utils/userPersonas.json"
import { Button } from "./ui/button"
import { useRegister } from "../context/UserIsRegisteredContext"
import { FrownIcon, PenLineIcon, UserPlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { bot } from '../types/interfaces'
import { Textarea } from "./ui/textarea"
import { FloatingPortal } from "@floating-ui/react"

export default function UserPersonasInfo() {
    const {theme, pageFunc} = useRegister()
    const navigate = useNavigate()
    const [personaInfo, setPersonaInfo] = useState<bot>({})
    const [reduct, setReduct] = useState(false)
    const [isDelete, setDelete] = useState(false)

    function ToggleBotInfo(id: number) {
        const persona = UserPersonas.filter((e) => e.id == id)
        setPersonaInfo(persona[0])
    }

    function redirect() {
        pageFunc('/createper')
        navigate('/createper')
    }
    return (
        <div className="absolute top-[48px] left-0 right-0 bottom-0 flex flex-row p-10">
            {UserPersonas.length != 0 ? 
            <div className="justify-between space-x-5 flex flex-row w-full">
            <div className="flex-col space-y-3 max-w-[290px]">
                <p className="text-4xl">Ваши персоны</p>
                <p className="text-lg">Как к вам будут обращаться собеседники?</p>
                <div className={`flex flex-col outline rounded-sm w-auto space-y-4 p-2 ${theme.options.mgColor}`}>
                    {UserPersonas.map((i) => (
                        <Button 
                            className={`flex-row flex h-15 w-full outline rounded-sm justify-start items-center cursor-pointer ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`}
                            onClick={() => {ToggleBotInfo(i.id); setReduct(false)}}
                        >
                            <Avatar>
                                <AvatarImage className="object-cover h-9 w-9 rounded-full outline" src={user.avatar} alt={user.name} />
                            </Avatar>
                            <p className="text-lg">{i.name}</p>
                        </Button>
                    ))}
                </div>
            </div>
            {Object.keys(personaInfo).length != 0 && 
                <div className="p-6 mr-10 flex flex-col min-h-0 max-w-[70%]">
                {!reduct ?
                <div className={`flex items-start ${theme.options.mgColor} outline rounded-2xl flex-col shadow-md p-10 min-h-[40rem] min-w-[850px]`}>
                    <div className="flex flex-row w-full h-full">
                        <div className="flex-shrink-0">
                            <img className="w-50 h-50 rounded-full outline-2" src={personaInfo.image} />
                        </div>

                        <div className="ml-6 space-y-2 text-white">
                            <h2 className="text-2xl font-bold">{personaInfo.name}</h2>
                                <p className="font-semibold">Описание</p>
                                <p className="text-sm text-gray-300 max-w-[100%] break-all whitespace-normal">{personaInfo.description}</p>
                        </div> 
                    </div>

                        <div className="flex flex-row w-full justify-between px-10">
                            <Button 
                                className={`${theme.options.bgColor2} ${theme.options.textColor2} h-15 w-50 rounded-2xl hover:scale-103 outline cursor-pointer`}
                                onClick={() => setReduct(true)}
                            >
                                <p className="text-bold">Редактировать персону</p>
                            </Button>
                            <Button 
                                className={`${theme.options.bgColor2} ${theme.options.textColor2} h-15 w-50 rounded-2xl hover:scale-103 outline cursor-pointer`}
                                onClick={() => setDelete(true)}    
                            >
                                <p className="text-bold">Удалить персону</p>
                            </Button>
                        </div>
                </div>:
                <div className={`flex items-start ${theme.options.mgColor} outline rounded-2xl flex-col shadow-md p-10 min-w-[70%]`}>
                    <div className="flex flex-row w-full h-full">
                        <div className="flex-shrink-0">
                            <img className="w-50 h-50 rounded-full outline-2" src={personaInfo  .image} />
                            <PenLineIcon className={`outline rounded-full h-9 w-9 p-1 absolute ml-40 ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`} />
                        </div>

                        <div className="ml-15 space-y-2 text-white">
                            <Textarea placeholder="Имя" className="w-[450px]" />
                            <Textarea placeholder="Описание" className="w-[450px]" />
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between px-10 mt-37">
                        <Button 
                            className={`${theme.options.bgColor2} ${theme.options.textColor2} h-15 w-50 rounded-2xl hover:scale-103 outline cursor-pointer`}
                            onClick={() => setReduct(false)}
                        >
                            <p className="text-bold">Сохранить изменения</p>
                        </Button>
                        <Button 
                            className={`${theme.options.bgColor2} ${theme.options.textColor2} h-15 w-50 rounded-2xl hover:scale-103 outline cursor-pointer`}
                            onClick={() => setReduct(false)}    
                        >
                            <p className="text-bold">Отмена</p>
                        </Button>
                    </div>
                </div>}
                </div>}
            </div>:
                <div className="flex flex-col text-center w-full justify-center">
                    <div className="flex flex-row space-x-2 justify-center">
                        <p className="text-xl">Вы еще не создали ни одной персоны</p>
                        <FrownIcon />
                    </div>
                    <div className="justify-center flex flex-col space-y-3">
                        <p>Используйте воображение и творите!</p>
                            <Button
                                className={`ml-[1px] w-[130px] min-h-[36px] place-self-center rounded-sm ${theme.options.bgColor2} ${theme.options.textColor2} hover:h-[50px] hover:w-[144px] cursor-pointer`}
                                variant='outline'
                                onClick={() => redirect()}
                            >
                                <UserPlusIcon />
                                <span>Создать персону</span>
                            </Button>
                    </div>
            </div>}
            {isDelete && 
                <FloatingPortal>
                  <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${theme.options.bgColor} outline rounded-2xl m-10 relative`}>
                      <div className="flex flex-row justify-start gap-6 bg-muted md:p-10">
                        <div className="flex flex-col space-y-4">
                            <p className={`${theme.options.textColor} text-2xl mb-5`}>Вы уверенны, что хотите удалить {personaInfo.name}?</p>
                            <div className="flex flex-row justify-between">
                                <div className={`flex flex-row ${theme.options.textColor} items-center space-x-5`}>
                                    <Button
                                    className={`ml-[1px] min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
                                    onClick={() => {setDelete(false); setBotInfo({})}}
                                    variant='outline'
                                    >
                                    <span>Подтвердить</span>
                                    </Button>
                                </div>
                                <div className={`flex flex-row ${theme.options.textColor} items-center space-x-5`}>
                                    <Button
                                    className={`ml-[1px] outline min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
                                    onClick={() => setDelete(false)}
                                    variant='outline'
                                    >
                                    <span className="group-data-[collapsible=icon]:hidden+origin-left">Отмена</span>
                                    </Button>
                                </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </FloatingPortal>}
        </div>
    )
}