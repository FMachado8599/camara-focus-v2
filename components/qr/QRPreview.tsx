"use client"

import { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"

import { QROptions } from "@/lib/qr/types"
import { createQR } from "@/lib/qr/create"
import { updateQR } from "@/lib/qr/update"

type QRPreviewProps = {
  options: QROptions
}

export function QRPreview({ options }: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const qrRef = useRef<QRCodeStyling | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (qrRef.current) return

    const qr = createQR(options)
    qr.append(containerRef.current)
    qrRef.current = qr
  }, [])

  useEffect(() => {
    if (!qrRef.current) return

    updateQR(qrRef.current, options)
  }, [options])

  return (
    <div className="flex items-center justify-center">
      <div ref={containerRef} />
    </div>
  )
}
