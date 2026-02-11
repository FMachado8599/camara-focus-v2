// components/ui/option-group.tsx
import { ReactNode } from "react"

interface OptionGroupProps {
  title: string
  suffix?: string
  children: ReactNode
  rightSlot?: ReactNode
}

export function OptionGroup({
  title,
  suffix,
  children,
  rightSlot,
}: OptionGroupProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-muted-foreground">
          {title}{" "}
          {suffix && (
            <span className="opacity-60">
              ({suffix})
            </span>
          )}
        </h4>

        {rightSlot && (
          <div className="flex items-center">
            {rightSlot}
          </div>
        )}
      </div>

      {children}
    </div>
  )
}

