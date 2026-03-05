// /emojis/page.tsx

"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { SearchBar } from "./components/search-bar"
import { FavoritesRow } from "./components/favorites"
import { CategoryList } from "./components/category-list"
import EmojiGrid from "./components/emoji-grid"
import { copyOrDownloadEmoji } from "@/lib/emojis/copy_or_download"
import {
  categories,
  type Emoji,
} from "@/lib/emojis/types"
import { Separator } from "@/components/ui/separator"
import { Copy, Smile } from "lucide-react"
import { fetchEmojis } from "@/lib/emojis/fetch"
import { getEmojiPlaceholderUrl } from "@/lib/emojis/placeholders"
import { useToast } from "@/context/ToastContext" 

export default function EmojiLibrary() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>("people_and_body")
  const [activeSubgroup, setActiveSubgroup] = useState<string | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [lastCopied, setLastCopied] = useState<string | null>(null)
  const [emojis, setEmojis] = useState<Emoji[]>([])
  const {success, error } = useToast()
  const [allEmojis, setAllEmojis] = useState<Emoji[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const cursorRef = useRef<string | null>(null)
  const [lastBatchStart, setLastBatchStart] = useState(0)

  useEffect(() => {
    const initLoad = async () => {
      setEmojis([]);
      setCursor(null);
      cursorRef.current = null
      setHasMore(true);
      await loadEmojis(true);
    }
    initLoad();
  }, [activeCategory, query]);

  const loadEmojis = useCallback(async (reset = false) => {
    if (!reset && isLoading) return
    if (!hasMore && !reset) return

    setIsLoading(true)

    try {
      const response = await fetchEmojis({
        category: activeCategory,
        search: query,
        cursor: reset ? null : cursorRef.current, // <-- aquí usamos la ref
        limit: 100,
      })

      const { emojis: newEmojis, nextCursor, hasMore: more } = response

      // setEmojis(prev => {
      //   const startIndex = prev.length
      //   setLastBatchStart(startIndex)
      //   return [...prev, ...newEmojis]
      // })
      setEmojis(prev => {
        const startIndex = prev.length

        const map = new Map(prev.map(e => [e.id, e]))

        newEmojis.forEach(e => {
          map.set(e.id, e)
        })

        const merged = Array.from(map.values())

        setLastBatchStart(startIndex)

        return merged
      })
      setAllEmojis(prev => reset ? newEmojis : [...prev, ...newEmojis])

      cursorRef.current = nextCursor // <-- actualizamos la ref
      setHasMore(more)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [activeCategory, query, isLoading, hasMore])

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("emoji-favorites")
      if (stored) {
        setFavoriteIds(new Set(JSON.parse(stored)))
      }
    } catch {}
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "emoji-favorites",
        JSON.stringify(Array.from(favoriteIds))
      )
    } catch {}
  }, [favoriteIds])

  const toggleFavorite = useCallback((emoji: Emoji) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)

      if (next.has(emoji.codepoint)) {
        next.delete(emoji.codepoint)
      } else {
        next.add(emoji.codepoint)
      }

      return next
    })
  }, [])

  const handleEmojiClick = useCallback(async (emoji: Emoji) => {
    try {
      const res = await copyOrDownloadEmoji(emoji.codepoint)

      if (res.mode === "clipboard") {
        success("Emoji copiado al portapapeles")
      } else {
        success("Tu navegador no permite copiar imágenes. Descargamos el emoji.")
      }
    } catch {
      error("No se pudo copiar ni descargar el emoji", "error")
    }
    setLastCopied(emoji.emoji)
    setTimeout(() => setLastCopied(null), 2000)
  }, [])

  const activeCount = emojis.length
  const activeCategoryObj = categories.find((c) => c.id === activeCategory)
  const favoriteEmojis = allEmojis.filter((emoji) =>
    favoriteIds.has(emoji.codepoint)
  )

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary">
            <Smile className="h-4 w-4 text-foreground" />
          </div>
          <h1 className="text-sm font-semibold text-foreground">Emoji Library</h1>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {lastCopied && (
            <span className="flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2 duration-200">
              <Copy className="h-3 w-3" />
              <span>Copied {lastCopied}</span>
            </span>
          )}
          <span>{emojis.length} emojis</span>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Categories */}
        <aside className="hidden w-56 shrink-0 border-r border-border md:flex md:flex-col">
          <div className="px-4 py-3">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Categories
            </h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <CategoryList
              categories={categories}
              activeCategory={activeCategory}
              activeSubgroup={activeSubgroup}
              onCategorySelect={setActiveCategory}
              onSubgroupSelect={setActiveSubgroup}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex flex-1 flex-col min-h-0">
          {/* Search + Favorites */}
          <div className="flex flex-col gap-4 border-b border-border px-5 py-4">
            <SearchBar query={query} onQueryChange={setQuery} />
            {favoriteEmojis.length > 0 && (
              <div className="border-b border-border px-5 py-4">
                <FavoritesRow
                  favorites={favoriteEmojis}
                  onToggleFavorite={toggleFavorite}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
          </div>

          {/* Filter breadcrumb */}
          <div className="flex items-center gap-2 border-b border-border px-5 py-2">
            <span className="text-xs text-muted-foreground">
              {activeCategoryObj ? (
                <>
                  <span className="text-foreground font-medium">{activeCategoryObj.name}</span>
                  {activeSubgroup && (
                    <>
                      <span className="mx-1.5 text-muted-foreground/50">/</span>
                      <span className="text-foreground font-medium">{activeSubgroup}</span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-foreground font-medium">All Emojis</span>
              )}
            </span>
            <Separator orientation="vertical" className="h-3" />
            <span className="text-xs text-muted-foreground">
              {activeCount} {activeCount === 1 ? "result" : "results"}
            </span>
          </div>

          {/* Mobile categories */}
          <div className="flex overflow-x-auto border-b border-border px-5 py-2 md:hidden">
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setActiveCategory(null)
                  setActiveSubgroup(null)
                }}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === null
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(activeCategory === cat.id ? null : cat.id)
                    setActiveSubgroup(null)
                  }}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="mr-1">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Emoji Grid */}
          <EmojiGrid
            emojis={emojis}
            favorites={favoriteIds}
            isLoading={isLoading}
            onToggleFavorite={toggleFavorite}
            onEmojiClick={handleEmojiClick}
            loadEmojis={loadEmojis}
            hasMore={hasMore}
            lastBatchStart={lastBatchStart}
          />
        </main>
      </div>
    </div>
  )
}
