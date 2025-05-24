import { X } from "lucide-react"
import { useRegister } from "../context/UserIsRegisteredContext"
import stas from "../assets/шашлык.png"

export default function Help() {
    const {helpFunc} = useRegister()
    return (
        <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-violet-950 rounded-2xl p-6 w-full m-10 relative">
            <div className="flex flex-row items-center justify-center gap-6 bg-muted p-3 md:p-10">
              <p>Помощи не будет -_-</p>
              <img className="rounded-2xl w-100 h-100" src={stas}></img>
              <button 
                onClick={() => helpFunc(false)}
                className="cursor-pointer absolute top-8 right-8 text-white outline-2 rounded-xl hover:text-black"
              >
                <X size={30} />
              </button>
            </div>
          </div>
        </div>
    )
}