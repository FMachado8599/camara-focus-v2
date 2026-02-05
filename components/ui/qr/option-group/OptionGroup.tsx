// components/ui/option-group.tsx
import { ReactNode } from "react"

interface OptionGroupProps {
  title: string
  suffix?: string
  children: ReactNode
}

export function OptionGroup({
  title,
  suffix,
  children,
}: OptionGroupProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground">
        {title} {suffix && <span className="opacity-60">({suffix})</span>}
      </h4>
      {children}
    </div>
  )
}
