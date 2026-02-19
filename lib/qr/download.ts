import QRCodeStyling from "qr-code-styling"
import { QROptions } from "./types"

export type ExportFormat = "png" | "svg"

export async function downloadQR(
  qr: QRCodeStyling,
  options: QROptions,
  format: ExportFormat
) {
  const hasLogo = !!options.logoImage

  const originalWidth = (qr as any)._options.width
  const originalHeight = (qr as any)._options.height

  qr.update({
    width: options.exportSize,
    height: options.exportSize,

    qrOptions: {
      errorCorrectionLevel: hasLogo
        ? "H"
        : options.errorCorrectionLevel,
    },
  })

  await new Promise((r) => setTimeout(r, 50))

  qr.download({
    extension: format,
    name: "qr",
  })

  qr.update({
    width: originalWidth,
    height: originalHeight,
  })
}
