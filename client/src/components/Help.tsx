import { X } from "lucide-react"
import { useRegister } from "../context/UserIsRegisteredContext"
import stas from "../../public/images/шашлык.png"

export default function Help() {
    const {helpFunc, theme} = useRegister()
    return (
        <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${theme.options.bgColor} rounded-2xl p-6 w-full m-10 relative`}>
            <div className="flex flex-row items-center justify-center gap-6 bg-muted p-3 md:p-10">
              <p>В доработке -_-</p>
              <button 
                onClick={() => helpFunc(false)}
                className={`cursor-pointer absolute top-8 right-8 ${theme.options.textColor} outline-2 rounded-xl ${theme.options.hoverTextColor}`}
              >
                <X size={30} />
              </button>
            </div>
          </div>
        </div>
    )
}