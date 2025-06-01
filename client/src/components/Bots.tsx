import { FrownIcon } from "lucide-react"
import Bot from "./Bot"

export default function Bots({findBots}: object) {
  
  
  
  
  return (
      <>
        {findBots.length != 0 ? <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] max-2xl:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] 2xl:grid-cols-5 gap-x-1 gap-y-4 mt-5">
            {findBots.map((i) => (
              <Bot key={i.name} name={i.name} description={i.description} id={i.id} author={i.author} image={i.image} chatsCount={i.chatsCount} tags={i.tags}/>
            ))}</div> : <div className="flex w-[55%] justify-center space-x-1 mt-20 ml-30 text-xl"><p>Ничего не найдено</p><FrownIcon /></div>}
      </>
    )
}