import { X } from "lucide-react";
import { useRegister } from "../context/UserIsRegisteredContext";
import { useState } from "react";

export default function Settings() {
    const {settingsFunc, theme} = useRegister()
    const [count, setCount] = useState(0)
    const [price, setPrice] = useState(10)
    const [click, setClick] = useState(0)
    const [bob, setBob] = useState(1)

    function co() {
      setCount(count + 1 + (click * 2))
    }

    function pay(){
      if (count >= price) {
        setCount(count - price)
        setPrice(Math.round((price * 3 / 2) + 10))
        setClick(click + 1)
        setBob(bob + 1)
      }
    }

    return (
        <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${theme.options.bgColor} rounded-2xl p-6 w-full m-10 relative`}>
            <div className="flex flex-row items-center gap-6 bg-muted p-3 md:p-10">
              <p>В доработке...</p>
              <p>Клик увеличен на {click}</p>
              
              <button onClick={() => co()}>Нажми на меня</button>
              <p>{count}</p>
              

              
              {bob == 10 ? <p className="text-xl bg-linear-to-bl from-violet-500 to-fuchsia-500">Вы купили пызега! Игра закончилась!</p> : <button onClick={pay}>Купить пызега за {price} деняг</button>}
              <button 
                onClick={() => settingsFunc(false)}
                className={`cursor-pointer absolute top-8 right-8 ${theme.options.textColor} outline-2 rounded-xl ${theme.options.hoverTextColor}`}
              >
                <X size={30} />
              </button>
            </div>
          </div>
        </div>
    )
}