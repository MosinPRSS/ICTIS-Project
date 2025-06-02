import { X } from "lucide-react";
import { useRegister } from "../context/UserIsRegisteredContext";
import {user} from "../utils/data"

export default function Account() {
    const {accountFunc, theme} = useRegister()

    return (
        <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${theme.options.bgColor} rounded-2xl p-6 m-10 relative`}>
            <div className="flex flex-row justify-start gap-6 bg-muted p-3 md:p-10">
                {/* Основное содержимое */}
                <div className={`flex-1 transition-all duration-300 `}>
                  <div className="relative overflow-y-auto bg-cover space-x-10 content-center">
                    {/* Секция профиля */}
                    <div className="relative flex flex-row content-center space-x-10 z-10 m-12">
                      {/* Аватар */}
                      <div className="justify-center text-center">
                        <div className="group flex-col relative w-70 h-70 rounded-full bg-gradient-to-r shadow-lg mx-auto mb-5 flex items-center justify-center transform transition-all hover:-translate-y-1 hover:rotate-x-6 hover:shadow-xl">
                          <img className="object-cover rounded-full h-full w-full" src={user.avatar} />
                        </div>
                          <p>{user.name} ({user.email})</p>
                      </div>
                      {/* Форма профиля */}
                      <div className="max-w-3xl mx-auto">
                        <label htmlFor="username" className="block ml-[15%] mb-1 font-bold italic">
                          Имя пользователя
                        </label>
                        <input
                          type="text"
                          id="username"
                          placeholder="Введите ваше имя"
                          className="block w-[70%] p-3 mx-auto mb-5 border border-gray-300 rounded-md bg-white/90 text-gray-800"
                        />

                        <label htmlFor="description" className="block ml-[15%] mb-1 font-bold italic">
                          Описание профиля
                        </label>
                        <textarea
                          id="description"
                          placeholder="Расскажите о себе..."
                          className="block w-[70%] min-h-[100px] p-3 mx-auto mb-8 border border-gray-300 rounded-md bg-white/90 text-gray-800 resize-y"
                        ></textarea>

                        {/* Кнопки */}
                        <div className="flex justify-center flex-row gap-5 mx-auto flex-wrap">
                          <button className="w-60 h-14 bg-gradient-to-br from-[#d11a2a] to-[#8a1028] text-white font-bold rounded-full shadow-md hover:from-[#8a1028] hover:to-[#d11a2a] hover:shadow-lg transition-all hover:scale-103">
                            Удалить профиль
                          </button>
                          <button className="w-60 h-14 bg-gradient-to-br from-[#2868C6] to-[#3a6a98] text-white font-bold rounded-full shadow-md hover:from-[#3a6a98] hover:to-[#2868C6] hover:shadow-lg transition-all hover:scale-103">
                            Изменить профиль
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <button 
                onClick={() => accountFunc(false)}
                className={`cursor-pointer absolute top-8 right-8 ${theme.options.textColor} outline-2 rounded-xl ${theme.options.hoverTextColor}`}
              >
                <X size={30} />
              </button>
            </div>
          </div>
        </div>
    )
}