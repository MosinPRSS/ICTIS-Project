import { AppSidebar } from "../components/app-sidebar"
import { SiteHeader } from "../components/site-header"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import RegLog from "../components/RegLog"
import { useRegister } from "../context/UserIsRegisteredContext"
import Help from "../components/Help"

export default function HelpPage() {
  const {wantToReg, theme, paletteFunc} = useRegister()

  function setPalette() {
    paletteFunc(false)
  }

  return (
    <SidebarProvider onClick={setPalette} className={`${theme.options.bgColor} ${theme.options.textColor} select-none`}>
      <AppSidebar variant="inset" />
      <SidebarInset className={`${theme.options.bgColor} relative`} style={{margin: 0, padding: 0}}>
      <SiteHeader />
        <Help />
      </SidebarInset>
      {wantToReg && <RegLog />}
    </SidebarProvider>
  )
}
