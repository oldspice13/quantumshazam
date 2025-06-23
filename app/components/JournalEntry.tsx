"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface JournalEntryProps {
  prompt: string
  onSave: (content: string) => void
  initialContent?: string
}

export function JournalEntry({ prompt, onSave, initialContent = "" }: JournalEntryProps) {
  const [content, setContent] = useState(initialContent)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (content !== initialContent) {
        setIsSaving(true)
        onSave(content)
        setLastSaved(new Date())
        setIsSaving(false)
      }
    }, 1000)

    return () => clearTimeout(saveTimeout)
  }, [content, initialContent, onSave])

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Journal Prompt</h3>
          <p className="text-muted-foreground">{prompt}</p>
        </div>

        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your thoughts here..."
            className="w-full h-48 p-4 rounded-lg border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {isSaving ? (
              "Saving..."
            ) : lastSaved ? (
              `Last saved at ${lastSaved.toLocaleTimeString()}`
            ) : null}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => onSave(content)}
            disabled={content === initialContent}
          >
            Save Entry
          </Button>
        </div>
      </div>
    </Card>
  )
} 