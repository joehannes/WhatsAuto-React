import { useState } from "react"
import { Play, Pause, Plus, Trash2, Clock, Zap, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Rule {
  id: string
  name: string
  trigger: string
  action: string
  status: "active" | "paused" | "error"
  lastRun: string
}

interface ScheduledTask {
  id: string
  name: string
  type: string
  nextRun: string
  status: "pending" | "running" | "completed" | "failed"
}

const rules: Rule[] = [
  { id: "1", name: "Auto-respond to FAQs", trigger: "Incoming message contains 'hours' or 'price'", action: "Send FAQ response", status: "active", lastRun: "2m ago" },
  { id: "2", name: "VIP customer alert", trigger: "Contact labeled 'VIP' sends message", action: "Notify operator + draft response", status: "active", lastRun: "1h ago" },
  { id: "3", name: "After-hours auto-reply", trigger: "Message received outside business hours", action: "Send away message", status: "paused", lastRun: "3d ago" },
  { id: "4", name: "Follow-up reminder", trigger: "No reply for 24h", action: "Schedule reminder message", status: "active", lastRun: "5h ago" },
  { id: "5", name: "Lead qualification", trigger: "New contact with 'Lead' label", action: "AI qualification + CRM sync", status: "error", lastRun: "1d ago" },
]

const tasks: ScheduledTask[] = [
  { id: "1", name: "Morning greeting campaign", type: "Recurring", nextRun: "Tomorrow 9:00 AM", status: "pending" },
  { id: "2", name: "Send invoice to John Smith", type: "One-time", nextRun: "Today 3:00 PM", status: "pending" },
  { id: "3", name: "Weekly report generation", type: "Recurring", nextRun: "Friday 5:00 PM", status: "completed" },
  { id: "4", name: "Birthday message to Sarah", type: "One-time", nextRun: "Tomorrow 12:00 AM", status: "pending" },
]

const statusColors = {
  active: "bg-emerald-100 text-emerald-800",
  paused: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
  pending: "bg-blue-100 text-blue-800",
  running: "bg-purple-100 text-purple-800",
  completed: "bg-emerald-100 text-emerald-800",
  failed: "bg-red-100 text-red-800",
}

export function AutomationView() {
  const [activeTab, setActiveTab] = useState("rules")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automation</h1>
          <p className="text-muted-foreground">Rules, workflows, and scheduled tasks</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />New Rule</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="rules"><Zap className="h-4 w-4 mr-2" />Rules</TabsTrigger>
          <TabsTrigger value="scheduled"><Clock className="h-4 w-4 mr-2" />Scheduled</TabsTrigger>
          <TabsTrigger value="workflows"><MessageSquare className="h-4 w-4 mr-2" />Workflows</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          {rules.map(rule => (
            <Card key={rule.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{rule.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusColors[rule.status]}`}>{rule.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Trigger: {rule.trigger}</p>
                    <p className="text-sm text-muted-foreground">Action: {rule.action}</p>
                    <p className="text-xs text-muted-foreground">Last run: {rule.lastRun}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon"><Play className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Pause className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {tasks.map(task => (
            <Card key={task.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{task.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusColors[task.status]}`}>{task.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Type: {task.type}</p>
                    <p className="text-sm text-muted-foreground">Next run: {task.nextRun}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon"><Play className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Workflow builder coming soon</p>
              <p className="text-xs mt-1">Create visual automation flows with drag-and-drop</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
