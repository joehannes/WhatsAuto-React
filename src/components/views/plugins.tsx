import { useState } from "react"
import { Puzzle, Download, Trash2, Bot, Calendar, MessageSquare, Search, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Plugin {
  id: string
  name: string
  description: string
  version: string
  category: string
  installed: boolean
  enabled: boolean
  status: "healthy" | "error" | "deprecated"
  icon: string
}

const plugins: Plugin[] = [
  { id: "1", name: "Qwen AI", description: "Alibaba Qwen LLM integration", version: "1.2.0", category: "AI", installed: true, enabled: true, status: "healthy", icon: "bot" },
  { id: "2", name: "OpenAI GPT", description: "OpenAI GPT-4/3.5 integration", version: "1.0.0", category: "AI", installed: true, enabled: true, status: "healthy", icon: "bot" },
  { id: "3", name: "DeepSeek", description: "DeepSeek AI chat models", version: "0.9.0", category: "AI", installed: false, enabled: false, status: "healthy", icon: "bot" },
  { id: "4", name: "Google Translate", description: "Google Cloud Translation API", version: "1.1.0", category: "Translation", installed: true, enabled: false, status: "healthy", icon: "globe" },
  { id: "5", name: "Google Calendar", description: "Calendar integration for scheduling", version: "0.8.0", category: "Calendar", installed: false, enabled: false, status: "healthy", icon: "calendar" },
  { id: "6", name: "Salesforce CRM", description: "CRM lead and contact sync", version: "1.0.0", category: "CRM", installed: false, enabled: false, status: "healthy", icon: "database" },
  { id: "7", name: "WhatsApp Business", description: "WhatsApp Business API integration", version: "2.0.0", category: "Messaging", installed: true, enabled: true, status: "healthy", icon: "message" },
  { id: "8", name: "HubSpot", description: "Marketing and CRM integration", version: "0.5.0", category: "CRM", installed: false, enabled: false, status: "deprecated", icon: "database" },
]

const iconMap: Record<string, React.ElementType> = {
  bot: Bot,
  calendar: Calendar,
  message: MessageSquare,
  database: Database,
  search: Search,
}

const statusColors = {
  healthy: "bg-emerald-100 text-emerald-800",
  error: "bg-red-100 text-red-800",
  deprecated: "bg-amber-100 text-amber-800",
}

export function PluginsView() {
  const [pluginList, setPluginList] = useState(plugins)
  const [activeTab, setActiveTab] = useState("installed")

  const toggleEnabled = (id: string) => {
    setPluginList(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p))
  }

  const filtered = activeTab === "installed"
    ? pluginList.filter(p => p.installed)
    : activeTab === "available"
    ? pluginList.filter(p => !p.installed)
    : pluginList

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plugins</h1>
          <p className="text-muted-foreground">Extend WhatsAuto with custom plugins</p>
        </div>
        <Button><Download className="h-4 w-4 mr-2" />Install Plugin</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="installed">Installed</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(plugin => {
              const Icon = iconMap[plugin.icon] || Puzzle
              return (
                <Card key={plugin.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{plugin.name}</h3>
                          <p className="text-xs text-muted-foreground">v{plugin.version}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusColors[plugin.status]}`}>{plugin.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plugin.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{plugin.category}</Badge>
                      <div className="flex items-center gap-2">
                        {plugin.installed && (
                          <Switch checked={plugin.enabled} onCheckedChange={() => toggleEnabled(plugin.id)} />
                        )}
                        {!plugin.installed && (
                          <Button size="sm" variant="outline"><Download className="h-3 w-3 mr-1" />Install</Button>
                        )}
                        {plugin.installed && (
                          <Button size="sm" variant="ghost"><Trash2 className="h-3 w-3" /></Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
