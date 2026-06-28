import { useState } from "react"
import { Search, UserPlus, Phone, Mail, MapPin, Tag, MoreHorizontal, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Contact {
  id: string
  name: string
  phone: string
  email: string
  location: string
  labels: string[]
  business: string
  lastContact: string
}

const contacts: Contact[] = [
  { id: "1", name: "Maria Garcia", phone: "+1 555-0123", email: "maria@example.com", location: "Miami, FL", labels: ["VIP", "Repeat"], business: "Retail", lastContact: "2h ago" },
  { id: "2", name: "John Smith", phone: "+1 555-0456", email: "john@example.com", location: "New York, NY", labels: ["Lead"], business: "B2B", lastContact: "1d ago" },
  { id: "3", name: "Sarah Lee", phone: "+1 555-0789", email: "sarah@example.com", location: "Los Angeles, CA", labels: ["VIP"], business: "E-commerce", lastContact: "5h ago" },
  { id: "4", name: "Carlos Ruiz", phone: "+1 555-0321", email: "carlos@example.com", location: "Houston, TX", labels: ["New", "Lead"], business: "Service", lastContact: "3d ago" },
  { id: "5", name: "Emily Chen", phone: "+1 555-0654", email: "emily@example.com", location: "Seattle, WA", labels: ["Repeat"], business: "Retail", lastContact: "1h ago" },
  { id: "6", name: "David Park", phone: "+1 555-0987", email: "david@example.com", location: "Chicago, IL", labels: ["VIP", "Referral"], business: "B2B", lastContact: "12h ago" },
  { id: "7", name: "Lisa Wang", phone: "+1 555-0145", email: "lisa@example.com", location: "San Francisco, CA", labels: ["New"], business: "E-commerce", lastContact: "2d ago" },
  { id: "8", name: "Ahmed Hassan", phone: "+1 555-0278", email: "ahmed@example.com", location: "Dallas, TX", labels: ["Repeat", "VIP"], business: "Service", lastContact: "6h ago" },
]

const labelColors: Record<string, string> = {
  VIP: "bg-amber-100 text-amber-800",
  Lead: "bg-blue-100 text-blue-800",
  Repeat: "bg-emerald-100 text-emerald-800",
  New: "bg-purple-100 text-purple-800",
  Referral: "bg-rose-100 text-rose-800",
}

export function ContactsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selected, setSelected] = useState<Contact | null>(null)

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.business.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-96 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Contacts</h2>
            <Button size="sm"><UserPlus className="h-4 w-4 mr-1" />Add</Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search contacts..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {filtered.map(c => (
            <div key={c.id} className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors ${selected?.id === c.id ? "bg-muted" : ""}`} onClick={() => setSelected(c)}>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-sm">{c.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.lastContact}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {c.labels.slice(0, 2).map(l => (
                    <span key={l} className={`text-[10px] px-1.5 py-0.5 rounded-full ${labelColors[l] || "bg-muted"}`}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        {selected ? (
          <div className="max-w-2xl">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">{selected.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{selected.name}</h2>
                <p className="text-muted-foreground">{selected.business}</p>
                <div className="flex gap-2 mt-2">
                  {selected.labels.map(l => (
                    <Badge key={l} className={labelColors[l]}>{l}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card><CardContent className="flex items-center gap-3 p-4"><Phone className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{selected.phone}</span></CardContent></Card>
              <Card><CardContent className="flex items-center gap-3 p-4"><Mail className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{selected.email}</span></CardContent></Card>
              <Card><CardContent className="flex items-center gap-3 p-4"><MapPin className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{selected.location}</span></CardContent></Card>
              <Card><CardContent className="flex items-center gap-3 p-4"><Tag className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{selected.labels.join(", ")}</span></CardContent></Card>
            </div>
            <div className="mt-6 flex gap-2">
              <Button><MessageSquare className="h-4 w-4 mr-2" />Start Chat</Button>
              <Button variant="outline"><Phone className="h-4 w-4 mr-2" />Call</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                  <DropdownMenuItem>Add Label</DropdownMenuItem>
                  <DropdownMenuItem>Delete Contact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Select a contact to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
