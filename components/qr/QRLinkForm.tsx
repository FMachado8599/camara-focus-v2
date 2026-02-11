"use client"

import { QREditState } from "@/lib/qr/types"
import { FormField } from "./fields/FormField"
import { useBrands } from "@/hooks/useBrands"
import { ComboboxField } from "@/components/ui/combobox-field"
import { createBrand } from "@/services/brands"
import { normalizeSlug } from "@/lib/slug"

type QRLinkFormProps = {
  qr: QREditState
  onChange: (qr: QREditState) => void
}

export default function QRLinkForm({ qr, onChange }: QRLinkFormProps) {

  const { brands } = useBrands()

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

      <ComboboxField
        label="Brand"
        items={brands}
        value={qr.link.brand}
        placeholder="Seleccionar o crear brand"
        getLabel={(b) => b.name}
        getValue={(b) => b.slug}
        allowCreate
        onCreate={async (input) => {
          const slug = normalizeSlug(input)

          const exists = brands.some(
            (b) => b.slug === slug
          )

          if (!exists) {
            await createBrand(input)
          }

          updateLink("brand", slug)
        }}
        onChange={(v) => updateLink("brand", v)}
        hint={
          qr.link.brand.trim() === ""
            ? "El brand es obligatorio."
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
