import { AppSidebar } from "../components/app-sidebar"
import { DashBoard } from "../components/DashBoard"
import { SiteHeader } from "../components/site-header"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import RegLog from "../components/RegLog"
import { useRegister } from "../context/UserIsRegisteredContext"
import Help from "../components/Help"
import Settings from "../components/Settings"

//import data from "../services/data.json"

export default function MainPage() {
  const {wantToReg, isHelp, isSettings} = useRegister()


  return (
    <SidebarProvider className="text-white bg-violet-950 select-none">
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-violet-950 relative" style={{margin: 0, padding: 0}}>
      <SiteHeader />
        <DashBoard />
      </SidebarInset>
      {wantToReg ? <RegLog /> : <></>}
      {isHelp ? <Help /> : <></>}
      {isSettings ? <Settings /> : <></>}
    </SidebarProvider>
  )
}
