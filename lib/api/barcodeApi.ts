export async function getBarcodes() {
  const res = await fetch("/api/barcodes")
  if (!res.ok) throw new Error("Failed to fetch barcodes")
  return res.json()
}

export async function getBarcodeById(id: string) {
  const res = await fetch(`/api/barcodes/${id}`)
  if (!res.ok) throw new Error("Barcode not found")
  return res.json()
}

export async function createBarcode(data: {
  name: string
  value: string
}) {
  const res = await fetch("/api/barcodes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("Failed to create barcode")
  return res.json()
}

export async function updateBarcode(
  id: string,
  data: { name: string; value: string }
) {
  const res = await fetch(`/api/barcodes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error("Failed to update barcode")
  return res.json()
}

export async function deleteBarcode(id: string) {
  const res = await fetch(`/api/barcodes/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) throw new Error("Failed to delete barcode")
  return res.json()
}