// /services/emojis/fetchEmojis.ts
import { getEmojiByCodepoint } from "@/app/api/emoji-search/route"
import type { Emoji } from "@/lib/emojis/types"

export async function fetchEmojiSearch(params: {
  category?: string | null
  search?: string
  cursor?: string | null
  limit?: number
}): Promise<{ emojis: Emoji[], nextCursor: string | null, hasMore: boolean }> {

  let emojis: Emoji[] = []

    if (params.search) {
    console.log("Buscando en Supabase:", params.search)
    const res = await fetch(`/api/emojis-search?query=${encodeURIComponent(params.search)}`)
    const data = await res.json()
    console.log("Resultados raw de Supabase:", data)

    emojis = await Promise.all(
        data.results.map(async (r: { codepoint: string, similarity: number }) => {
        const emoji = await getEmojiByCodepoint(r.codepoint)
        if (!emoji) console.warn("No encontrado en Firebase:", r.codepoint)
        return {
            ...emoji,
            similarity: r.similarity
        }
        })
    )
    } else {
    const queryParams = new URLSearchParams()
    if (params.category) queryParams.append("category", params.category)
    if (params.cursor) queryParams.append("cursor", params.cursor)
    if (params.limit) queryParams.append("limit", String(params.limit))

    const res = await fetch(`/api/emojis?${queryParams.toString()}`)
    emojis = await res.json()
    }

  return {
    emojis,
    nextCursor: null, // podés manejar cursors si querés paginación
    hasMore: false
  }
}