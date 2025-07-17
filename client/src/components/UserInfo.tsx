import { FloatingPortal } from "@floating-ui/react";
import { user } from "../utils/data";
import { Button } from "./ui/button";
import { useRegister } from "../context/Context";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
    const {theme, regFunc} = useRegister()
    const [isDelete, setDelete] = useState(false)
    const [reduct, setReduct] = useState(false)
    const navigate = useNavigate()

    const userName = useRef<HTMLInputElement>(null)
    const userDescription = useRef<HTMLTextAreaElement>(null)
    return (
        <div className="absolute top-[48px] left-0 right-0 bottom-0 flex flex-row p-10">
          <div className="flex flex-col space-y-20 ml-2">
            <p className="text-4xl">Профиль</p>
            <div className="justify-center text-center ml-10">
              <div className="group flex-col mr-4 flex-shrink-0 relative w-70 h-70 rounded-full bg-gradient-to-r shadow-lg mx-auto mb-5 flex items-center justify-center transform transition-all hover:-translate-y-1 hover:rotate-x-6 hover:shadow-xl">
                <img className="object-cover rounded-full h-full w-full outline-2" src={user.avatar} />
              </div>
                <p>{user.name} ({user.email})</p>
            </div>
          </div>
            <div className={`${theme.options.bgColor} rounded-2xl mt-5 relative w-[80%]`}>
            <div className="flex flex-row justify-start gap-6 bg-muted p-3 md:p-10">
                {/* Основное содержимое */}
                <div className={`flex-1 transition-all duration-300 overflow-y-auto`}>
                  <div className="relative overflow-y-auto bg-cover space-x-10 content-center">
                    {/* Секция профиля */}
                    <div className="relative flex flex-row content-center space-x-5 z-10 m-5">
                      {/* Форма профиля */}
                      <div className="space-y-4 w-full">
                        <label htmlFor="username" className="block ml-[5%] mb-3 font-bold italic text-xl ">
                          Имя пользователя
                        </label>
                        {reduct ? <input
                          ref={userName}
                          type="text"
                          id="username"
                          placeholder="Введите ваше имя"
                          className="block w-[20rem] p-3 mx-auto mt-5 ml-12 mb-5 border border-gray-300 rounded-md bg-white/90 text-gray-800"
                        /> : <p className="ml-[6%] w-[20rem] whitespace-normal break-all outline rounded-sm p-2">{user.name}</p>}

                        <label htmlFor="description" className="block ml-[5%] mb-3 font-bold italic text-xl">
                          Описание
                        </label>
                        {reduct ? <textarea
                          ref={userDescription}
                          id="description"
                          placeholder="Расскажите о себе..."
                          className="block w-[95%] mt-5 min-h-[100px] ml-12 p-3 mx-auto mb-8 border border-gray-300 rounded-md bg-white/90 text-gray-800 resize-y"
                        ></textarea> : <p className="ml-[6%] whitespace-normal break-all overflow-auto h-[200px] outline rounded-sm p-3">{user.description}</p>}

                        {reduct ?
                        <div className="flex justify-center mt-15 flex-row gap-5 mx-auto flex-wrap">
                          <button 
                            className={`w-60 h-14 ${theme.options.bgColor2} ${theme.options.textColor2} ${theme.options.hoverBgColor} cursor-pointer font-bold rounded-full shadow-md hover:shadow-lg transition-all hover:scale-103`}
                            onClick={() => setReduct(false)}  
                          >
                            Сохранить изменения
                          </button>
                          <button
                            className={`w-60 h-14 ${theme.options.bgColor2} ${theme.options.textColor2} ${theme.options.hoverBgColor} cursor-pointer font-bold rounded-full shadow-md hover:shadow-lg transition-all hover:scale-103`}
                            onClick={() => setReduct(false)}
                          >
                            Отменить
                          </button>
                        </div>
                        :
                        <div className="flex justify-center mt-15 flex-row gap-5 mx-auto flex-wrap">
                          <button 
                            className={`w-60 h-14 ${theme.options.bgColor2} ${theme.options.textColor2} ${theme.options.hoverBgColor} cursor-pointer font-bold rounded-full shadow-md hover:shadow-lg transition-all hover:scale-103`}
                            onClick={() => setDelete(true)}  
                          >
                            Удалить профиль
                          </button>
                          <button
                            className={`w-60 h-14 ${theme.options.bgColor2} ${theme.options.textColor2} ${theme.options.hoverBgColor} cursor-pointer font-bold rounded-full shadow-md hover:shadow-lg transition-all hover:scale-103`}
                            onClick={() => setReduct(true)}
                          >
                            Изменить профиль
                          </button>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          {isDelete && 
            <FloatingPortal>
              <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${theme.options.bgColor} outline rounded-2xl m-10 relative`}>
                  <div className="flex flex-row justify-start gap-6 bg-muted md:p-10">
                    <div className="flex flex-col space-y-4">
                      <p className={`${theme.options.textColor} text-2xl mb-5`}>Вы уверенны, что хотите удалить аккаунт?</p>
                      <div className="flex flex-row justify-between">
                        <div className={`flex flex-row ${theme.options.textColor} items-center space-x-5`}>
                          <Button
                            className={`ml-[1px] min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
                            onClick={() => {setDelete(false); regFunc(false); navigate('/')}}
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