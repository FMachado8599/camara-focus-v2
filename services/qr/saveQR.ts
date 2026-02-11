import { db } from "@/services/firebase"
import {
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore"
import { QREditState } from "@/lib/qr/types"
import { normalizeSegment, redirectKey } from "@/lib/redirectKey"
import { removeUndefined } from "@/lib/cleanObject"


export async function saveQR(qr: QREditState) {
  const brand = normalizeSegment(qr.link.brand || "")
  const slugResolved = normalizeSegment(qr.link.slug?.trim() || qr.id)

  if (!brand) {
    throw new Error("Brand vacío (necesito brand para validar slug).")
  }

  const qrRef = doc(db, "qrs", qr.id)
  const lockId = redirectKey(brand, slugResolved)
  const lockRef = doc(db, "redirects", lockId)

  await runTransaction(db, async (tx) => {
    const lockSnap = await tx.get(lockRef)
    const existingQrSnap = await tx.get(qrRef)

    let previousLockId: string | null = null

    if (existingQrSnap.exists()) {
      const previousData = existingQrSnap.data()
      const prevBrand = previousData.link?.brand
      const prevSlugResolved = previousData.link?.slugResolved

      if (prevBrand && prevSlugResolved) {
        previousLockId = redirectKey(prevBrand, prevSlugResolved)
      }
    }

    if (previousLockId && previousLockId !== lockId) {
      const previousLockRef = doc(db, "redirects", previousLockId)
      tx.delete(previousLockRef)
    }

    if (lockSnap.exists()) {
      const ownerQrId = lockSnap.data().qrId as string

      // si estás guardando el mismo QR, ok
      if (ownerQrId !== qr.id) {
        throw new Error(`Ese link ya existe: /${brand}/${slugResolved}`)
      }
    } else {
      // tomo el slug
      tx.set(lockRef, {
        brand,
        slugResolved,
        qrId: qr.id,
        createdAt: serverTimestamp(),
      })
    }
    const cleanData = removeUndefined({
      name: qr.name,
      link: {
        ...qr.link,
        brand,
        slugResolved,
      },
      options: qr.options,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    })

    tx.set(qrRef, cleanData, { merge: true })


  })
}
