"use client"

import { useState } from "react"
// import { QRCard } from "./QRCard"
import { BarcodeListViewToggle } from "./BarcodeListViewToggle"
import { QRListItem } from "@/lib/qr/types"

type Props = {
  qrs: QRListItem[]
  onDelete: (id: string) => void
}

export function BarcodeList({ qrs, onDelete }: Props) {
  const [view, setView] = useState<"list" | "grid">("list")

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <BarcodeListViewToggle
          view={view}
          onChange={setView}
        />
      </div>

      {/* <div
        className={
          view === "grid"
            ? "grid grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {qrs.map((qr) => (
          <QRCard
            key={qr.id}
            qr={qr}
            view={view}
            onDelete={onDelete}
          />
        ))}
      </div> */}
    </div>
  )
}
