import { AppSidebar } from "../components/app-sidebar"
import Chat from "../components/Chat"
import ChatsList from "../components/ChatsList"
import Help from "../components/Help"
import RegLog from "../components/RegLog"
import { SiteHeader } from "../components/site-header"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import { useRegister } from "../context/UserIsRegisteredContext"
import Account from "../components/Account"

export default function ChatsPage() {
  const {wantToReg, isAccount, theme, paletteFunc, chat, chatFunc} = useRegister()
  
  function setPalette() {
    paletteFunc(false)
  }

  return (
    <SidebarProvider onClick={setPalette} className={`${theme.options.bgColor} ${theme.options.textColor} select-none`}>
      <AppSidebar variant="inset" />
      <SidebarInset className={`${theme.options.bgColor} relative`} style={{margin: 0, padding: 0}}>
      <SiteHeader />
      <div className="absolute top-[48px] left-0 right-0 bottom-0 flex flex-row">
        <ChatsList chat={chat} chatFunc={chatFunc} />
        {chat != 0 && <Chat chat={chat} />}
      </div>
      </SidebarInset>
      {wantToReg && <RegLog />}
      {isAccount && <Account />}
    </SidebarProvider>
  )
}