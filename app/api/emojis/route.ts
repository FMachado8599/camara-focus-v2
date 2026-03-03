// /api/emojis/route.ts

import { db } from "@/services/firebaseAdmin"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const category = searchParams.get("category")
  const cursor = searchParams.get("cursor")
  const limit = Number(searchParams.get("limit")) || 100

  let query = db
    .collection("emojis")
    .orderBy("createdAt") // ⚠️ campo obligatorio para paginar
    .limit(limit)

  if (category) {
    query = query.where("category", "==", category)
  }

  if (cursor) {
    const cursorDoc = await db.collection("emojis").doc(cursor).get()
    if (cursorDoc.exists) {
      query = query.startAfter(cursorDoc)
    }
  }

  const snapshot = await query.get()

  const emojis = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))

  const lastDoc = snapshot.docs[snapshot.docs.length - 1]

  return Response.json({
    emojis,
    nextCursor: lastDoc ? lastDoc.id : null,
    hasMore: snapshot.size === limit,
  })
}