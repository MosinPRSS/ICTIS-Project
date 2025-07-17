"use client"

import * as React from "react"
import { HelpCircleIcon, LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { cn } from "../lib/utils"
import { useRegister } from "../context/Context"
import { Link } from "react-router-dom"

export function NavSecondary({
  items,
  ...props
}: {
  items?: {
    title: string
    is: boolean
    icon: LucideIcon
  }[]
  collapsible?: "offcanvas" | "icon" | "none"
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const {theme, page} = useRegister()
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="flex items-start">
            <SidebarMenuItem key="help" className={`h-[39px] rounded-sm ${page != '/help' && `${theme.options.hoverBgColor} ${theme.options.hoverTextColor}`}`}>
              {page == '/help' ?
                <SidebarMenuButton
                  className={cn(
                    'h-9 min-h-[36px] max-h-[36px] border',
                    'ml-[1px] min-w-8 h-9 flex items-center gap-2 px-2 cursor-not-allowed bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground',
                    'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9'
                  )}
                >
                  <HelpCircleIcon className="w-5 h-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden+origin-left">Нужна помощь?</span>
                </SidebarMenuButton> :
                <Link to='/help'>
                  <SidebarMenuButton
                  className={cn(
                    'h-9 min-h-[36px] max-h-[36px]',
                    'ml-[1px] min-w-8 h-9 flex items-center gap-2 px-2 cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground',
                    'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9'
                  )}
                >
                  <HelpCircleIcon className="w-5 h-5 shrink-0" />
                  <span className="group-data-[collapsible=icon]:hidden+origin-left">Нужна помощь?</span>
                </SidebarMenuButton>
                </Link>}
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}