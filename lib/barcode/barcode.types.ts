export type BarcodeFormat = "ean13";

export interface BarcodeConfig {
  width: number;
  height: number;
  lineColor: string;
  backgroundColor: string;
  displayValue: boolean;
  fontFamily: string;
  fontSize: number;
}

export interface ExportConfig {
  format: "svg" | "png";
  pngScale: number;
}

export interface BarcodeEntity {
  id: string;
  name: string;
  value: string;
  config: BarcodeConfig;
  createdAt: string;
  updatedAt: string;
}