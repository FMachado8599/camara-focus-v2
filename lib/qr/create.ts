//create.ts

import QRCodeStyling from "qr-code-styling"
import { QROptions } from "./types"

type CreateQRParams = {
  options: QROptions
  size: number
  margin?: number
}

export function createQR({ options, size, margin = 0 }: CreateQRParams) {
  return new QRCodeStyling({
    width: size,
    height: size,
    data: options.data,

    margin: margin,

    qrOptions: {
      errorCorrectionLevel: options.logoImage
        ? "H"
        : options.errorCorrectionLevel,
    },

    image: options.logoImage,

    imageOptions: options.logoImage
      ? {
          imageSize: options.logoSize ?? 0.4,
          margin: options.logoMargin ?? 0,
          hideBackgroundDots: options.hideBackgroundDots
        }
      : {
          hideBackgroundDots: false,
        },

    dotsOptions: {
      type: options.dotsType,
      color: options.foregroundColor,
    },

    backgroundOptions: {
      color: options.backgroundTransparent
        ? "transparent"
        : options.backgroundColor,
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
