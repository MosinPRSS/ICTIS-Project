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
  const {theme, page, isReg, wantRegFunc, pageFunc, chatFunc} = useRegister()
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
                <span>Создать бота</span>
              </SidebarMenuButton> : <Link to='/create' className="w-full">
              <SidebarMenuButton
                className={`ml-[1px] min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
              >
                <PlusCircleIcon />
                <span>Создать бота</span>
              </SidebarMenuButton>
            </Link> :
            <SidebarMenuButton
              className={`ml-[1px] min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
              onClick={() => {pageFunc('/create'); wantRegFunc(true)}}
            >
                <PlusCircleIcon />
                <span>Создать бота</span>
              </SidebarMenuButton>}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
              {isReg ?
              page == '/chats' ?
                <SidebarMenuButton
                  className={`ml-[1px] min-h-[36px] cursor-not-allowed rounded-sm border-1 min-w-8 h-[36px] bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
                  variant='outline'
                >
                  <MailIcon className="size-5"/>
                  <span>Чаты</span>
                </SidebarMenuButton> : <Link to='/chats'>
                <SidebarMenuButton
                  className={`ml-[1px] min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
                  onClick={() => chatFunc(0)}
                >
                  <MailIcon className="size-5"/>
                  <span>Чаты</span>
                </SidebarMenuButton>
              </Link> :
                <SidebarMenuButton
                  className={`ml-[1px] min-h-[36px] rounded-sm ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} ${theme.options.hoverBorderColor} hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground`}
                  onClick={() => {pageFunc('/chats'); wantRegFunc(true)}}
                >
                  <MailIcon className="size-5"/>
                  <span>Чаты</span>
                </SidebarMenuButton>}
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
