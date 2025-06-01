"use client"

import * as React from "react"
import { BotMessageSquareIcon, HelpCircleIcon, LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { cn } from "../lib/utils"
import { useRegister } from "../context/UserIsRegisteredContext"
import { Link } from "react-router-dom"

export function NavSecondary({
  ...props
}: {
  items: {
    title: string
    is: boolean
    icon: LucideIcon
  }[]
  collapsible?: "offcanvas" | "icon" | "none"
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const {helpFunc, theme, isReg, pageFunc, page, wantRegFunc} = useRegister()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="flex items-start">
            <SidebarMenuItem key="settings" className={`h-[39px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} rounded-sm`}>
              {isReg ?
              
                page == '/userbots' ?
                <SidebarMenuButton
                  variant='outline'
                  className={cn(
                    'h-9 min-h-[36px] max-h-[36px] outline',
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
                    'h-9 min-h-[36px] max-h-[36px]',
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
            <SidebarMenuItem key="help" className={`h-[39px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} rounded-sm`}>
              <SidebarMenuButton
                className={cn(
                  'h-9 min-h-[36px] max-h-[36px]',
                  'ml-[1px] min-w-8 h-9 flex items-center gap-2 px-2 cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground',
                  'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9'
                )}
                onClick={() => helpFunc(true)}
              >
                <HelpCircleIcon className="w-5 h-5 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden+origin-left">Нужна помощь?</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
