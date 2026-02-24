// app/(app)/barcode/page.tsx

import { redirect } from "next/navigation"

export default function QRIndexPage() {
  redirect("/barcode/list")
}