import { AppSidebar } from "../components/app-sidebar"
import { SiteHeader } from "../components/site-header"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import RegLog from "../components/RegLog"
import { useRegister } from "../context/Context"

import UserProfile from "../ai/User"

export default function UserPage() {
  const {wantToReg, theme, paletteFunc} = useRegister()

  function setPalette() {
    paletteFunc(false)
  }

  return (
    <SidebarProvider onClick={setPalette} className={`${theme.options.bgColor} ${theme.options.textColor} select-none`}>
      <AppSidebar variant="inset" />
      <SidebarInset className={`${theme.options.bgColor} relative`} style={{margin: 0, padding: 0}}>
      <SiteHeader />
      <div className="absolute top-[48px] left-0 right-0 bottom-0 flex flex-row">
        <UserProfile />
      </div>
      </SidebarInset>
      {wantToReg && <RegLog />}
    </SidebarProvider>
  )
}