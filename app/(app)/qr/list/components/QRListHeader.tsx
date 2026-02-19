"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function QRListHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">
        Listado de QR's
      </h1>

      <Button asChild>
        <Link href="/qr/create">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo QR
        </Link>
      </Button>
    </div>
  )
}
