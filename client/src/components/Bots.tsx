import { SearchIcon, SmileIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import BotsData from "../utils/data.json"
import Bot from "./Bot"
import { useRegister } from "../context/UserIsRegisteredContext"

export default function Bots() {
  const [searchBot, setSearchBot] = useState('')
  const [findBots, setFindBots] = useState(BotsData)
  const {selected, theme} = useRegister()
  
  
  const find = () => {
    if (searchBot == '') {
      setFindBots(BotsData)
    }
    const find = BotsData.filter((e) => e.name.toLowerCase().includes(searchBot) || e.name.toUpperCase().includes(searchBot) || e.name.includes(searchBot))
    setFindBots(find)
  }

  useEffect(() => {
    if (selected.length == 0) {
      setFindBots(BotsData)
    } else {
      const find = BotsData.filter((bot) => 
        selected.every((tag) => bot.tags.includes(tag))
      );
      setFindBots(find)
    }
  }, [selected, searchBot])
  
  function handleKeyDown(e) {
    if (e.key == 'Enter') {
      find()
    }
  }
  
  return (
      <>
        <div className="pt-6 space-y-2 h w-full mr-10 h-30">
            <h2 className="text-xl font-bold tracking-tight mb-4">Поиск</h2>
            <div className="flex flex-row gap-2">
                <Button variant={"outline"} className={`cursor-pointer ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`} onClick={find}>
                    <SearchIcon />
                </Button>
                <Input value={searchBot} onChange={(e) => setSearchBot(e.target.value)} onKeyDown={handleKeyDown} placeholder="Найти персонажа" className={`max-w-[500px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`} />
            </div>
        </div>
        {findBots.length != 0 ? <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] max-2xl:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] 2xl:grid-cols-5 gap-x-1 gap-y-4 mt-5">
            {findBots.map((i) => (
              <Bot key={i.name} name={i.name} description={i.description} id={i.id} author={i.author} image={i.image} chatsCount={i.chatsCount} tags={i.tags}/>
            ))}</div> : <div className="flex w-[55%] justify-center space-x-1 mt-5"><p>Ничего не найдено</p><SmileIcon /></div>}
      </>
    )
}