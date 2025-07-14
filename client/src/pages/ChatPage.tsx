
import { AppSidebar } from "../components/app-sidebar"
import RegLog from "../components/RegLog"
import { SiteHeader } from "../components/site-header"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import { useRegister } from "../context/UserIsRegisteredContext"
import ChatInterface from "../ai/Chat"

export default function ChatsPage() {
  const { wantToReg, theme, paletteFunc } = useRegister()

  function setPalette() {
    paletteFunc(false)
  }

  return (
    <SidebarProvider onClick={setPalette} className={`${theme.options.bgColor} ${theme.options.textColor} select-none`}>
      <AppSidebar variant="inset" />
      <SidebarInset className={`${theme.options.bgColor} relative`} style={{margin: 0, padding: 0}}>
      <SiteHeader />
      <div className="absolute top-[48px] left-0 right-0 bottom-0 flex flex-row">
        <ChatInterface />
        {/* <ChatsList isChatsFunc = {setChats}/>
        {bot && <div className={`flex flex-col w-full ${theme.options.bgColor}`}>
          <div className={`flex flex-row items-start border-b p-3 justify-between flex-shrink-0 ${theme.options.mgColor}`}>
            <div className="flex flex-row items-center w-100 mt-2">
              <div className={`ml-[2%] flex h-8 w-10 items-center justify-center rounded-full ${theme.options.bgColor} text-white`}>
                <img src={bot?.image} className="w-10 h-10 outline rounded-full"/>
              </div>
              <h3 className="ml-2 text-xl font-semibold">{bot.name}</h3>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              {bot.chats.length > 1 && <h3 className="ml-2 text-xl font-semibold outline rounded-sm p-2">Чат: {setChat}</h3>}
              <Button className={`rounded-2xl h-12 w-12 ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`} variant='outline' onClick={() => setChats((isChats) => !isChats)}>
                <GripIcon className="size-7" />
              </Button>
              <Button className={`rounded-2xl h-12 w-12 ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`} variant='outline' onClick={() => setCollapsed((isCollapsed) => !isCollapsed)}>
                {collapsed ? <ArrowBigLeft className="size-7" /> : <ArrowBigRight className="size-7" />}
              </Button>
            </div>
          </div>
          {!isChats ? <Chat chat={chat} bot={bot} /> : <СhatsSet isChatFunc={setChats} bot={bot} setChatFunc={setSetChat}/>}
        </div>}
        {!collapsed && <BotInfo bot={bot}/>} */}
      </div>
      </SidebarInset>
      {wantToReg && <RegLog />}
    </SidebarProvider>
  )
}