"use client"

import { Copy, ClipboardPaste } from "lucide-react"

type ColorPickerProps = {
  label?: string
  value: string
  onChange: (value: string) => void
}

export function ColorPicker({
  label,
  value,
  onChange,
}: ColorPickerProps) {
  const color = value.toUpperCase()

  return (
    <div className="space-y-3">
      {label && (
        <h4 className="text-sm font-medium">
          {label}
        </h4>
      )}

      <div className="rounded-lg bg-surface-muted p-2 space-y-2">
        {/* Color input */}
        <input
          type="color"
          value={color}
          onChange={(e) =>
            onChange(e.target.value.toUpperCase())
          }
          className="h-10 w-full cursor-pointer rounded-md border-none p-0"
        />

        {/* Info bar */}
        <div className="flex items-end justify-between px-1">
          <div className="text-sm font-semibold">
            <span className="block text-[10px] opacity-60">
              HEXADECIMAL
            </span>
            {color}
          </div>

          <div className="flex items-center gap-3">
            <Copy
              size={16}
              className="cursor-pointer opacity-70 hover:opacity-100"
              onClick={() => {
                navigator.clipboard.writeText(color)
                console.log("Color copiado:", color)
              }}
            />

            <ClipboardPaste
              size={16}
              className="cursor-pointer opacity-70 hover:opacity-100"
              onClick={async () => {
                const text =
                  await navigator.clipboard.readText()

                if (
                  /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(text)
                ) {
                  onChange(text.toUpperCase())
                  console.log("Color pegado:", text)
                } else {
                  console.warn("Color inválido:", text)
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
