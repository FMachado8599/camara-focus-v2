import { NextResponse } from "next/server"
import { db } from "@/services/firebaseAdmin"

const collection = db.collection("barcodes")

// GET by id
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const doc = await collection.doc(params.id).get()

  if (!doc.exists) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    id: doc.id,
    ...doc.data(),
  })
}

// PUT - actualizar
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const { name, value } = body

  await collection.doc(params.id).update({
    name,
    value,
    updatedAt: new Date(),
  })

  return NextResponse.json({ success: true })
}

// DELETE - borrar
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await collection.doc(params.id).delete()

  return NextResponse.json({ success: true })
}