import * as React from "react"
import {
  Home,
  MessageSquare,
  Users,
  Settings,
  Zap,
  Globe,
  Mic,
  MapPin,
  Puzzle,
  HelpCircle,
  LogOut,
  ChevronDown,
  Bot,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type ViewName =
  | "dashboard"
  | "chats"
  | "contacts"
  | "ai"
  | "automation"
  | "translation"
  | "voice"
  | "leads"
  | "plugins"
  | "settings"

export const navItems: { title: string; icon: React.ElementType; view: ViewName }[] = [
  { title: "Dashboard", icon: Home, view: "dashboard" },
  { title: "Chats", icon: MessageSquare, view: "chats" },
  { title: "Contacts", icon: Users, view: "contacts" },
  { title: "AI Assistant", icon: Bot, view: "ai" },
  { title: "Automation", icon: Zap, view: "automation" },
  { title: "Translation", icon: Globe, view: "translation" },
  { title: "Voice", icon: Mic, view: "voice" },
  { title: "Lead Discovery", icon: MapPin, view: "leads" },
  { title: "Plugins", icon: Puzzle, view: "plugins" },
  { title: "Settings", icon: Settings, view: "settings" },
]

export interface AppSidebarProps {
  activeView: ViewName
  onViewChange: (view: ViewName) => void
}

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <MessageSquare className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            WhatsAuto
          </span>
          <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton
                    isActive={activeView === item.view}
                    onClick={() => onViewChange(item.view)}
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium">Business Owner</span>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" className="w-56">
            <DropdownMenuItem onClick={() => onViewChange("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
