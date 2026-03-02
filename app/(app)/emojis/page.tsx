// /emojis/page.tsx

"use client"

import { useState, useCallback, useEffect } from "react"
import { SearchBar } from "./components/search-bar"
import { FavoritesRow } from "./components/favorites"
import { CategoryList } from "./components/category-list"
import EmojiGrid from "./components/emoji-grid"
import {
  categories,
  type Emoji,
} from "@/lib/emojis/types"
import { Separator } from "@/components/ui/separator"
import { Copy, Smile } from "lucide-react"
import { fetchEmojis } from "@/lib/emojis/fetch"
import { getEmojiPlaceholderUrl } from "@/lib/emojis/placeholders"

export default function EmojiLibrary() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>("people_and_body")
  const [activeSubgroup, setActiveSubgroup] = useState<string | null>(null)
  const [favoriteNames, setFavoriteNames] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [lastCopied, setLastCopied] = useState<string | null>(null)
  const [emojis, setEmojis] = useState<Emoji[]>([])

  const loadEmojis = useCallback(async () => {
    try {
      setIsLoading(true)

    const data = await fetchEmojis({
      category: activeCategory,
      search: query,
    })

    const filtered = await Promise.all(
      data.map(async (emoji) => {
        try {
          const imgUrl = getEmojiPlaceholderUrl(emoji.codepoint)
          const res = await fetch(imgUrl, { method: "HEAD" }) // solo revisa si existe
          if (!res.ok) throw new Error("No existe")
          return emoji
        } catch {
          return null // no existe, lo descartamos
        }
      })
    )

    setEmojis(filtered.filter(Boolean) as Emoji[])
    } catch (error) {
      console.error("Error fetching emojis:", error)
      setEmojis([])
    } finally {
      setIsLoading(false)
    }
  }, [activeCategory, query])
  
  useEffect(() => {
    loadEmojis()
  }, [loadEmojis])

  useEffect(() => {
    console.log("Categoria activa:", activeCategory)
  }, [activeCategory])

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("emoji-favorites")
      if (stored) {
        setFavoriteNames(new Set(JSON.parse(stored)))
      }
    } catch {
      // Silently handle storage errors
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "emoji-favorites",
        JSON.stringify(Array.from(favoriteNames))
      )
    } catch {
      // Silently handle storage errors
    }
  }, [favoriteNames])

  const toggleFavorite = useCallback((emoji: Emoji) => {
    setFavoriteNames((prev) => {
      const next = new Set(prev)
      if (next.has(emoji.name)) {
        next.delete(emoji.name)
      } else {
        next.add(emoji.name)
      }
      return next
    })
  }, [])

  const handleEmojiClick = useCallback((emoji: Emoji) => {
    navigator.clipboard.writeText(emoji.emoji).catch(() => {
      // Fallback: do nothing if clipboard API unavailable
    })
    setLastCopied(emoji.emoji)
    setTimeout(() => setLastCopied(null), 2000)
  }, [])

  const activeCount = emojis.length
  const activeCategoryObj = categories.find((c) => c.id === activeCategory)

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
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Search + Favorites */}
          {/* <div className="flex flex-col gap-4 border-b border-border px-5 py-4">
            <SearchBar query={query} onQueryChange={setQuery} />
            <FavoritesRow
              favorites={favoriteEmojis}
              onToggleFavorite={toggleFavorite}
              onEmojiClick={handleEmojiClick}
            />
          </div> */}

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
            favorites={favoriteNames}
            isLoading={isLoading}
            onToggleFavorite={toggleFavorite}
            onEmojiClick={handleEmojiClick}
          />
        </main>
      </div>
    </div>
  )
}
