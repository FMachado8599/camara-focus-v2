import { createQR } from "./create"
import { QROptions } from "./types"

type ExportFormat = "png" | "svg"

export function exportQR(
  options: QROptions,
  format: ExportFormat
) {
  const qr = createQR({
    options,
    size: options.exportSize,
  })

  qr.download({
    extension: format,
    name: `qr-${format}`,
  })
}
