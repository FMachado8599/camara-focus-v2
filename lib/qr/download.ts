//download.ts

import QRCodeStyling from "qr-code-styling"
import { QROptions } from "./types"

type ExportFormat = "png" | "svg"

export function downloadQR(
  qr: QRCodeStyling,
  options: QROptions,
  format: ExportFormat
) {

    const hasLogo = !!options.logoImage
    const previewSize = 300

    qr.update({
        width: options.exportSize,
        height: options.exportSize,

        margin: options.margin,

        qrOptions: {
            errorCorrectionLevel: hasLogo
            ? "H"
            : options.errorCorrectionLevel,
        },

        image: options.logoImage,

        imageOptions: hasLogo
            ? {
                imageSize: options.logoSize ?? 0.4,
                margin: options.logoMargin ?? 0,
                hideBackgroundDots: options.hideBackgroundDots ?? true,
            }
            : {
                hideBackgroundDots: false,
            },
        })
 
    qr.download({
        extension: format,
        name: `qr-${format}`,
    })
}

export type QRPreviewHandle = {
  download: (format: "png" | "svg") => void
}
