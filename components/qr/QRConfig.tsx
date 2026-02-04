"use client"

import { QROptions } from "@/lib/qr/types"
import { ColorPicker } from "@/components/ui/color-picker/ColorPicker"

type QRConfigProps = {
  options: QROptions
  onChange: (opts: QROptions) => void
}

const SIZES = [150, 300, 500, 1000]

export function QRConfig({ options, onChange }: QRConfigProps) {
  return (
    <div className="rounded-xl border p-6 space-y-4">
        <h2 className="text-lg font-medium">
            Opciones de exportación
        </h2>

        {/* Tamaño */}
        <div>
            <p className="text-sm mb-2">Tamaño (px)</p>

            <div className="flex gap-2">
            {SIZES.map((size) => (
                <button
                key={size}
                className={`px-4 py-2 rounded border text-sm ${
                    options.size === size
                    ? "border-primary text-primary"
                    : "opacity-60"
                }`}
                onClick={() =>
                    onChange({
                    ...options,
                    size,
                    })
                }
                >
                {size}
                </button>
            ))}
            </div>
        </div>
        <ColorPicker
            label="Color del QR"
            value={options.foregroundColor}
            onChange={(color) =>
                onChange({
                ...options,
                foregroundColor: color,
                })
            }
        />
    </div>
  )
}
