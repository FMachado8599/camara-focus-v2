
"use client"

import { Star, Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { getEmojiPlaceholderUrl } from "@/lib/emojis/placeholders"
import type { Emoji } from "@/lib/emojis/types"
import { downloadEmoji } from "@/lib/emojis/copy_or_download"

interface EmojiItemProps {
  emoji: Emoji
  isFavorite: boolean
  onToggleFavorite: (emoji: Emoji) => void
  onEmojiClick: (emoji: Emoji) => void
}

export function EmojiItemCard({
  emoji,
  isFavorite,
  onToggleFavorite,
  onEmojiClick
}: EmojiItemProps) {

  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

  const codepoint = emoji.codepoint
  const [url, setUrl] = useState<string | undefined>(undefined)
  const [exists, setExists] = useState<boolean | null>(null)

  async function handleDownload(emoji: Emoji) {
    await downloadEmoji(emoji.codepoint)
  }

  const handleClick = () => {
    onEmojiClick(emoji)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
    }
    setOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false)
    }, 120) // pequeño delay para evitar flicker
  }

  useEffect(() => {
    const dbName = "emoji-cache"
    const storeName = "emojis"
    const key = codepoint.toLowerCase()

    const openRequest = indexedDB.open(dbName, 1)

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName)
      }
    }

    openRequest.onsuccess = () => {
      const db = openRequest.result
      const tx = db.transaction(storeName, "readonly")
      const store = tx.objectStore(storeName)
      const getReq = store.get(key)

      getReq.onsuccess = () => {
        if (getReq.result) {
          setUrl(URL.createObjectURL(getReq.result))
          setExists(true)
        } else {
          const imgUrl = getEmojiPlaceholderUrl(codepoint)

          fetch(imgUrl)
            .then(res => {
              if (!res.ok) throw new Error("No existe")
              return res.blob()
            })
            .then(blob => {
              setUrl(URL.createObjectURL(blob))
              setExists(true)
              const tx2 = db.transaction(storeName, "readwrite")
              tx2.objectStore(storeName).put(blob, key)
            })
            .catch(() => setExists(false))
        }
      }
    }

    openRequest.onerror = () => console.error("IndexedDB error")
  }, [codepoint])

  if (!exists) return null

  const actionBtn =
  "cursor-pointer transition-all duration-200 hover:bg-accent hover:text-foreground"
  const favoriteBtn = cn(actionBtn, "hover:scale-110")

  return (
    <div
      className={cn(
        "relative inline-block emoji-card-container rounded-xl p-4",
        open && "z-50"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {/* EMOJI CARD */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleClick()
          }
        }}
        className="emoji-card aspect-square flex items-center justify-center rounded-xl cursor-pointer hover:bg-accent/90 transition-colors"
        aria-label={`${emoji.name} - click to copy`}
      >
        <img
          src={url}
          alt={emoji.name}
          width={50}
          height={50}
          draggable={false}
        />

        {copied && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-accent/90 backdrop-blur-sm pointer-events-none">
            <Check className="h-5 w-5 text-foreground" />
          </div>
        )}
      </div>

      {/* SIDE ACTION CARD */}
      <div
        className={cn(
          "absolute inset-0 grid grid-rows-2 grid-cols-2 gap-1 p-1 rounded-xl bg-background/90 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* COPY (ocupa fila completa arriba) */}
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            handleClick()
          }}
          className={cn(actionBtn, "col-span-2")}
        >
          Copy
        </Button>

        {/* FAVORITE */}
        <Button
          variant="secondary"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(emoji)
          }}
          className={favoriteBtn}
        >
          <Star
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isFavorite
                ? "fill-yellow-400 text-yellow-400 scale-110"
                : "text-muted-foreground"
            )}
          />
        </Button>

        {/* DOWNLOAD */}
        <Button
          variant="secondary"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            handleDownload(emoji)
          }}
          className={cn(actionBtn, "w-full h-full ")}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}