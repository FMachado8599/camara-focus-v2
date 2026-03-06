//favorites.tsx

"use client"

import { Star, Heart } from "lucide-react"
import type { Emoji } from "@/lib/emojis/types"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EmojiItemCard } from "./emoji-item"

interface FavoritesRowProps {
  favorites: Emoji[]
  onToggleFavorite: (emoji: Emoji) => void
  onEmojiClick: (emoji: Emoji) => void
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
            {favorites.map((emoji) => (
              <EmojiItemCard
                key={emoji.codepoint}
                emoji={emoji}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onEmojiClick={onEmojiClick}
              />
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
