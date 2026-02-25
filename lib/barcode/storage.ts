import { BarcodeEntity } from "./barcode.types";

const STORAGE_KEY = "barcodes";

export function getBarcodes(): BarcodeEntity[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveBarcode(barcode: BarcodeEntity) {
  const existing = getBarcodes();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...existing, barcode])
  );
}

export function updateBarcode(updated: BarcodeEntity) {
  const all = getBarcodes();
  const newList = all.map((b) =>
    b.id === updated.id
      ? { ...updated, updatedAt: new Date().toISOString() }
      : b
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
}