//update.ts

import QRCodeStyling from "qr-code-styling"
import { QROptions } from "./types"

export function updateQR(qr: QRCodeStyling, options: QROptions) {

  const hasLogo = !!options.logoImage


  qr.update({
    data: options.data,

  qrOptions: {
    errorCorrectionLevel: hasLogo
      ? "H"
      : options.errorCorrectionLevel,
  },

    margin: options.margin,

    image: options.logoImage,
    imageOptions: options.logoImage
      ? {
          imageSize: options.logoSize ?? 0.4,
          margin: options.logoMargin ?? 0,
          hideBackgroundDots: options.hideBackgroundDots ?? true,
        }
      : {
          // 👇 importante: NO undefined
          hideBackgroundDots: false,
        },


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


