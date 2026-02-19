"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Pencil, Trash, Copy } from "lucide-react"
import QRCodeStyling from "qr-code-styling"
import { getQRById } from "@/lib/qr/fetch"
import { downloadQR } from "@/lib/qr/download"
import { createQR } from "@/lib/qr/create"
import { updateQR } from "@/lib/qr/update"
import { QRListItem } from "@/lib/qr/types"

type Props = {
  qr: QRListItem
  view: "list" | "grid"
}

export function QRCard({ qr, view }: Props) {
  const brand = qr.link?.brand
  const slug = qr.link?.slugResolved
  const redirectUrl =
    brand && slug
      ? `${process.env.NEXT_PUBLIC_APP_URL}/${brand}/${slug}`
      : "#"
  const containerRef = useRef<HTMLDivElement>(null)
  const qrInstanceRef = useRef<QRCodeStyling | null>(null)

  console.log("QR CARD DATA", qr)

  useEffect(() => {
    if (!containerRef.current) return

    if (!qrInstanceRef.current) {
      qrInstanceRef.current = createQR({
        options: qr.options,
        size: 100,
      })

      qrInstanceRef.current.append(containerRef.current)
    } else {
      updateQR(qrInstanceRef.current, qr.options)
    }
  }, [qr.options])


  const handleDownload = async (format: "png" | "svg") => {
    if (!qrInstanceRef.current) return

    await downloadQR(
      qrInstanceRef.current,
      qr.options,
      format
    )
  }



  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between gap-6">

          {/* IZQUIERDA */}
          <div className="flex gap-6">
            
            {/* QR */}
            <div
              ref={containerRef}
              className="bg-white p-3 rounded-md"
            />

            {/* INFO */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-lg font-semibold">
                  {qr.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  Tipo: URL
                </p>

                <p className="text-sm text-muted-foreground">
                  Marca: {brand}
                </p>

                <p className="text-sm">
                  Creado: {qr.createdAt
                  ? qr.createdAt.toLocaleDateString("es-AR")
                  : "—"}
                </p>

                <p className="text-sm">
                  Editado: {qr.updatedAt
                  ? qr.updatedAt.toLocaleDateString("es-AR")
                  : "—"}
                </p>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  Destino: {qr.link?.targetUrl ?? "—"}
                </p>
                <p>
                  Redirect: {redirectUrl}
                </p>
              </div>
            </div>
          </div>

          {/* DERECHA */}
          <div className="flex flex-col justify-between items-end">

            <Button
            size="sm"
            onClick={() => handleDownload("svg")}
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>

            <div className="flex gap-3">
              <Link href={`/qr/${qr.id}/edit`}>
                <Pencil className="w-4 h-4 cursor-pointer" />
              </Link>

              <Trash className="w-4 h-4 cursor-pointer" />
              <Copy className="w-4 h-4 cursor-pointer" />
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
