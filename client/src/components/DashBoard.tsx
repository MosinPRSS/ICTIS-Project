import Bots from "./Bots";
import CategoryFilter from "./CategoryFilter";
import {Categories} from "../utils/data";
import { useRegister } from "../context/UserIsRegisteredContext";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import BotsData from '../utils/data.json'
import { user } from "../utils/data";

export function DashBoard() {
    const {theme, selected} = useRegister()
    const [searchBot, setSearchBot] = useState('')
    const [findBots, setFindBots] = useState(BotsData)
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
        <div className={`flex pt-12 px-3 flex-col h-full ${theme.options.bgColor}`}>
            <div className="justify-between flex flex-row py-7 px-7 h w-full mr-10 h-30">
                <div>
                    <p className="text-3xl font-bold max-w-[300px]">Добро пожаловать, {user.name}!</p>
                </div>
                <div>
                    <div className="flex flex-row gap-2 mt-10">
                        <Input value={searchBot} onChange={(e) => setSearchBot(e.target.value)} onKeyDown={handleKeyDown} placeholder="Найти персонажа" className={`w-[300px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`} />
                        <Button variant={"outline"} className={`cursor-pointer ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`} onClick={find}>
                            <SearchIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <CategoryFilter categories={Categories} selectedCategories={[]} />
                <div className="flex flex-col w-full h-full mr-5 mb-10">
                    <Bots findBots={findBots} />
                </div>
            </div>
        </div>
    )
}