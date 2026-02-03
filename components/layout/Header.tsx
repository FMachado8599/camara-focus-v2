// components/layout/Header.tsx
import { Button } from "@/components/ui/button"

type HeaderProps = {
  collapsed: boolean
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
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
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* acciones futuras */}
      </div>
    </header>
  )
}
