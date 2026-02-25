//create.ts

import { BarcodeEntity, BarcodeConfig } from "./barcode.types";
import { defaultBarcodeConfig } from "./defaults";
import { nanoid } from "nanoid";

export function createBarcode(
  name: string,
  value: string,
  config?: Partial<BarcodeConfig>
): BarcodeEntity {
  const now = new Date().toISOString();

  return {
    id: nanoid(),
    name,
    value,
    config: {
      ...defaultBarcodeConfig,
      ...config,
    },
    createdAt: now,
    updatedAt: now,
  };
}