import { AppSidebar } from "../components/app-sidebar"
import { SiteHeader } from "../components/site-header"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import RegLog from "../components/RegLog"
import { useRegister } from "../context/UserIsRegisteredContext"
import Account from "../components/Account"
import { CreateBotI } from "../components/CreateBotI"

export default function CreateBotPage() {
  const {wantToReg, isReg, theme, paletteFunc, isAccount} = useRegister()

  function setPalette() {
    paletteFunc(false)
  }

  return (
    <SidebarProvider onClick={setPalette} className={`${theme.options.bgColor} ${theme.options.textColor} select-none`}>
        <AppSidebar variant="inset" />
        <SidebarInset className={`${theme.options.bgColor} relative`} style={{margin: 0, padding: 0}}>
        <SiteHeader />
            {isReg && <CreateBotI />}
        </SidebarInset>
        {wantToReg && <RegLog />}
        {isAccount && <Account />}
    </SidebarProvider>
  )
}