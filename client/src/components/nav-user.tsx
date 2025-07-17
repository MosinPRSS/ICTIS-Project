"use client"

import {
  LogOutIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { Button } from "./ui/button"
import { useRegister } from "../context/Context"
import { cn } from "../lib/utils"
import { useNavigate } from "react-router-dom"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const {regFunc, theme, pageFunc, page} = useRegister()
  const navigate = useNavigate()

  function redirectFunc() {
    navigate('/')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row items-center mb-10">
              <div onClick={() => {pageFunc('/user'); navigate('/user')}} className={`flex flex-row p-1 space-x-2 items-center content-center rounded-sm mr-24 ${page == '/user' ? `cursor-not-allowed` : `${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`}`}>
              <Avatar 
                className={cn(
                  'flex-shrink-0', // Добавьте это
                  'h-9 w-9 rounded-lg', // Фиксированные размеры
                  'cursor-pointer duration-200 ease-linear',
                  'outline outline-border',
                  'grayscale', // Пример условного стиля
                  'w-full min-w-[36px] max-w-[36px]', // Для сжатого состояния
                  "hover:bg-primary/90 hover:text-primary-foreground",
                  "active:bg-primary/90 active:text-primary-foreground"
                )}
                
              >
                <AvatarImage className="object-cover h-full w-full" src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{user.name}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight flex-row">
                  <span className="truncate font-medium">{user.name}</span>
              </div>
              </div>
              <Button onClick = {() => {regFunc(false); localStorage.setItem('isReg', false); redirectFunc()}} className={`w-[10px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} outline rounded-sm cursor-pointer group-data-[collapsible=icon]:hidden origin-left`}>
                <LogOutIcon className="ml-auto size-5" />
              </Button>
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
