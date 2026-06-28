import { useState } from "react"
import { Search, Send, Paperclip, Smile, Phone, Video, MoreVertical, Check, CheckCheck, Bot, User, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  mode: "human" | "assisted" | "autonomous"
}

interface Message {
  id: string
  sender: string
  content: string
  time: string
  fromMe: boolean
  status: "sent" | "delivered" | "read"
  aiGenerated?: boolean
}

const contacts: Contact[] = [
  { id: "1", name: "Maria Garcia", avatar: "", lastMessage: "Thanks for the quick response!", time: "2m", unread: 0, online: true, mode: "assisted" },
  { id: "2", name: "John Smith", avatar: "", lastMessage: "Can you send me the invoice?", time: "5m", unread: 2, online: true, mode: "autonomous" },
  { id: "3", name: "Sarah Lee", avatar: "", lastMessage: "When is the delivery arriving?", time: "12m", unread: 1, online: false, mode: "human" },
  { id: "4", name: "Carlos Ruiz", avatar: "", lastMessage: "I need to reschedule my appointment", time: "1h", unread: 0, online: false, mode: "assisted" },
  { id: "5", name: "Emily Chen", avatar: "", lastMessage: "The payment went through, thank you!", time: "2h", unread: 0, online: true, mode: "autonomous" },
  { id: "6", name: "David Park", avatar: "", lastMessage: "Do you have this in blue?", time: "3h", unread: 0, online: false, mode: "human" },
  { id: "7", name: "Lisa Wang", avatar: "", lastMessage: "I'll recommend your business to friends", time: "5h", unread: 0, online: true, mode: "assisted" },
  { id: "8", name: "Ahmed Hassan", avatar: "", lastMessage: "Shukran for the help!", time: "1d", unread: 0, online: false, mode: "autonomous" },
]

const messages: Message[] = [
  { id: "1", sender: "Maria Garcia", content: "Hi! I have a question about my order", time: "10:30 AM", fromMe: false, status: "read" },
  { id: "2", sender: "You", content: "Hello Maria! I'd be happy to help. What would you like to know?", time: "10:31 AM", fromMe: true, status: "read" },
  { id: "3", sender: "Maria Garcia", content: "When will my package arrive? I ordered it 3 days ago.", time: "10:32 AM", fromMe: false, status: "read" },
  { id: "4", sender: "You", content: "Let me check that for you. Your order #12345 is currently in transit and should arrive tomorrow by 5 PM.", time: "10:33 AM", fromMe: true, status: "read", aiGenerated: true },
  { id: "5", sender: "Maria Garcia", content: "That's great! Can I also add an item to the order?", time: "10:35 AM", fromMe: false, status: "read" },
  { id: "6", sender: "You", content: "I can help with that. What item would you like to add?", time: "10:36 AM", fromMe: true, status: "delivered", aiGenerated: true },
  { id: "7", sender: "Maria Garcia", content: "Thanks for the quick response!", time: "10:38 AM", fromMe: false, status: "sent" },
]

const modeConfig = {
  human: { icon: User, label: "Human", color: "text-muted-foreground" },
  assisted: { icon: Bot, label: "AI Assisted", color: "text-blue-500" },
  autonomous: { icon: Bot, label: "Autonomous", color: "text-emerald-500" },
}

export function ChatsView() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0])
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const mode = modeConfig[selectedContact.mode]

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Contacts list */}
      <div className="w-80 border-r flex flex-col bg-muted/30">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-3">Chats</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-muted/50 ${selectedContact.id === contact.id ? "bg-muted" : ""}`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm">{contact.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                {contact.online && (
                  <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-emerald-500 text-emerald-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm truncate">{contact.name}</span>
                  <span className="text-xs text-muted-foreground">{contact.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">{contact.unread}</Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Message thread */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-sm">{selectedContact.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{selectedContact.name}</span>
                <div className="flex items-center gap-1 text-xs">
                  <mode.icon className={`h-3 w-3 ${mode.color}`} />
                  <span className={mode.color}>{mode.label}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {selectedContact.online ? "Online" : "Last seen recently"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.fromMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <p className="text-sm">{msg.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] opacity-70">{msg.time}</span>
                    {msg.fromMe && (
                      <span>
                        {msg.status === "sent" && <Check className="h-3 w-3 opacity-70" />}
                        {msg.status === "delivered" && <CheckCheck className="h-3 w-3 opacity-70" />}
                        {msg.status === "read" && <CheckCheck className="h-3 w-3 text-blue-300" />}
                      </span>
                    )}
                    {msg.aiGenerated && (
                      <Bot className="h-3 w-3 opacity-70" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Compose */}
        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
            <Textarea
              placeholder="Type a message..."
              className="min-h-[40px] max-h-[120px] resize-none"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  setMessageInput("")
                }
              }}
            />
            <Button variant="ghost" size="icon"><Smile className="h-4 w-4" /></Button>
            <Button size="icon"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
