"use client"

import { Button } from "@/components/ui/button"
import { LayoutList, LayoutGrid } from "lucide-react"

type Props = {
  view: "list" | "grid"
  onChange: (v: "list" | "grid") => void
}

export function BarcodeListViewToggle({ view, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="icon"
        onClick={() => onChange("list")}
      >
        <LayoutList className="w-4 h-4" />
      </Button>

      <Button
        variant={view === "grid" ? "default" : "outline"}
        size="icon"
        onClick={() => onChange("grid")}
      >
        <LayoutGrid className="w-4 h-4" />
      </Button>
    </div>
  )
}