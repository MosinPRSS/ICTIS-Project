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
import { useRegister } from "../context/UserIsRegisteredContext"
import { cn } from "../lib/utils"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const {regFunc, theme, accountFunc} = useRegister()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-row p-1 space-x-2 items-center">
              <Avatar 
                className={cn(
                  'h-9 min-h-[36px] max-h-[36px]', 
                  "h-9 w-9 rounded-lg grayscale outline",
                  'ml-[1px] min-w-8 h-9 flex items-center gap-2 px-2 cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground',
                  "group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9")}
                onClick={() => accountFunc(true)}  
              >
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight flex-row" onClick={() => accountFunc(true)}>
                  <span className="truncate font-medium">{user.name}</span>
              </div>
              <Button onClick = {() => regFunc(false)} className={`w-[10px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} outline rounded-sm cursor-pointer group-data-[collapsible=icon]:hidden origin-left`}>
                <LogOutIcon className="ml-auto size-5" />
              </Button>
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
