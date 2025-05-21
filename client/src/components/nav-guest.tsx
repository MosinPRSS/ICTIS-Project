"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { useRegister } from "../context/UserIsRegisteredContext"

export default function NavGuest() {
    const {wantRegFunc} = useRegister()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="cursor-pointer data-[state=open]:bg-sidebar-accent items-center content-center data-[state=open]:text-sidebar-accent-foreground"
                            onClick={() => wantRegFunc(true)}
                        >
                        <p className="grid flex-1 text-center font-semibold text-xl leading-tight">
                            Регистрация / Вход
                        </p>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}