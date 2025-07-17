"use client"

import { BotMessageSquareIcon, MailIcon, PlusCircleIcon, UserIcon, UserPlusIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { useRegister } from "../context/Context"
import { Link } from "react-router-dom"
import { cn } from "../lib/utils"

export function NavMain() {
  const {theme, page, isReg, wantRegFunc, pageFunc, chatFunc} = useRegister()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem key="userbots" className={`h-[39px] rounded-sm ${page != '/userbots' && `${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`}`}>
              {isReg ?
                page == '/userbots' ?
                <SidebarMenuButton
                  variant='outline'
                  className={cn(
                    'h-9 min-h-[36px] max-h-[36px] border',
                    'ml-[1px] min-w-8 h-9 flex items-center cursor-not-allowed gap-2 px-2 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground',
                    'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9 outline'
                  )}
                >
                  <BotMessageSquareIcon className="w-5 h-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden+origin-left">Ваши боты</span>
                </SidebarMenuButton> :
                <Link to='/userbots'>
                <SidebarMenuButton
                  className={cn(
                    `h-9 min-h-[36px] max-h-[36px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`,
                    `ml-[1px] min-w-8 cursor-pointer ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} h-9 flex items-center gap-2 px-2 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground`,
                    'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9',
                  )}
                >
                  <BotMessageSquareIcon className="w-5 h-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden+origin-left">Ваши боты</span>
                </SidebarMenuButton> </Link>
               :
              <SidebarMenuButton
                  className={cn(
                    'h-9 min-h-[36px] max-h-[36px]',
                    `ml-[1px] min-w-8 cursor-pointer ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} h-9 flex items-center gap-2 px-2 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground`,
                    'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9',
                  )}
                  onClick={() => {pageFunc('/userbots'); wantRegFunc(true)}}
                >
                  <BotMessageSquareIcon className="w-5 h-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden+origin-left">Ваши боты</span>
                </SidebarMenuButton>}
            </SidebarMenuItem>
            <SidebarMenuItem key="userpersonas" className={`h-[39px] rounded-sm ${page != '/userpersonas' && `${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`}`}>
              {isReg ?
                page == '/userpersonas' ?
                <SidebarMenuButton
                  variant='outline'
                  className={cn(
                    'h-9 min-h-[36px] max-h-[36px] border',
                    'ml-[1px] min-w-8 h-9 flex items-center cursor-not-allowed gap-2 px-2 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground',
                    'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9 outline'
                  )}
                >
                  <UserIcon className="w-5 h-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden+origin-left">Ваши персоны</span>
                </SidebarMenuButton> :
                <Link to='/userpersonas'>
                <SidebarMenuButton
                  className={cn(
                    `h-9 min-h-[36px] max-h-[36px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`,
                    `ml-[1px] min-w-8 cursor-pointer ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} h-9 flex items-center gap-2 px-2 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground`,
                    'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9',
                  )}
                >
                  <UserIcon className="w-5 h-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden+origin-left">Ваши персоны</span>
                </SidebarMenuButton> </Link>
               :
              <SidebarMenuButton
                  className={cn(
                    'h-9 min-h-[36px] max-h-[36px]',
                    `ml-[1px] min-w-8 cursor-pointer ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} h-9 flex items-center gap-2 px-2 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground`,
                    'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9',
                  )}
                  onClick={() => {pageFunc('/userpersonas'); wantRegFunc(true)}}
                >
                  <UserIcon className="w-5 h-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden+origin-left">Ваши персоны</span>
                </SidebarMenuButton>}
            </SidebarMenuItem>
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
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
