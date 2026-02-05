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

export interface QROptions {
  data: string
  backgroundColor: string
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
