import QRCodeStyling from "qr-code-styling"
import { QROptions } from "./types"

export function updateQR(
  qr: QRCodeStyling,
  options: QROptions
) {
  qr.update({
    data: options.data,

    image: options.logoImage,

    dotsOptions: {
      type: options.dotsType,
      color: options.foregroundColor,
    },

    backgroundOptions: {
      color: options.backgroundColor,
    },

    cornersSquareOptions: {
      type: options.cornersSquareType,
      color: options.foregroundColor,
    },

    cornersDotOptions: {
      type: options.cornersDotType,
      color: options.foregroundColor,
    },
  })
}

