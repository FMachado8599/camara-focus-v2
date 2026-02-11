// hooks/useRedirectData.ts
import { useEffect} from "react"
import { QREditState } from "@/lib/qr/types"

const PLACEHOLDER_QR_DATA = "https://camara-redirect.com/preview"

export function useQRRedirectData(
  qr: QREditState,
  setQr: React.Dispatch<React.SetStateAction<QREditState>>
) {
  const isValidUrl = (value: string) => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  const resolvedSlug = qr.link.slug?.trim() || qr.id

  const hasBrand = qr.link.brand.trim() !== ""

  const previewUrl = hasBrand
    ? `https://camara-redirect.com/${qr.link.brand}/${resolvedSlug}`
    : `https://camara-redirect.com/${resolvedSlug}`

  const nextData = previewUrl


  useEffect(() => {
    if (qr.options.data === nextData) return

    setQr((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        data: nextData,
      },
    }))
  }, [nextData])

  return {
    previewUrl
  }
}
