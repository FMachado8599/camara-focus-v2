"use client"

import { useState } from "react"
import { QRCard } from "./QRCard"
import { QRListViewToggle } from "./QRListViewToggle"
import { QRListItem } from "@/lib/qr/types"

type Props = {
  qrs: QRListItem[]
}

export function QRList({ qrs }: Props) {
  const [view, setView] = useState<"list" | "grid">("list")

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <QRListViewToggle
          view={view}
          onChange={setView}
        />
      </div>

      <div
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
          />
        ))}
      </div>
    </div>
  )
}
