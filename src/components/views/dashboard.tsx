import { useState } from "react"
import { MessageSquare, Users, Zap, Bot, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const stats = [
  { title: "Active Chats", value: "24", icon: MessageSquare, trend: "+12%" },
  { title: "Contacts", value: "156", icon: Users, trend: "+5%" },
  { title: "Automations", value: "8", icon: Zap, trend: "+2" },
  { title: "AI Responses", value: "42", icon: Bot, trend: "+18%" },
]

const recentChats = [
  { name: "Maria Garcia", message: "Thanks for the quick response!", time: "2m", unread: 0, mode: "assisted" as const },
  { name: "John Smith", message: "Can you send me the invoice?", time: "5m", unread: 2, mode: "autonomous" as const },
  { name: "Sarah Lee", message: "When is the delivery arriving?", time: "12m", unread: 1, mode: "human" as const },
  { name: "Carlos Ruiz", message: "I need to reschedule my appointment", time: "1h", unread: 0, mode: "assisted" as const },
]

const modeBadge = {
  human: { label: "Human", variant: "outline" as const },
  assisted: { label: "AI Assisted", variant: "secondary" as const },
  autonomous: { label: "Autonomous", variant: "default" as const },
}

export function DashboardView() {
  const [aiMode, setAiMode] = useState("assisted")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your AI business messaging</p>
        </div>
        <div className="flex gap-2">
          <Button variant={aiMode === "human" ? "default" : "outline"} size="sm" onClick={() => setAiMode("human")}>
            Human
          </Button>
          <Button variant={aiMode === "assisted" ? "default" : "outline"} size="sm" onClick={() => setAiMode("assisted")}>
            AI Assisted
          </Button>
          <Button variant={aiMode === "autonomous" ? "default" : "outline"} size="sm" onClick={() => setAiMode("autonomous")}>
            Autonomous
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                {stat.trend} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Chats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentChats.map((chat, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 cursor-pointer transition-colors">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs">{chat.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm truncate">{chat.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={modeBadge[chat.mode].variant} className="text-[10px] px-1 py-0 h-4">
                        {modeBadge[chat.mode].label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{chat.message}</p>
                </div>
                {chat.unread > 0 && (
                  <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  WhatsApp Connected
                </span>
                <span className="text-muted-foreground">Online</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  AI Provider (Qwen)
                </span>
                <span className="text-muted-foreground">Healthy</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Automation Engine
                </span>
                <span className="text-muted-foreground">3 pending</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>AI Response Rate</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Translation Usage</span>
                <span className="font-medium">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
