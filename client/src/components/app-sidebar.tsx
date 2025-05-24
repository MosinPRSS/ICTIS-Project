"use client"

import * as React from "react"
import {
  CameraIcon,
  FileCodeIcon,
  FileTextIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  TriangleIcon,
} from "lucide-react"

import { NavMain } from "../components/nav-main"
import { NavSecondary } from "../components/nav-secondary"
import { NavUser } from "../components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { useRegister } from "../context/UserIsRegisteredContext"
import NavGuest from "./nav-guest"

const data = {
  user: {
    name: "Qua11ra",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Главная страница",
      url: "#",
      icon: LayoutDashboardIcon,
    }
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {isReg} = useRegister()

  return (
    <Sidebar className="bg-violet-900 z-10" collapsible="icon" {...props}>
      <SidebarHeader className="bg-violet-950 rounded-xl">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div>
                <TriangleIcon className="h-10 w-10 ml-[3px]" />
                <span className="text-xl font-semibold">ARI-ai</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className={`bg-violet-950 rounded-xl pl-[2px] h-[60px] items-center ${!isReg ? 'hover:bg-white hover:text-black hover:border-3' : ''}`}>
        {isReg ? <NavUser user={data.user}/> : <NavGuest />}
      </SidebarFooter>
    </Sidebar>
  )
}
