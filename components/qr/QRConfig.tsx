"use client"

import { QROptions } from "@/lib/qr/types"
import { QR_CONFIG_SCHEMA } from "@/lib/qr/config"
import { ColorPicker } from "@/components/ui/qr/color-picker/ColorPicker"
import { OptionGroup } from "@/components/ui/qr/option-group/OptionGroup"
import { CardOptionGroup } from "@/components/ui/qr/option-group/OptionGroupCard"
import { ImageUpload } from "@/components/ui/qr/image-upload/ImageUpload"
import { Switch } from "@/components/ui/switch"
import { AnimatedCollapse } from "@/components/ui/AnimatedCollapse"
import { QREditState } from "@/lib/qr/types"
import { saveQR } from "@/services/qr/saveQR"

type Props = {
  qr: QREditState
  onChange: React.Dispatch<React.SetStateAction<QREditState>>
}

export function QRConfig({ qr, onChange }: Props) {
  const options = qr.options

  const updateOption = <K extends keyof QROptions>(
    key: K,
    value: QROptions[K]
  ) => {
    onChange((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [key]: value,
      },
    }))
  }


  return (
    <div className="flex flex-col gap-8">
      {/* Nombre */}


      {QR_CONFIG_SCHEMA.map((control) => {
        const value = options[control.key]

        if (control.key === "backgroundColor") {
          return (
            <OptionGroup
              key="background"
              title="Fondo"
              rightSlot={
                <Switch
                  checked={!options.backgroundTransparent}
                  onCheckedChange={(checked) => {
                    onChange((prev) => ({
                      ...prev,
                      options: {
                        ...prev.options,
                        backgroundTransparent: !checked,
                        backgroundColor: checked
                          ? "#FFFFFF"
                          : prev.options.backgroundColor,
                      },
                    }))
                  }}
                />
              }
            >

              <div className="flex flex-col gap-3">
                <AnimatedCollapse isOpen={!options.backgroundTransparent}>
                  <ColorPicker
                    value={options.backgroundColor}
                    onChange={(v) =>
                      updateOption("backgroundColor", v)
                    }
                  />
                </AnimatedCollapse>
              </div>
            </OptionGroup>
          )
        }

        if (control.key === "backgroundTransparent") return null

        if (control.showWhen && !control.showWhen(options)) {
          return null
        }

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

            const isErrorCorrection =
              control.key === "errorCorrectionLevel"

            const disabled =
              isErrorCorrection && !!options.logoImage  

            return (
              <OptionGroup
                key={control.key}
                title={control.label}
                suffix={control.unit}
              >
                <CardOptionGroup
                  value={value as any}
                  options={control.options!}
                  disabled={disabled}
                  onChange={(v) => {
                    if (disabled) return
                    updateOption(control.key, v as any)
                  }}
                />

                {disabled && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Con logo, la corrección de errores se fija en Alta (H) para asegurar lectura.
                  </p>
                )}
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
                <Switch
                  checked={Boolean(value)}
                  onCheckedChange={(v) =>
                    updateOption(control.key, v as any)
                  }
                />
              </OptionGroup>
            )

          default:
            return null
        }
      })}

      <button
        className="mt-4 rounded-md bg-black px-4 py-2 text-white"
        onClick={async () => {
          if (!qr.name.trim()) {
            alert("Poné un nombre al QR")
            return
          }
          if (!qr.link.brand?.trim()) {
            alert("El brand es obligatorio.")
            return
          }
          try {
            await saveQR(qr)
            alert("QR guardado en la nube ☁️")
          } catch (err) {
            console.error(err)
            alert("Error guardando QR")
          }
        }}
      >
        Guardar QR
      </button>
    </div>
  )
}
