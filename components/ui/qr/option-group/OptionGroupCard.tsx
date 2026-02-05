// components/ui/card-option-group.tsx
import { cn } from "@/lib/utils"

interface CardOption<T extends string | number> {
  label: string
  value: T
}

interface CardOptionGroupProps<T extends string | number> {
  value: T
  options: CardOption<T>[]
  onChange: (value: T) => void
}

export function CardOptionGroup<T extends string | number>({
  value,
  options,
  onChange,
}: CardOptionGroupProps<T>) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {options.map((opt) => {
        const active = opt.value === value

        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "h-12 rounded-lg border text-sm font-medium transition-colors",
              "bg-background hover:border-primary/50",
              active &&
                "border-primary bg-primary/10 text-primary"
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
