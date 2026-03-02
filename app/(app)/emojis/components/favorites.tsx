"use client"

import { Star, Heart } from "lucide-react"
import type { EmojiItem } from "@/lib/emojis/emoji-data"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface FavoritesRowProps {
  favorites: EmojiItem[]
  onToggleFavorite: (emoji: EmojiItem) => void
  onEmojiClick: (emoji: EmojiItem) => void
}

export function FavoritesRow({ favorites, onToggleFavorite, onEmojiClick }: FavoritesRowProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Star className="h-3.5 w-3.5 text-warning fill-warning" />
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Favorites
        </h2>
        {favorites.length > 0 && (
          <span className="text-xs text-muted-foreground/60">
            {favorites.length}
          </span>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-secondary/50 px-4 py-3">
          <Heart className="h-3.5 w-3.5 text-muted-foreground/50" />
          <p className="text-xs text-muted-foreground/60">
            Star emojis to add them here
          </p>
        </div>
      ) : (
        <ScrollArea className="w-full">
          <div className="flex gap-1 pb-2">
            {favorites.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onEmojiClick(item)}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      onToggleFavorite(item)
                    }}
                    className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary transition-all hover:bg-accent hover:scale-110"
                    aria-label={item.name}
                  >
                    <span className="text-xl leading-none" role="img" aria-label={item.name}>
                      {item.emoji}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleFavorite(item)
                      }}
                      className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-card opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Remove ${item.name} from favorites`}
                    >
                      <X className="h-2 w-2 text-muted-foreground" />
                    </button>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  )
}

function X({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
