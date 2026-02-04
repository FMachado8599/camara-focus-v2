"use client"

import QRCodeStyling from "qr-code-styling"
import { QROptions } from "./types"

const PREVIEW_SIZE = 260

export function createQR(options: QROptions) {
  return new QRCodeStyling({
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
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

    imageOptions: {
      crossOrigin: "anonymous",
      margin: options.logoMargin ?? 8,
    },
  })
}
