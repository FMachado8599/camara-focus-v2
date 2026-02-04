// components/layout/Sidebar.tsx
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { NAV_ITEMS } from "@/lib/sidebar/labels"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
        <div className="mb-6 text-sm font-semibold">
          {collapsed ? "CF" : 'Camara\TBWA'}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 text-sm">
          <TooltipProvider delayDuration={200}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              const link = (
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative overflow-hidden",
                    isActive
                      ? "bg-primary/10 text-foreground"
                      : "hover:bg-surface-muted",
                    collapsed && "justify-center px-0"
                  )}
                >
                  {isActive && (
                    <>
                      {/* Glow */}
                      <span
                        className="
                          pointer-events-none
                          absolute right-0 top-0 bottom-0
                          w-8 bg-primary/60 blur-xl
                        "
                      />
                      {/* Core */}
                      <span
                        className="
                          pointer-events-none
                          absolute right-0 top-1 bottom-1
                          w-[3px] bg-primary rounded-r
                        "
                      />
                    </>
                  )}

                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )

              return collapsed ? (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    {link}
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div key={item.href}>{link}</div>
              )
            })}
          </TooltipProvider>
        </nav>
      </div>
    </aside>
  )
}
