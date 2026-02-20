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

export type QRListItem = {
  id: string
  name: string
  options: QROptions
  link: {
    brand: string
    slugResolved: string
    targetUrl: string
  }
  updatedAt: Date | null
  createdAt: Date | null
}

export interface QROptions {
  data: string
  backgroundColor: string
  backgroundTransparent?: boolean
  foregroundColor: string

  dotsType: QRDotType
  cornersSquareType: QRCornerSquareType
  cornersDotType: QRCornerDotType

  logoImage?: string
  logoSize?: number
  logoMargin?: number
  hideBackgroundDots?: boolean

  errorCorrectionLevel: QRErrorCorrectionLevel,
}

export type QRExportOptions = {
  size: number
  margin: number
  format: "png" | "jpeg" | "svg"
}

export interface QRLinkConfig {
  brand: string
  targetUrl: string
  slug?: string
  expiresAt?: string // ISO
  status: QRStatus
}

