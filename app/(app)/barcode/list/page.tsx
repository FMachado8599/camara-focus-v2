// app/(app)/qr/barcode/page.tsx

"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/services/firebase"

import { BarcodeListHeader } from "./components/BarcodeListHeader"
import { BarcodeList } from "./components/BarcodeList"
import { QRListItem } from "@/lib/qr/types"
import { mapDocToQRListItem } from "@/lib/qr/mapping"

export default function QRListPage() {
  const [qrs, setQrs] = useState<QRListItem[]>([])

  function handleDelete(id: string) {
    setQrs(prev => prev.filter(qr => qr.id !== id))
  }

  useEffect(() => {
    async function fetchQrs() {
      const snap = await getDocs(collection(db, "qrs"))
      const data: QRListItem[] = snap.docs.map(mapDocToQRListItem)
      setQrs(data)
    }

    fetchQrs()
  }, [])

  return (
    <div className="space-y-8">
      <BarcodeListHeader />
      <BarcodeList qrs={qrs} onDelete={handleDelete}/>
      
    </div>
  )
}
