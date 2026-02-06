//page.tsx (qr)

"use client"

import { useState, useEffect } from "react"
import { QRPreview } from "@/components/qr/QRPreview"
import { QRConfig } from "@/components/qr/QRConfig"
import { QREditState } from "@/lib/qr/types"
import { qrInitialState } from "./qrInitialState"
import QRLinkForm from "@/components/qr/QRLinkForm"
import { useQRRedirectData } from "@/hooks/useRedirectData"

export default function QRPage() {
  const [qr, setQr] = useState<QREditState>(qrInitialState())
  const { previewUrl } = useQRRedirectData(qr, setQr)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <QRPreview options={qr.options} preview={previewUrl} />

      <div className="flex flex-col gap-6">
        <QRLinkForm qr={qr} onChange={setQr} />
        <QRConfig qr={qr} onChange={setQr} />
      </div>
    </div>
  )
}

