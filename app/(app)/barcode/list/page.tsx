"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BarcodeEntity } from "@/lib/barcode/barcode.types"
import { useBarcode } from "../hooks/useBarcode"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BarcodeListPage() {
  const router = useRouter()
  const { list, remove, loading } = useBarcode()
  const [barcodes, setBarcodes] = useState<BarcodeEntity[]>([])

  useEffect(() => {
    async function load() {
      const data = await list()
      setBarcodes(data)
    }

    load()
  }, [])

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Barcodes</h1>
        <Button onClick={() => router.push("/barcode/create")}>
          Crear código
        </Button>
      </div>

      {loading && (
        <div className="text-sm text-muted-foreground">
          Cargando...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {barcodes.map((barcode) => (
          <Card
            key={barcode.id}
            className="cursor-pointer hover:shadow-md transition"
          >
            <CardHeader
              onClick={() =>
                router.push(`/barcode/create?id=${barcode.id}`)
              }
            >
              <CardTitle className="text-base">
                {barcode.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {barcode.value}
              </span>

              <Button
                size="sm"
                variant="destructive"
                onClick={async () => {
                  await remove(barcode.id)
                  const updated = await list()
                  setBarcodes(updated)
                }}
              >
                Borrar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}