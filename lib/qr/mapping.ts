import { QueryDocumentSnapshot } from "firebase/firestore"
import { QRListItem } from "./types"

export function mapDocToQRListItem(
  doc: QueryDocumentSnapshot
): QRListItem {
  const d = doc.data()

  return {
    id: doc.id,
    name: d.name ?? "Sin nombre",
    options: d.options,
    link: {
      brand: d.link?.brand ?? "",
      slugResolved: d.link?.slugResolved ?? "",
      targetUrl: d.link?.targetUrl ?? "",
    },
    updatedAt: d.updatedAt?.toDate?.() ?? null,
    createdAt: d.createdAt?.toDate?.() ?? null,
  }
}
