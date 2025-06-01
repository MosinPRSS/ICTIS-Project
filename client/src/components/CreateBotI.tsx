import { DonutIcon } from "lucide-react"
import { useRegister } from "../context/UserIsRegisteredContext";


export function CreateBotI(){
  const {theme} = useRegister()
  return (
      <div
        className={`flex-1 transition-all duration-300 z-0 ${theme.options.bgColor}`}
      >
        <div className={`relative h-screen overflow-y-auto  p-5`}>

          {/* Секция создания бота */}
          <div className="relative z-10 mt-12 pb-12 max-w-4xl mx-auto">
            {/* Аватар */}
            <div className="group relative w-36 h-36 rounded-full bg-gradient-to-r from-[#c2a4f5] to-[#8c38c8] border-2 border-[#594db2] shadow-lg mx-auto mb-8 flex items-center justify-center transform transition-all hover:-translate-y-1 hover:rotate-x-6 hover:shadow-xl">
              <div className="text-lg font-bold text-white">Фото</div>
              <button className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#7868f2] text-white flex items-center justify-center shadow-md transition-all hover:bg-[#5a4fcf] hover:scale-110">
                <DonutIcon className="text-sm" />
              </button>
            </div>

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
              <button className={`w-full max-w-md h-16 mx-auto ${theme.options.bgColor2} ${theme.options.textColor2} font-bold text-xl rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer`}>
                Создать бота
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};