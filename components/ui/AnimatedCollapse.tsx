"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCollapseProps {
  isOpen: boolean
  children: ReactNode
}

export function AnimatedCollapse({
  isOpen,
  children,
}: AnimatedCollapseProps) {
  return (
    <div
      className={cn(
        "grid transition-all duration-500 ease-out",
        isOpen
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  )
}
