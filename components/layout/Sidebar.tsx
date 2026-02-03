// components/layout/Sidebar.tsx
type SidebarProps = {
  collapsed: boolean
}

export function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      className={`
        transition-all
        duration-200
        border-r
        bg-surface
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      <div className="h-full flex flex-col p-4">
        <div className="mb-6 font-bold text-sm">
          {collapsed ? "CF" : "Camara Focus"}
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <button className="text-left">Dashboard</button>
          <button className="text-left">QR</button>
          <button className="text-left">Emojis</button>
          <button className="text-left">Writer</button>
        </nav>
      </div>
    </aside>
  )
}
