//defaults.ts

import { QROptions } from "./types"
import { QRLinkConfig } from "./types"

// ------VISUAL------

export const DEFAULT_QR_OPTIONS: QROptions = {
  data: "https://www.camaratbwa.com",

  foregroundColor: "#000000",
  backgroundColor: "#ffffff",
  backgroundTransparent: false,

  exportSize: 1000,
  margin: 0,

  dotsType: "square", //square, dots, rounded, classy, classy-rounded, extra-rounded
  cornersSquareType: "square", //square, dot, extra-rounded
  cornersDotType: "square", // square, dot

  logoImage: undefined,
  logoSize: 0.4,
  logoMargin: 0,

  errorCorrectionLevel: "M",
}

// ------LINK------

export const DEFAULT_QR_LINK_CONFIG: QRLinkConfig = {
  brand: "",
  targetUrl: "",
  slug: undefined,
  expiresAt: undefined,
  status: "active",
}



