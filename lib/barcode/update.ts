import { BarcodeEntity } from "./barcode.types";
import { getBarcodes } from "./storage";

export function updateBarcodeEntity(
  id: string,
  updates: Partial<Omit<BarcodeEntity, "id" | "createdAt">>
): BarcodeEntity | null {
  const all = getBarcodes();

  const index = all.findIndex((b) => b.id === id);
  if (index === -1) return null;

  const updated: BarcodeEntity = {
    ...all[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  all[index] = updated;

  localStorage.setItem("barcodes", JSON.stringify(all));

  return updated;
}