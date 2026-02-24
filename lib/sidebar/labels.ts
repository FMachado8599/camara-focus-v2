// lib/sidebar/nav-items.ts
import {
  LayoutDashboard,
  QrCode,
  Smile,
  PenLine,
  Presentation,
  Barcode
} from "lucide-react"

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Planifications",
    href: "/planifications",
    icon: Presentation,
  },
  {
    label: "QR",
    href: "/qr",
    icon: QrCode,
  },
  {
    label: "Barcode",
    href: "/barcode",
    icon: Barcode,
  },
  {
    label: "Emojis",
    href: "/emojis",
    icon: Smile,
  },
  {
    label: "Redaction",
    href: "/redaction",
    icon: PenLine,
  },
]
