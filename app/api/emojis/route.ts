import { db } from "@/services/firebaseAdmin"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")

  console.log("Category param:", category)

  const collection = db.collection("emojis")

  

  const snapshot = category
    ? await collection.where("category", "==", category).get()
    : await collection.get()
    
snapshot.docs.forEach(doc => {
  console.log(doc.data().category)
})

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))

  console.log("Category param:", category)

  return Response.json(data)
}