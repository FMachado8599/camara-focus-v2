// lib/redirectKey.ts
export function normalizeSegment(v: string) {
  return v.trim().toLowerCase().replace(/\s+/g, "-")
}

export function redirectKey(brand: string, slugResolved: string) {
  return `${brand}__${slugResolved}` // simple, estable
}
