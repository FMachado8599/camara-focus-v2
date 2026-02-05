//defaults.ts

import { QROptions } from "./types"

export const DEFAULT_QR_OPTIONS: QROptions = {
  data: "https://www.camaratbwa.com.uy",

  foregroundColor: "#000000",
  backgroundColor: "#ffffff",

  exportSize: 1000,
  margin: 0,

  dotsType: "square", //square, dots, rounded, classy, classy-rounded, extra-rounded
  cornersSquareType: "square", //square, dot, extra-rounded
  cornersDotType: "square", // square, dot

  logoImage: undefined,
  logoSize: 0.4,

  errorCorrectionLevel: "M",
}


