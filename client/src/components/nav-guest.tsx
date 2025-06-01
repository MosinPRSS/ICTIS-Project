"use client"
import { LogInIcon } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { useRegister } from "../context/UserIsRegisteredContext"
import { cn } from "../lib/utils"

export default function NavGuest() {
    const {wantRegFunc} = useRegister()

    return (
        <SidebarMenu className="h-full justify-center">
            <SidebarMenuItem className="h-[35px]">
                <SidebarMenuButton
                onClick={() => wantRegFunc(true)}
                className={cn(
                    'h-9 min-h-[36px] max-h-[36px]',
                    'ml-[5px] min-w-8 h-9 flex items-center gap-2 px-2 cursor-pointer bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground',
                    'group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-9'
                )}
                >
                <LogInIcon className="w-5 h-5 shrink-0" />
                <span
                    className="text-lg group-data-[collapsible=icon]:hidden+origin-left"
                >
                    Регистрация / Вход
                </span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}