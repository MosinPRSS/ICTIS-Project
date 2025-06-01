"use client"

import { LayoutDashboardIcon, MailIcon, PlusCircleIcon } from "lucide-react"

import { Button } from "../components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { useRegister } from "../context/UserIsRegisteredContext"
import { Link } from "react-router-dom"

export function NavMain() {
  const {theme, page, isReg, wantRegFunc, pageFunc} = useRegister()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            {isReg ?
              page == '/create' ? 
              <SidebarMenuButton
                className={`ml-[1px] min-h-[36px] cursor-not-allowed rounded-sm border-1 min-w-8 h-[36px] bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
              >
                <PlusCircleIcon />
                <span>Создать</span>
              </SidebarMenuButton> : <Link to='/create' className="w-full">
              <SidebarMenuButton
                className={`ml-[1px] min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
              >
                <PlusCircleIcon />
                <span>Создать</span>
              </SidebarMenuButton>
            </Link> :
            <SidebarMenuButton
              className={`ml-[1px] min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
              onClick={() => {pageFunc('/create'); wantRegFunc(true)}}
            >
                <PlusCircleIcon />
                <span>Создать</span>
              </SidebarMenuButton>}
            {isReg ?
              page == '/chats' ?
                <Button
                  size="icon"
                  className={`h-9 w-9 rounded-sm cursor-not-allowed shrink-0 group-data-[collapsible=icon]:opacity-0`}
                  variant='outline'
                >
                  <MailIcon className="size-5"/>
                </Button> : <Link to='/chats'>
                <Button
                  size="icon"
                  className={`h-9 w-9 rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer shrink-0 group-data-[collapsible=icon]:opacity-0`}
                >
                  <MailIcon className="size-5"/>
                </Button>
              </Link> :
              <>
                <Button
                  size="icon"
                  className={`h-9 w-9 rounded-sm shrink-0 group-data-[collapsible=icon]:opacity-0 ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`}
                  onClick={() => {pageFunc('/chats'); wantRegFunc(true)}}
                >
                  <MailIcon className="size-5"/>
                </Button>
              </>
            }
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className={`${page == '/' ? 'outline' : 'cursor-pointer'} rounded-md`}>
            <SidebarMenuItem>
              {page == '/' ?
                <SidebarMenuButton className="cursor-not-allowed">
                  <LayoutDashboardIcon className="ml-[1px]" />
                  <span>Главная страница</span>
                </SidebarMenuButton> : <Link to='/'>
                <SidebarMenuButton className={`${theme.options.hoverBgColor} ${theme.options.hoverTextColor} cursor-pointer`}>
                  <LayoutDashboardIcon className="ml-[1px]" />
                  <span>Главная страница</span>
                </SidebarMenuButton>
              </Link>}
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
