import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
]

const styles = [
  { id: "business", name: "Business", desc: "Professional, formal tone" },
  { id: "friendly", name: "Friendly", desc: "Casual, warm tone" },
  { id: "tourism", name: "Tourism", desc: "Hospitable, welcoming" },
  { id: "legal", name: "Legal", desc: "Precise, formal language" },
  { id: "hospitality", name: "Hospitality", desc: "Service-oriented, courteous" },
  { id: "custom", name: "Custom", desc: "User-defined style" },
]

export function TranslationView() {
  const [autoTranslate, setAutoTranslate] = useState(true)
  const [translateBeforeSend, setTranslateBeforeSend] = useState(false)
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("es")
  const [activeStyle, setActiveStyle] = useState("business")
  const [sampleText, setSampleText] = useState("Hello! How can I help you today?")

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Translation</h1>
        <p className="text-muted-foreground">Automatic multilingual messaging with style adaptation</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-medium">Auto-Translate</span>
                <p className="text-xs text-muted-foreground">Translate incoming and outgoing messages</p>
              </div>
              <Switch checked={autoTranslate} onCheckedChange={setAutoTranslate} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-medium">Review Before Sending</span>
                <p className="text-xs text-muted-foreground">Show translated message before sending</p>
              </div>
              <Switch checked={translateBeforeSend} onCheckedChange={setTranslateBeforeSend} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Source Language</Label>
              <Select value={sourceLang} onValueChange={setSourceLang}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(l => (
                    <SelectItem key={l.code} value={l.code}>{l.flag} {l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Language</Label>
              <Select value={targetLang} onValueChange={setTargetLang}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(l => (
                    <SelectItem key={l.code} value={l.code}>{l.flag} {l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-4 w-4" />Translation Style
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 md:grid-cols-3">
            {styles.map(s => (
              <div
                key={s.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${activeStyle === s.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                onClick={() => setActiveStyle(s.id)}
              >
                <div className="font-medium text-sm">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Preview Text</Label>
            <Textarea value={sampleText} onChange={(e) => setSampleText(e.target.value)} />
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="text-xs text-muted-foreground mb-1">Translated ({languages.find(l => l.code === targetLang)?.name}):</div>
            <div className="text-sm italic">
              {targetLang === "es" && "¡Hola! ¿Cómo puedo ayudarte hoy?"}
              {targetLang === "fr" && "Bonjour ! Comment puis-je vous aider aujourd'hui ?"}
              {targetLang === "de" && "Hallo! Wie kann ich Ihnen heute helfen?"}
              {targetLang === "ar" && "مرحباً! كيف يمكنني مساعدتك اليوم؟"}
              {targetLang === "zh" && "您好！今天有什么可以帮您的？"}
              {targetLang === "en" && "Hello! How can I help you today?"}
              {!["es", "fr", "de", "ar", "zh", "en"].includes(targetLang) && "[Translation preview not available]"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
