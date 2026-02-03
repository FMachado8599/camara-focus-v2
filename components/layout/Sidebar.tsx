// components/layout/Sidebar.tsx
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { NAV_ITEMS } from "@/lib/sidebar/labels"

type SidebarProps = {
  collapsed: boolean
}

export function Sidebar({ collapsed }: SidebarProps) {

  const pathname = usePathname()

  return (
    <aside
      className={clsx(
        "transition-all duration-200 border-r bg-surface",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-full flex flex-col p-4">
        {/* Logo / Title */}
        <div className="mb-6 text-sm font-semibold">
          {collapsed ? "CF" : "Camara Focus"}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 text-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-md px-3 py-2 transition-colors",
                  isActive
                    ? "bg-primary text-foreground"
                    : "hover:bg-surface-muted"
                )}
              >
                {collapsed ? item.label.charAt(0) : item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
