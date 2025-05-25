import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"

interface Props {
  bots: string[]
}

export default function Bots({bots}: React.FC<Props>) {
  const [searchBot, setSearchBot] = useState('')
  const [findBots, setFindBots] = useState<string[]>(bots)

  const find = () => {

    if (searchBot == '') {
      setFindBots(bots)
    }

    const find = bots.filter((e) => e.toLowerCase().includes(searchBot) || e.toUpperCase().includes(searchBot) || e.includes(searchBot))
    setFindBots(find)
  }

  return (
      <>
        <div className="pt-6 space-y-2 h w-full mr-10 h-30">
            <h2 className="text-xl font-bold tracking-tight mb-4">Поиск</h2>
            <div className="flex flex-row gap-2">
                <Button variant={"outline"} className="cursor-pointer hover:bg-white hover:text-black" onClick={find}>
                    <SearchIcon />
                </Button>
                <Input value={searchBot} onChange={(e) => setSearchBot(e.target.value)} placeholder="Найти персонажа" className="max-w-[500px] hover:bg-white hover:text-black" />
            </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 mt-5">
            {findBots.map((i: string) => (
              <div key={i} className="bg-gray-200 rounded-lg overflow-hidden min-w-[240px] max-w-[240px] border border-transparent hover:bg-black transition-all">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/900)' }}></div>
                <div className="p-4 bg-gray-100">
                  <p className="text-sm text-black">{i}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    )
}