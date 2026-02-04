"use client"

import { useState } from "react"
import { QRPreview } from "@/components/qr/QRPreview"
import { QRConfig } from "@/components/qr/QRConfig"
import { DEFAULT_QR_OPTIONS } from "@/lib/qr/defaults"
import { QROptions } from "@/lib/qr/types"

export default function QRPage() {
  const [options, setOptions] = useState<QROptions>(
    DEFAULT_QR_OPTIONS
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <QRConfig
        options={options}
        onChange={setOptions}
      />
      <QRPreview
        options={options}
      />
    </div>
  )
}
