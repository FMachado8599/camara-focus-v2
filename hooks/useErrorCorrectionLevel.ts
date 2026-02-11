import { useEffect } from "react"
import { QREditState } from "@/lib/qr/types"

export function useQRErrorCorrection(
  qr: QREditState,
  setQr: React.Dispatch<React.SetStateAction<QREditState>>
) {
  useEffect(() => {
    if (!qr.options.logoImage) return

    if (qr.options.errorCorrectionLevel === "H") return

    setQr((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        errorCorrectionLevel: "H",
      },
    }))
  }, [qr.options.logoImage])
}