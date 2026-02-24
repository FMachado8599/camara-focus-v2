//download.ts

import { QROptions, QRExportOptions } from "./types"
import { createQR } from "./create"

export async function downloadQR(
  designOptions: QROptions,
  exportOptions: QRExportOptions
) {
  const qr = createQR({
    options: designOptions,
    size: exportOptions.size,
    margin: exportOptions.margin,
  })

  qr.download({
    extension: exportOptions.format,
    name: "qr",
  })
}
