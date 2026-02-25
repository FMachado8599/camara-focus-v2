import { NextResponse } from "next/server"
import { db } from "@/services/firebaseAdmin"

const collection = db.collection("barcodes")

// GET - listar todos
export async function GET() {
  const snapshot = await collection.orderBy("createdAt", "desc").get()

  const barcodes = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return NextResponse.json(barcodes)
}

// POST - crear
export async function POST(req: Request) {
  const body = await req.json()
  const { name, value } = body

  if (!name || !value) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    )
  }

  const docRef = await collection.add({
    name,
    value,
    createdAt: new Date(),
  })

  return NextResponse.json({ id: docRef.id })
}