// /lib/emojis/fetch.ts

import type { Emoji } from "./types"

export type FetchEmojisParams = {
  category?: string | null
  search?: string
  cursor?: string | null
  limit?: number
}

export type EmojisResponse = {
  emojis: Emoji[]
  nextCursor: string | null
  hasMore: boolean
}

export async function fetchEmojis(params: {
  category?: string | null
  search?: string
  cursor?: string | null
  limit?: number
}): Promise<EmojisResponse> {
  
  const query = new URLSearchParams()

  if (params.category) query.append("category", params.category)
  if (params.cursor) query.append("cursor", params.cursor)
  if (params.limit) query.append("limit", String(params.limit))

  const res = await fetch(`/api/emojis?${query.toString()}`)

  if (!res.ok) throw new Error("Failed to fetch emojis")

  return res.json()
}