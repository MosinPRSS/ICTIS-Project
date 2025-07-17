import { BotMessageSquareIcon, MailIcon, PenLineIcon, X } from "lucide-react"
import { useRegister } from "../context/Context";
import { useState } from "react";
import { FloatingPortal } from "@floating-ui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";


export function CreateBotI(){
  const {theme, pageFunc} = useRegister()
  const [isCreate, setCreate] = useState(false)
  const navigate = useNavigate()

  return (
      <div
        className={`absolute top-[48px] left-0 right-0 bottom-0 flex flex-row p-10 justify-between ${theme.options.bgColor}`}
      >
        <div className="space-y-1">
          <p className={`text-4xl font-bold ${theme.options.textColor}`}>Создать бота</p>
          <p className={`text-l ml-1 font-bold ${theme.options.textColor}`}>Явите миру новую личность...</p>
          <div className="ml-15 group relative outline-2 mt-15 w-70 h-70 rounded-full bg-gradient-to-r from-[#c2a4f5] to-[#8c38c8] border-2 shadow-lg mx-auto mb-8 flex items-center justify-center transform transition-all hover:-translate-y-1 hover:rotate-x-6 hover:shadow-xl">
              <div className="text-lg font-bold text-white">Фото</div>
              <button className="absolute cursor-pointer bottom-2 right-2 w-9 h-9 rounded-full bg-[#7868f2] text-white flex items-center justify-center shadow-md transition-all hover:bg-[#5a4fcf] hover:scale-110">
                <PenLineIcon className="text-sm" />
              </button>
          </div>
        </div>
        <div className={`relative p-5 w-[60%]`}>

          {/* Секция создания бота */}
          <div className="relative mt-12 pb-12">
            {/* Форма создания бота */}
            <div className="space-y-6 flex flex-col">
              <div className="form-group">
                <label className="block font-bold italic mb-2">
                  Имя персонажа
                </label>
                <input
                  type="text"
                  placeholder="Например, Том Холланд"
                  className="w-full p-3 border border-gray-300 rounded-md bg-white/90 text-gray-800"
                />
              </div>

              <div className="form-group">
                <label className="block font-bold italic mb-2">
                  Публичное описание
                </label>
                <textarea
                  placeholder="То, что будут видеть остальные пользователи"
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-white/90 text-gray-800 resize-y"
                ></textarea>
              </div>

              <div className="form-group">
                <label className="block font-bold italic mb-2">
                  Описание персонажа
                </label>
                <textarea
                  placeholder="Как бы он себя охарактеризовал?"
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-white/90 text-gray-800 resize-y"
                ></textarea>
              </div>

              <div className="form-group">
                <label className="block font-bold italic mb-2">
                  Приветствие
                </label>
                <textarea
                  placeholder="Например: Привет, я Том Холланд, британский актер"
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-white/90 text-gray-800 resize-y"
                ></textarea>
              </div>

              <div className="form-group">
                <label className="block font-bold italic mb-2">
                  Сценарий
                </label>
                <textarea
                  placeholder="Сценарий вашей беседы"
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md bg-white/90 text-gray-800 resize-y"
                ></textarea>
              </div>

              {/* Радио-кнопки */}
              <div className="flex justify-center gap-8 my-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="privacy-public"
                    name="privacy"
                    value="public"
                    defaultChecked
                    className="w-5 h-5 mr-2 cursor-pointer accent-[#7868f2]"
                  />
                  <label htmlFor="privacy-public" className="font-bold cursor-pointer">
                    Публичный бот
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="privacy-private"
                    name="privacy"
                    value="private"
                    className="w-5 h-5 mr-2 cursor-pointer accent-[#7868f2]"
                  />
                  <label htmlFor="privacy-private" className="font-bold cursor-pointer">
                    Приватный бот
                  </label>
                </div>
              </div>

              {/* Кнопка создания */}
              <button 
                className={`w-full max-w-md h-16 mx-auto ${theme.options.bgColor2} ${theme.options.textColor2} font-bold text-xl rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer`}
                onClick={() => setCreate(true)}
              >
                Создать бота
              </button>
            </div>
          </div>
          </div>
              {isCreate &&
                <FloatingPortal>
                  <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${theme.options.bgColor} outline rounded-2xl p-6 m-10 relative`}>
                      <div className="flex flex-row justify-start gap-6 bg-muted p-3 md:p-10">
                        <div className="flex flex-col space-y-4">
                          <p className={`${theme.options.textColor} text-2xl mb-5`}>Персонаж успешно создан!</p>
                          <div className={`flex flex-row ${theme.options.textColor} items-center space-x-5`}>
                            <p>Начните общение с ним</p>
                            <Button
                              className={`ml-[1px] min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
                              onClick={() => {pageFunc('/chats'); navigate('/chats')}}
                              variant='outline'
                            >
                              <MailIcon />
                              <span>Чаты</span>
                            </Button>
                          </div>
                          <div className={`flex flex-row ${theme.options.textColor} items-center space-x-5`}>
                            <p>Список ваших ботов пополнился</p>
                            <Button
                              className={`ml-[1px] outline min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
                              onClick={() => {pageFunc('/userbots'); navigate('/userbots')}}
                              variant='outline'
                            >
                              <BotMessageSquareIcon className="w-5 h-5 shrink-0" />
                              <span className="group-data-[collapsible=icon]:hidden+origin-left">Ваши боты</span>
                            </Button>
                          </div>
                        </div>
                        <button 
                          onClick={() => setCreate(false)}
                          className={`cursor-pointer absolute top-8 right-8 ${theme.options.textColor} outline-2 rounded-xl ${theme.options.hoverTextColor}`}
                        >
                          <X size={30} />
                        </button>
                      </div>
                    </div>
                  </div>
                </FloatingPortal>
              }
            
        
      </div>
  );
};