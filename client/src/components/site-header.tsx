import { MoonIcon, SunIcon } from "lucide-react"
import { Separator } from "../components/ui/separator"
import { SidebarTrigger } from "../components/ui/sidebar"
import { useState } from "react"
import { Button } from "./ui/button"

export function SiteHeader() {
  const [moon, setMoon] = useState(true)

  function switchTheme() {
    setMoon(e => !e)
  }

  return (
    <header className="fixed z-10 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 w-full flex h-12 shrink-0 items-center gap-2 h-s border-b transition-[width,height] ease-linear bg-cover bg-[url('./src/assets/dashboardBackground.png')]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 siz cursor-pointer hover:bg-white hover:text-black" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Button className="fixed right-0 mr-6 cursor-pointer hover:bg-white hover:text-black" onClick={switchTheme}>
          {moon ? <MoonIcon className="size-6"/> : <SunIcon className="size-6"/>}
        </Button>
      </div>
    </header>
  )
}
