"use client"

import { useEffect, useRef } from "react"
import { resolveEAN } from "@/lib/barcode/validate"
import { renderBarcode } from "@/lib/barcode/render"
import { defaultBarcodeConfig } from "@/lib/barcode/defaults"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  value: string
}

export default function BarcodePreview({ value }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    if (!value) return

    const result = resolveEAN(value)
    if (!result.valid || !result.value) return

    svgRef.current.innerHTML = ""

    renderBarcode(svgRef.current, result.value, defaultBarcodeConfig)
  }, [value])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center py-8">
        <svg ref={svgRef} />
      </CardContent>
    </Card>
  )
}