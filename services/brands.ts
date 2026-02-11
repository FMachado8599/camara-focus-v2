import { collection, getDocs, setDoc, doc
 } from "firebase/firestore"
import { db } from "@/services/firebase"
import { normalizeSlug } from "@/lib/slug"

export async function getBrands() {
  const snapshot = await getDocs(collection(db, "brands"))

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export async function getBrandLogos(brandSlug: string) {
  const snapshot = await getDocs(
    collection(db, "brands", brandSlug, "logos")
  )

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export async function createBrand(name: string) {
  const slug = normalizeSlug(name)

  const ref = doc(collection(db, "brands"), slug)

  await setDoc(ref, {
    name,
    slug,
    createdAt: new Date(),
  })

  return slug
}