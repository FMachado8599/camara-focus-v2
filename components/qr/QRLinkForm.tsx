"use client"

import { QREditState } from "@/lib/qr/types"
import { FormField } from "./fields/FormField"

type QRLinkFormProps = {
  qr: QREditState
  onChange: (qr: QREditState) => void
}

export default function QRLinkForm({ qr, onChange }: QRLinkFormProps) {
  const update = <K extends keyof QREditState>(
    key: K,
    value: QREditState[K]
  ) => {
    onChange({ ...qr, [key]: value })
  }

  const updateLink = <K extends keyof QREditState["link"]>(
    key: K,
    value: QREditState["link"][K]
  ) => {
    onChange({
      ...qr,
      link: { ...qr.link, [key]: value },
    })
  }

  const normalizeSegment = (value: string) =>
    value.trim().toLowerCase().replace(/\s+/g, "-")

  const isValidUrl = (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <FormField
        label="Nombre"
        value={qr.name}
        placeholder="Nombre interno del QR"
        onChange={(v) => update("name", v)}
      />

      <FormField
        label="Brand"
        value={qr.link.brand}
        placeholder="renault"
        onChange={(v) =>
          updateLink("brand", normalizeSegment(v))
        }
        hint={
          qr.link.brand.trim() === ""
            ? "El brand es necesario para generar el link."
            : undefined
        }
      />

      <FormField
        label="Destino"
        type="url"
        value={qr.link.targetUrl}
        placeholder="https://..."
        onChange={(v) => updateLink("targetUrl", v)}
        hint={
          qr.link.targetUrl && !isValidUrl(qr.link.targetUrl)
            ? "La URL no parece válida (incluí https://)."
            : undefined
        }
      />

      <FormField
        label="Slug (opcional)"
        value={qr.link.slug ?? ""}
        placeholder="promo-verano"
        onChange={(v) =>
          updateLink(
            "slug",
            v.trim() === "" ? undefined : normalizeSegment(v)
          )
        }
        hint="Si no ingresás un slug, se usará automáticamente el código del QR."
      />

      <FormField
        label="Vencimiento"
        type="date"
        value={qr.link.expiresAt ?? ""}
        onChange={(v) =>
          updateLink("expiresAt", v === "" ? undefined : v)
        }
      />
    </div>
  )
}
