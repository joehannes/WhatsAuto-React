import { useState } from "react"
import { Mic, MicOff, Volume2, Settings, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function VoiceView() {
  const [sttEnabled, setSttEnabled] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(false)
  const [recording, setRecording] = useState(false)
  const [voiceProvider, setVoiceProvider] = useState("browser")

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Voice</h1>
        <p className="text-muted-foreground">Speech-to-text and text-to-speech</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mic className="h-4 w-4" />Speech-to-Text
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable STT</span>
              <Switch checked={sttEnabled} onCheckedChange={setSttEnabled} />
            </div>
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select value={voiceProvider} onValueChange={setVoiceProvider}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="browser">Browser Built-in</SelectItem>
                  <SelectItem value="whisper">OpenAI Whisper</SelectItem>
                  <SelectItem value="azure">Azure Speech</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center py-4">
              <Button
                size="lg"
                variant={recording ? "destructive" : "default"}
                className="rounded-full h-16 w-16"
                onClick={() => setRecording(!recording)}
              >
                {recording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              {recording ? "Recording..." : "Click to start recording"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Volume2 className="h-4 w-4" />Text-to-Speech
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable TTS</span>
              <Switch checked={ttsEnabled} onCheckedChange={setTtsEnabled} />
            </div>
            <div className="space-y-2">
              <Label>Voice</Label>
              <Select defaultValue="default">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center py-4">
              <Button variant="outline" className="rounded-full h-16 w-16">
                <Headphones className="h-6 w-6" />
              </Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">Preview voice output</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          <Settings className="h-8 w-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">Voice features are in development</p>
          <p className="text-xs mt-1">Configure microphone and speech providers</p>
        </CardContent>
      </Card>
    </div>
  )
}
