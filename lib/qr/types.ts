//types.ts

export type QRErrorCorrectionLevel = "L" | "M" | "Q" | "H"

export type QRDotType =
  | "square"
  | "dots"
  | "rounded"
  | "classy"
  | "classy-rounded"
  | "extra-rounded"

export type QRCornerSquareType =
  | "square"
  | "dot"
  | "extra-rounded"

export type QRCornerDotType =
  | "square"
  | "dot"

export type QREditState = {
  id: string
  name: string
  options: QROptions
  link: QRLinkConfig
}

export type QRStatus = "active" | "paused"

export interface QROptions {
  data: string
  backgroundColor: string
  backgroundTransparent?: boolean
  foregroundColor: string
  exportSize: number
  margin: number

  dotsType: QRDotType
  cornersSquareType: QRCornerSquareType
  cornersDotType: QRCornerDotType

  logoImage?: string
  logoSize?: number
  logoMargin?: number
  hideBackgroundDots?: boolean

  errorCorrectionLevel: QRErrorCorrectionLevel,
}

export interface QRLinkConfig {
  brand: string
  targetUrl: string
  slug?: string
  expiresAt?: string // ISO
  status: QRStatus
}
