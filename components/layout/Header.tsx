// components/layout/Header.tsx
"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"
import { Sun, Moon, Menu } from "lucide-react"

const TITLES: Record<string, string> = {
  "/app": "Dashboard",
  "/app/qr": "QR Generator",
  "/app/emojis": "Emoji Library",
  "/app/writer": "Writer",
}

type HeaderProps = {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const pathname = usePathname()
  const title = TITLES[pathname] ?? "Camara Focus"
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-14 border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
        >
          ☰
        </Button>

        <span className="text-sm font-medium">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </div>
    </header>
  )
}

