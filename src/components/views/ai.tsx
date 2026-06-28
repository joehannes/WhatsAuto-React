import { useState } from "react"
import { Send, Bot, User, RefreshCw, Settings, Key, Sparkles } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  time: string
  model?: string
}

interface Provider {
  id: string
  name: string
  model: string
  status: "healthy" | "degraded" | "error"
}

const providers: Provider[] = [
  { id: "1", name: "Qwen", model: "qwen2.5-72b", status: "healthy" },
  { id: "2", name: "OpenAI", model: "gpt-4o", status: "healthy" },
  { id: "3", name: "DeepSeek", model: "deepseek-chat", status: "healthy" },
  { id: "4", name: "Ollama", model: "llama3.1:8b", status: "degraded" },
]

const chatMessages: ChatMessage[] = [
  { id: "1", role: "system", content: "System: You are a helpful AI assistant for business messaging.", time: "10:00 AM" },
  { id: "2", role: "user", content: "Help me draft a response to a customer who asked about a delayed order.", time: "10:01 AM" },
  { id: "3", role: "assistant", content: "Here's a professional response:\n\n\"Dear [Customer],\n\nThank you for reaching out. I sincerely apologize for the delay. Your order is in transit and expected to arrive tomorrow.\n\nBest regards\"\"", time: "10:01 AM", model: "qwen2.5-72b" },
  { id: "4", role: "user", content: "Can you make it more casual?", time: "10:02 AM" },
  { id: "5", role: "assistant", content: "Sure! Here's a casual version:\n\n\"Hi [Customer]! 😊\n\nThanks for getting in touch. I'm really sorry about the delay.\n\nGood news — your order is on the way and should arrive tomorrow!\n\nCheers!\"", time: "10:02 AM", model: "qwen2.5-72b" },
]

const statusColors = {
  healthy: "bg-emerald-100 text-emerald-800",
  degraded: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
}

export function AiView() {
  const [activeProvider, setActiveProvider] = useState("1")
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)

  const provider = providers.find(p => p.id === activeProvider)

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-64 border-r flex flex-col bg-muted/30">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-3">AI Providers</h2>
          <Select value={activeProvider} onValueChange={setActiveProvider}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {providers.map(p => (
                <SelectItem key={p.id} value={p.id}>
                  <div className="flex items-center gap-2">
                    <span>{p.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusColors[p.status]}`}>{p.status}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="p-4 space-y-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{provider?.name}</span>
                <Badge variant={provider?.status === "healthy" ? "default" : "secondary"}>{provider?.status}</Badge>
              </div>
              <div className="text-xs text-muted-foreground">Model: {provider?.model}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs"><span>Response Quality</span><span>94%</span></div>
                <div className="flex items-center justify-between text-xs"><span>Avg Latency</span><span>1.2s</span></div>
                <div className="flex items-center justify-between text-xs"><span>Requests Today</span><span>142</span></div>
              </div>
            </CardContent>
          </Card>
          <Button variant="outline" className="w-full">
            <Settings className="h-4 w-4 mr-2" />Configure
          </Button>
          <Button variant="ghost" className="w-full">
            <Key className="h-4 w-4 mr-2" />API Keys
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="font-medium">AI Assistant</span>
              <span className="text-xs text-muted-foreground ml-2">{provider?.name} ({provider?.model})</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            <RefreshCw className="h-3 w-3 mr-1" />Streaming
          </Badge>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className={`text-xs ${msg.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      {msg.role === "assistant" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg px-4 py-2 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] opacity-60">{msg.time}</span>
                      {msg.model && <span className="text-[10px] opacity-60">{msg.model}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {streaming && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs">AI is typing...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <Textarea
              placeholder="Ask the AI assistant..."
              className="min-h-[40px] max-h-[120px] resize-none flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button size="icon" onClick={() => { setInput(""); setStreaming(true); setTimeout(() => setStreaming(false), 2000) }}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
