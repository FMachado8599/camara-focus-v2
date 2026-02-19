// lib/qr/fetch.ts

import { doc, getDoc, getDocs, collection } from "firebase/firestore"
import { db } from "@/services/firebase"
import { QREditState, QRListItem } from "./types"

export async function getQRById(
  id: string
): Promise<QREditState | null> {
  try {
    const ref = doc(db, "qrs", id)
    const snap = await getDoc(ref)

    if (!snap.exists()) return null

    const data = snap.data()

    return {
      id: snap.id,
      name: data.name,
      options: data.options,
      link: data.link,
    } as QREditState
  } catch (error) {
    console.error("Error fetching QR:", error)
    return null
  }
}

export async function getAllQRs(): Promise<QRListItem[]> {
  const snapshot = await getDocs(collection(db, "qrs"))

  return snapshot.docs.map((doc) => {
    const data = doc.data()
    console.log("DOC DATA", data)

    return {
      id: doc.id,
      name: data.name,
      options: data.options, // 🔥 ESTO FALTABA
      link: data.link,
      updatedAt: data.updatedAt ?? null,
      createdAt: data.createdAt ?? null,
    }
  })
}

