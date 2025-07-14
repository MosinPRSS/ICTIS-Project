// ⚠️ НЕИСПОЛЬЗУЕМЫЙ КОМПОНЕНТ - Этот файл не импортируется нигде в приложении
// Можно удалить или переименовать с префиксом UNUSED_
import { FrownIcon } from "lucide-react"
import Bot from "./Bot"

export default function Bots({findBots}: object) {
  
  return (
      <>
        {findBots.length != 0 ? <div className="flex flex-row flex-wrap space-x-[4px] space-y-[4px] mt-5">
            {findBots.map((i) => (
              <Bot key={i.name} name={i.name} description={i.description} id={i.id} author={i.author} image={i.image} chatsCount={i.chatsCount} tags={i.tags}/>
            ))}</div> : <div className="flex w-[55%] justify-center space-x-1 mt-20 ml-30 text-xl"><p>Ничего не найдено</p><FrownIcon /></div>}
      </>
    )
}