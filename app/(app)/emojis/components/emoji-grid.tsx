// emoji-grid.tsx

"use client"

import type { Emoji } from "@/lib/emojis/types"
import { EmojiItemCard } from "./emoji-item"
import { Skeleton } from "@/components/ui/skeleton"
import { SearchX } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface EmojiGridProps {
  emojis: Emoji[]
  favorites: Set<string>
  isLoading: boolean
  onToggleFavorite: (emoji: Emoji) => void
  onEmojiClick: (emoji: Emoji) => void
  loadEmojis: () => void
  hasMore: boolean
  lastBatchStart: number
  pageSize?: number
}

const GRID_CLASSES =
  "grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 p-4"

function LoadingState({ pageSize = 100 }: { pageSize?: number }) {
  return (
    <div className={GRID_CLASSES}>
      {Array.from({ length: pageSize }).map((_, i) => (
        <div key={i} className="rounded-xl bg-secondary p-3">
          <Skeleton
            className="w-full aspect-square rounded-lg skeleton-wave"
            style={{ animationDelay: `${i * 60}ms` }}
          />
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
  loadEmojis,
  hasMore,
  lastBatchStart,
  pageSize = 100
}: EmojiGridProps) {

  if (isLoading && emojis.length === 0) {
    return <LoadingState pageSize={pageSize} />
  }

  if (emojis.length === 0) {
    return (
      <div className="flex-1 p-4">
        <NoResults />
      </div>
    )
  }

  const grouped = emojis.reduce<Record<string, Emoji[]>>((acc, emoji) => {
    const key = `${emoji.category}-${emoji.subgroup}`
    if (!acc[key]) acc[key] = []
    acc[key].push(emoji)
    return acc
  }, {})

  return (
    <ScrollArea className="flex-1 min-h-0">
      <div className="flex flex-col gap-6">
        {Object.entries(grouped).map(([key, groupEmojis]) => (
          <section key={key}>
            <h3 className="mb-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {groupEmojis[0].subgroup}
            </h3>

            <div className={GRID_CLASSES}>
              {groupEmojis.map((emoji) => {
                const globalIndex = emojis.findIndex(
                  (e) => e.id === emoji.id
                )

                const isNew = globalIndex >= lastBatchStart
                const isFavorite = favorites.has(emoji.codepoint)

                return (
                  <div
                    key={emoji.id}
                    className={`transition-opacity duration-500 ${
                      isNew ? "opacity-0 animate-fade-in" : "opacity-100"
                    }`}
                    style={{
                      animationDelay: isNew
                        ? `${(globalIndex - lastBatchStart) * 10}ms`
                        : "0ms"
                    }}
                  >
                    <EmojiItemCard
                      emoji={emoji}
                      isFavorite={isFavorite}
                      onToggleFavorite={onToggleFavorite}
                      onEmojiClick={onEmojiClick}
                    />
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        {/* Append skeletons with wave */}
        {isLoading && emojis.length > 0 && (
          <div className={GRID_CLASSES}>
            {Array.from({ length: pageSize }).map((_, i) => (
              <div
                key={`append-skeleton-${i}`}
                className="rounded-xl bg-secondary p-3"
              >
                <Skeleton
                  className="w-full aspect-square rounded-lg skeleton-wave"
                  style={{ animationDelay: `${i * 60}ms` }}
                />
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center py-6">
            <button
              onClick={() => loadEmojis()}
              disabled={isLoading}
              className="rounded-lg bg-secondary px-4 py-2 text-sm hover:bg-secondary/80 disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}

        {!hasMore && (
          <div className="text-center py-6 text-xs text-muted-foreground">
            No more emojis
          </div>
        )}
      </div>
    </ScrollArea>
  )
}