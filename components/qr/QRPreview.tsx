//QRPReview.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import QRCodeStyling from "qr-code-styling"

import { QROptions } from "@/lib/qr/types"
import { createQR } from "@/lib/qr/create"
import { updateQR } from "@/lib/qr/update"
import { exportQR } from "@/lib/qr/export"

type QRPreviewProps = {
  options: QROptions
  preview: string
}

export function QRPreview({ options, preview }: QRPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const qrRef = useRef<QRCodeStyling | null>(null)
  const [copied, setCopied] = useState(false)
  const PREVIEW_SIZE = 300

  useEffect(() => {
    if (!containerRef.current || qrRef.current) return

    const qr = createQR({
      options,
      size: PREVIEW_SIZE,
    })

    qr.append(containerRef.current)
    qrRef.current = qr
  }, [])


  useEffect(() => {
    if (!qrRef.current) return

    qrRef.current.update({
      data: options.data,
    })
  }, [options.data])

  useEffect(() => {
  if (!qrRef.current) return

    updateQR(qrRef.current, options)
  }, [
    options.foregroundColor,
    options.backgroundColor,
    options.dotsType,
    options.cornersSquareType,
    options.cornersDotType,
    options.logoImage,
    options.errorCorrectionLevel,
  ])



  const handleDownload = (format: "png" | "svg") => {
    exportQR(options, format)
  }

  const handleCopy = async () => {
    if (!preview) return

    await navigator.clipboard.writeText(preview)
    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
  }


  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={containerRef} />
        {preview && (
          <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm flex items-center justify-between gap-3">
            <code className="break-all text-xs">{preview}</code>

            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 rounded-md border px-2 py-1 text-xs hover:bg-muted"
            >
              {copied ? "Copiado ✓" : "Copiar"}
            </button>
          </div>
        )}


      <div className="flex gap-2">
        <button
          onClick={() => handleDownload("png")}
          className="rounded-md border px-3 py-1 text-sm hover:bg-muted"
        >
          PNG
        </button>

        <button
          onClick={() => handleDownload("svg")}
          className="rounded-md border px-3 py-1 text-sm hover:bg-muted"
        >
          SVG
        </button>
      </div>
    </div>
  )
}
