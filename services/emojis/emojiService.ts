import { db } from "@/services/firebaseAdmin"

export interface Emoji {
  id: string
  name: string
  category: string
  codepoint: string
}

interface GetEmojisParams {
  category?: string
  search?: string
  limit?: number
}

export async function getEmojis({
  category,
  search,
  limit = 200,
}: GetEmojisParams): Promise<Emoji[]> {

  let ref: FirebaseFirestore.Query = db.collection("emojis")

  if (category) {
    ref = ref.where("category", "==", category)
  }

  ref = ref.limit(limit)

  const snapshot = await ref.get()

  const emojis: Emoji[] = snapshot.docs.map(doc => {
    const data = doc.data() as Omit<Emoji, "id">

    return {
      id: doc.id,
      ...data,
    }
  })

  if (search) {
    const term = search.toLowerCase()
    return emojis.filter(e =>
      e.name.toLowerCase().includes(term)
    )
  }

  return emojis
}