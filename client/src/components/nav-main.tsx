"use client"

import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react"

import { Button } from "../components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="ml-[1px] rounded-sm hover:bg-white hover:text-black hover:border-black hover:border-1 min-w-8 h-[36px] cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              <span>Создать</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="h-9 w-9 rounded-sm hover:bg-white hover:text-black cursor-pointer shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <MailIcon className="size-5"/>
              <span className="sr-only">Чаты</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="outline rounded-md">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon className="ml-[1px]" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
