"use client"

import { Search, X } from "lucide-react"

interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search emojis..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-border bg-secondary pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/30 font-sans"
      />
      {query && (
        <button
          onClick={() => onQueryChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
