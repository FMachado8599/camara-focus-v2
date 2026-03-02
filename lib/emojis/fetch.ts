// /lib/emojis/fetch.ts

import type { Emoji } from "./types"

export type FetchEmojisParams = {
  category?: string | null
  search?: string
}

export async function fetchEmojis({
  category,
  search,
}: FetchEmojisParams): Promise<Emoji[]> {
  const params = new URLSearchParams()

  if (category) params.append("category", category)
  if (search?.trim()) params.append("search", search.trim())

  const url = `/api/emojis${params.toString() ? `?${params.toString()}` : ""}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch emojis")
  }

  return res.json()
}