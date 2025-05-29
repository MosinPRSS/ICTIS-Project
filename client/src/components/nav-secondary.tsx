"use client"

import * as React from "react"
import { HelpCircleIcon, LucideIcon, SettingsIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { cn } from "../lib/utils"
import { useRegister } from "../context/UserIsRegisteredContext"

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
  const {settingsFunc, helpFunc, theme} = useRegister()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="flex items-start">
            <SidebarMenuItem key="settings" className={`h-[39px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} rounded-sm`}>
              <SidebarMenuButton
                tooltip="Quick Create"
                className={cn(
                  'h-9 min-h-[36px] max-h-[36px]',
                  'ml-[1px] min-w-8 h-9 flex items-center gap-2 px-2 cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground',
                  'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9'
                )}
                onClick={() => settingsFunc(true)}
              >
                <SettingsIcon className="w-5 h-5 shrink-0" />
                <span className="group-data-[collapsible=icon]:hidden+origin-left">Параметры</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key="help" className={`h-[39px] ${theme.options.hoverBgColor} ${theme.options.hoverTextColor} rounded-sm`}>
              <SidebarMenuButton
                tooltip="Quick Create"
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
