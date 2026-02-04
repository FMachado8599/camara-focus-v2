import QRCodeStyling from "qr-code-styling"
import { QROptions } from "./types"

export function downloadQR(
  options: QROptions,
  format: "png" | "svg"
) {
  const qr = new QRCodeStyling({
    width: options.exportSize,
    height: options.exportSize,
    data: options.data,
    /* resto igual */
  })

  qr.download({
    extension: format,
    name: "qr-code",
  })
}

