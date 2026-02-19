import { doc, deleteDoc } from "firebase/firestore"
import { db } from "@/services/firebase" // ajustá el path a tu config

export async function deleteQRFromFirestore(id: string) {
  try {
    await deleteDoc(doc(db, "qrs", id))
  } catch (error) {
    console.error("Error deleting QR:", error)
    throw error
  }
}
