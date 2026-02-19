// app/(app)/qr/list/page.tsx

"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/services/firebase"

import { QRListHeader } from "./components/QRListHeader"
import { QRList } from "./components/QRList"
import { QRListItem } from "@/lib/qr/types"
import { mapDocToQRListItem } from "@/lib/qr/mapping"

export default function QRListPage() {
  const [qrs, setQrs] = useState<QRListItem[]>([])

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
      <QRListHeader />
      <QRList qrs={qrs} />
    </div>
  )
}


