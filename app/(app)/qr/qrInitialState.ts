import { DEFAULT_QR_OPTIONS, DEFAULT_QR_LINK_CONFIG } from "@/lib/qr/defaults"
import { QREditState } from "@/lib/qr/types"

export function qrInitialState(): QREditState {
  return {
    id: "",
    name: "",
    link: {
      ...DEFAULT_QR_LINK_CONFIG,
    },
    options: {
      ...DEFAULT_QR_OPTIONS,
    },
  }
}
