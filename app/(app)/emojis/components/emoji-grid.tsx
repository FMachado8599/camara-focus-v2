"use client"

import type { Emoji } from "@/lib/emojis/types"
import { EmojiItemCard } from "./emoji-item"
import { Skeleton } from "@/components/ui/skeleton"
import { SearchX, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EmojiGridProps {
  emojis: Emoji[]
  favorites: Set<string>
  isLoading: boolean
  onToggleFavorite: (emoji: Emoji) => void
  onEmojiClick: (emoji: Emoji) => void
}

function LoadingState() {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 rounded-xl bg-secondary p-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="hidden h-2 w-12 rounded md:block" />
        </div>
      ))}
    </div>
  )
}

function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
        <SearchX className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">No emojis found</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Try a different search term or category
        </p>
      </div>
    </div>
  )
}

export default function EmojiGrid({
  emojis,
  favorites,
  isLoading,
  onToggleFavorite,
  onEmojiClick,
}: EmojiGridProps) {
  if (isLoading) {
    return (
      <div className="flex-1 p-4">
        <div className="mb-4 flex items-center gap-2">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Loading emojis...</span>
        </div>
        <LoadingState />
      </div>
    )
  }

  if (emojis.length === 0) {
    return (
      <div className="flex-1 p-4">
        <NoResults />
      </div>
    )
  }

  // Group emojis by subgroup for organized display
  const grouped = emojis.reduce<Record<string, Emoji[]>>((acc, emoji) => {
    const key = `${emoji.category}-${emoji.subgroup}`
    if (!acc[key]) acc[key] = []
    acc[key].push(emoji)
    return acc
  }, {})

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-6 p-4">
        {Object.entries(grouped).map(([key, groupEmojis]) => (
          <section key={key}>
            <h3 className="mb-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {groupEmojis[0].subgroup}
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
              {groupEmojis.map((emoji) => (
                <EmojiItemCard
                  key={emoji.name}
                  emoji={emoji}
                  isFavorite={favorites.has(emoji.name)}
                  onToggleFavorite={onToggleFavorite}
                  onEmojiClick={onEmojiClick}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </ScrollArea>
  )
}

