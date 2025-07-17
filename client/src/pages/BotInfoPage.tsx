import { AppSidebar } from "../components/app-sidebar"
import { SiteHeader } from "../components/site-header"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import RegLog from "../components/RegLog"
import { useRegister } from "../context/Context"
import BotInfo from "../components/BotInfo"
import { useParams } from "react-router-dom"
import BotsData from "../utils/data.json"
import { Bot } from "../types/interfaces"

export default function BotInfoPage() {
  const {wantToReg, theme, paletteFunc} = useRegister()
  const { id } = useParams<{ id: string }>()
  const bot = BotsData.find((b: Bot) => String(b.id) === id)

  function setPalette() {
    paletteFunc(false)
  }

  return (
    <SidebarProvider onClick={setPalette} className={`${theme.options.bgColor} ${theme.options.textColor} select-none`}>
      <AppSidebar variant="inset" />
      <SidebarInset className={`${theme.options.bgColor} relative`} style={{margin: 0, padding: 0}}>
        <SiteHeader />
        {bot ? <BotInfo bot={bot} /> : <div className="p-10 text-center text-2xl">Бот не найден</div>}
      </SidebarInset>
      {wantToReg && <RegLog />}
    </SidebarProvider>
  )
}