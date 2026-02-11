// hooks/useBrands.ts
"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "@/services/firebase"

type Brand = {
  id: string
  name: string
  slug: string
}

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "brands"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Brand[]

        setBrands(data)
      }
    )

    return () => unsubscribe()
  }, [])

  return { brands }
}
