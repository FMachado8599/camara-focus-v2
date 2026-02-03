"use client"

import { ReactNode, useState } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex justify-center p-6">
      {/* Floating container */}
      <div
        className="
          w-full
          max-w-[1440px]
          bg-surface
          rounded-xl
          border
          flex
          overflow-hidden
        "
      >
        <Sidebar collapsed={collapsed} />

        <div className="flex-1 flex flex-col">
          <Header
            collapsed={collapsed}
            onToggleSidebar={() => setCollapsed((v) => !v)}
          />

          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
