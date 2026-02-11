// app/(app)/[brand]/[slug]/page.tsx

import { redirect, notFound } from "next/navigation"
import { redirectKey, normalizeSegment } from "@/lib/redirectKey"
import { db } from "@/services/firebaseAdmin"

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ brand: string; slug: string }>
}) {
  const { brand, slug } = await params

  const brandNorm = normalizeSegment(brand)
  const slugNorm = normalizeSegment(slug)

  const lockId = redirectKey(brandNorm, slugNorm)

  const snap = await db.collection("redirects").doc(lockId).get()

  if (!snap.exists) {
    notFound()
  }

  const { qrId } = snap.data() as { qrId: string }

  const qrSnap = await db.collection("qrs").doc(qrId).get()

  if (!qrSnap.exists) {
    notFound()
  }

  const targetUrl = qrSnap.data()?.link?.targetUrl

  if (!targetUrl) {
    notFound()
  }

  redirect(targetUrl)
}
