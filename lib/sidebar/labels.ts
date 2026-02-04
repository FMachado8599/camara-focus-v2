// lib/sidebar/nav-items.ts
import {
  LayoutDashboard,
  QrCode,
  Smile,
  PenLine,
} from "lucide-react"

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "QR",
    href: "/qr",
    icon: QrCode,
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
