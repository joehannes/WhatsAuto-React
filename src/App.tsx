import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar, ViewName } from "@/components/app-sidebar"
import { DashboardView } from "@/components/views/dashboard"
import { ChatsView } from "@/components/views/chats"
import { ContactsView } from "@/components/views/contacts"
import { AiView } from "@/components/views/ai"
import { AutomationView } from "@/components/views/automation"
import { TranslationView } from "@/components/views/translation"
import { VoiceView } from "@/components/views/voice"
import { LeadsView } from "@/components/views/leads"
import { PluginsView } from "@/components/views/plugins"
import { SettingsView } from "@/components/views/settings"

const viewMap: Record<ViewName, React.ComponentType> = {
  dashboard: DashboardView,
  chats: ChatsView,
  contacts: ContactsView,
  ai: AiView,
  automation: AutomationView,
  translation: TranslationView,
  voice: VoiceView,
  leads: LeadsView,
  plugins: PluginsView,
  settings: SettingsView,
}

export function App() {
  const [activeView, setActiveView] = useState<ViewName>("dashboard")
  const ViewComponent = viewMap[activeView]

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <ViewComponent />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
