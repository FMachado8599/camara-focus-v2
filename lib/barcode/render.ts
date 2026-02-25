import JsBarcode from "jsbarcode";
import { BarcodeConfig } from "./barcode.types";

export function renderBarcode(
  svg: SVGSVGElement,
  value: string,
  config: BarcodeConfig
) {
  JsBarcode(svg, value, {
    format: "ean13",
    width: config.width,
    height: config.height,
    lineColor: config.lineColor,
    background: config.backgroundColor,
    displayValue: config.displayValue,
    fontSize: config.fontSize,
    font: config.fontFamily,
  });
}