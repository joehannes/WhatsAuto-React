import { useState } from "react"
import { MapPin, Search, Star, Phone, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Lead {
  id: string
  name: string
  business: string
  category: string
  location: string
  phone: string
  rating: number
  source: string
  status: "new" | "contacted" | "qualified" | "converted"
}

const leads: Lead[] = [
  { id: "1", name: "Sunrise Bakery", business: "Bakery", category: "Food", location: "Miami, FL", phone: "+1 555-1111", rating: 4.5, source: "Google Maps", status: "new" },
  { id: "2", name: "TechFlow Solutions", business: "IT Services", category: "Technology", location: "New York, NY", phone: "+1 555-2222", rating: 4.8, source: "OpenStreetMap", status: "contacted" },
  { id: "3", name: "Ocean View Resort", business: "Hotel", category: "Hospitality", location: "Los Angeles, CA", phone: "+1 555-3333", rating: 4.2, source: "Google Maps", status: "new" },
  { id: "4", name: "Green Garden Cafe", business: "Cafe", category: "Food", location: "Seattle, WA", phone: "+1 555-4444", rating: 4.6, source: "Directory", status: "qualified" },
  { id: "5", name: "Swift Logistics", business: "Transport", category: "Logistics", location: "Chicago, IL", phone: "+1 555-5555", rating: 4.0, source: "Web Search", status: "converted" },
]

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-800",
  qualified: "bg-purple-100 text-purple-800",
  converted: "bg-emerald-100 text-emerald-800",
}

export function LeadsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [source, setSource] = useState("all")

  const filtered = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || l.category === category
    const matchesSource = source === "all" || l.source === source
    return matchesSearch && matchesCategory && matchesSource
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Discovery</h1>
          <p className="text-muted-foreground">Find potential business contacts</p>
        </div>
        <Button><Search className="h-4 w-4 mr-2" />Search</Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, location, or category..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Hospitality">Hospitality</SelectItem>
            <SelectItem value="Logistics">Logistics</SelectItem>
          </SelectContent>
        </Select>
        <Select value={source} onValueChange={setSource}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Google Maps">Google Maps</SelectItem>
            <SelectItem value="OpenStreetMap">OpenStreetMap</SelectItem>
            <SelectItem value="Directory">Directory</SelectItem>
            <SelectItem value="Web Search">Web Search</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(lead => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{lead.name}</h3>
                  <p className="text-xs text-muted-foreground">{lead.business}</p>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusColors[lead.status]}`}>{lead.status}</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-3 w-3" />{lead.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3 w-3" />{lead.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-3 w-3 text-amber-500" />{lead.rating}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{lead.source}</Badge>
                <Button variant="ghost" size="sm"><ExternalLink className="h-3 w-3" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
