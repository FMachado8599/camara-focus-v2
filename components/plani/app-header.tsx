"use client"

import { useState } from "react"
import { usePosts } from "@/context/post-context"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Instagram } from "lucide-react"
import { format } from "date-fns"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
    </svg>
  )
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export function AppHeader() {
  const {
    brandName,
    setBrandName,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    posts,
  } = usePosts()
  const [isEditingBrand, setIsEditingBrand] = useState(false)

  const totalPosts = posts.length
  const instagramPosts = posts.filter((p) =>
    p.platforms.includes("instagram")
  ).length
  const tiktokPosts = posts.filter((p) =>
    p.platforms.includes("tiktok")
  ).length

  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Brand name + title */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              {isEditingBrand ? (
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  onBlur={() => setIsEditingBrand(false)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setIsEditingBrand(false)
                  }
                  autoFocus
                  className="h-8 w-48 text-sm font-semibold"
                />
              ) : (
                <button
                  onClick={() => setIsEditingBrand(true)}
                  className="text-lg font-bold text-foreground hover:text-foreground/80 transition-colors"
                  title="Click to edit brand name"
                >
                  {brandName}
                </button>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Instagram className="w-4 h-4" />
                <TikTokIcon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {brandName} &ndash; {MONTHS[selectedMonth]} {selectedYear}
            </p>
          </div>

          {/* Right: Month selector + stats */}
          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="bg-muted px-2.5 py-1 rounded-md font-medium">
                {totalPosts} posts
              </span>
              <span className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md">
                <Instagram className="w-3 h-3" />
                {instagramPosts}
              </span>
              <span className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md">
                <TikTokIcon className="w-3 h-3" />
                {tiktokPosts}
              </span>
            </div>

            {/* Month selector */}
            <Select
              value={String(selectedMonth)}
              onValueChange={(val) => setSelectedMonth(Number(val))}
            >
              <SelectTrigger className="w-36 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((month, i) => (
                  <SelectItem key={i} value={String(i)}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year selector */}
            <Select
              value={String(selectedYear)}
              onValueChange={(val) => setSelectedYear(Number(val))}
            >
              <SelectTrigger className="w-24 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2025, 2026, 2027].map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  )
}
