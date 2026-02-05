// QRConfig.tsx
"use client"

import { QROptions } from "@/lib/qr/types"
import { QR_CONFIG_SCHEMA } from "@/lib/qr/config"
import { ColorPicker } from "@/components/ui/qr/color-picker/ColorPicker"
import { OptionGroup } from "@/components/ui/qr/option-group/OptionGroup"
import { CardOptionGroup } from "@/components/ui/qr/option-group/OptionGroupCard"
import { ImageUpload } from "../ui/qr/image-upload/ImageUpload"
import { Switch } from "@/components/ui/switch"

interface Props {
  options: QROptions
  onChange: (options: QROptions) => void
}

export function QRConfig({ options, onChange }: Props) {
  const updateOption = <K extends keyof QROptions>(
    key: K,
    value: QROptions[K]
  ) => {
    onChange({
      ...options,
      [key]: value,
    })
  }

  return (
    <div className="flex flex-col gap-8">
      {QR_CONFIG_SCHEMA
        .filter(
            (control) =>
            !control.showWhen || control.showWhen(options)
        )
      .map((control) => {
        const value = options[control.key]

        switch (control.type) {
            case "color":
                return (
                <OptionGroup key={control.key} title={control.label}>
                    <ColorPicker
                    value={value as string}
                    onChange={(v) =>
                        updateOption(control.key, v as any)
                    }
                    />
                </OptionGroup>
                )

            case "options":
                return (
                <OptionGroup
                    key={control.key}
                    title={control.label}
                    suffix={control.unit}
                >
                    <CardOptionGroup
                    value={value as any}
                    options={control.options!}
                    onChange={(v) =>
                        updateOption(control.key, v as any)
                    }
                    />
                </OptionGroup>
                )
            case "image":
                return (
                    <OptionGroup key={control.key} title={control.label}>
                    <ImageUpload
                        value={value as string | undefined}
                        onChange={(v) =>
                        updateOption(control.key, v as any)
                        }
                    />
                    </OptionGroup>
                )
            case "toggle":
            return (
                <OptionGroup key={control.key} title={control.label}>
                <div className="flex items-center justify-between gap-4">
                    <Switch
                    checked={Boolean(value)}
                    onCheckedChange={(checked) =>
                        updateOption(control.key, checked as any)
                    }
                    />
                </div>
                </OptionGroup>
                )
          default:
            return null
        }
      })}
    </div>
  )
}
