// app/(app)/qr/page.tsx

import { redirect } from "next/navigation"

export default function QRIndexPage() {
  redirect("/qr/list")
}
