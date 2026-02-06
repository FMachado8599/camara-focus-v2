"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormFieldProps = {
  label: string
  type?: React.HTMLInputTypeAttribute
  value: string
  placeholder?: string
  hint?: string
  onChange: (value: string) => void
}

export function FormField({
  label,
  type = "text",
  value,
  placeholder,
  hint,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm">{label}</Label>

      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      {hint && (
        <span className="text-xs text-muted-foreground">
          {hint}
        </span>
      )}
    </div>
  )
}
