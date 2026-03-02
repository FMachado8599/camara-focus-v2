"use client"

import { Star, Check } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { getEmojiPlaceholderUrl } from "@/lib/emojis/placeholders"
import type { Emoji } from "@/lib/emojis/types"

interface EmojiItemProps {
  emoji: Emoji
  isFavorite: boolean
  onToggleFavorite: (emoji: Emoji) => void
  onEmojiClick: (emoji: Emoji) => void
}

export function EmojiItemCard({ emoji, isFavorite, onToggleFavorite, onEmojiClick }: EmojiItemProps) {
  const [copied, setCopied] = useState(false)
  const codepoint = emoji.codepoint;
  const [url, setUrl] = useState<string | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);

  const handleClick = () => {
    onEmojiClick(emoji)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  useEffect(() => {
    const dbName = "emoji-cache";
    const storeName = "emojis";
    const key = codepoint.toLowerCase();

    const openRequest = indexedDB.open(dbName, 1);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const getReq = store.get(key);

      getReq.onsuccess = () => {
        if (getReq.result) {
          console.log(`LEIDO DESDE CACHE: ${key}`);
          setUrl(URL.createObjectURL(getReq.result));
          setExists(true);
        } else {
          const imgUrl = getEmojiPlaceholderUrl(codepoint);

          fetch(imgUrl)
            .then(res => {
              if (!res.ok) throw new Error("No existe"); 
              return res.blob();
            })
            .then(blob => {
              console.log(`LEIDO DESDE FIREBASE: ${key}`);
              setUrl(URL.createObjectURL(blob));
              setExists(true);
              const tx2 = db.transaction(storeName, "readwrite");
              tx2.objectStore(storeName).put(blob, key);
            })
            .catch(() => setExists(false)); // marca que no existe
        }
      };
    };

    openRequest.onerror = () => console.error("IndexedDB error");
  }, [codepoint]);
  
  if (exists === false) return null;
  if (exists === null) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
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
            className="group aspect-square relative flex flex-col items-center ..."
            aria-label={`${emoji.name} - click to copy`}
        >
          <img src={url} alt={`emoji ${codepoint}`} style={{ width: 50, height: 50 }} />

          {/* Favorite star overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(emoji)
            }}
            className={cn(
              "absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200",
              isFavorite
                ? "text-warning opacity-100"
                : "text-muted-foreground/40 opacity-0 group-hover:opacity-100 hover:text-warning"
            )}
            aria-label={isFavorite ? `Remove ${emoji.name} from favorites` : `Add ${emoji.name} to favorites`}
          >
            <Star className={cn("h-3 w-3", isFavorite && "fill-warning")} />
          </button>

          {/* Copied indicator */}
          {copied && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-accent/90 backdrop-blur-sm">
              <Check className="h-5 w-5 text-foreground" />
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{emoji.name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
