"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  name: string
  setName: (v: string) => void
  input: string
  setInput: (v: string) => void
  onSave: () => void
  isEditing: boolean
  loading: boolean
}

export default function BarcodeConfig({
  name,
  setName,
  input,
  setInput,
  onSave,
  isEditing,
  loading
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? "Editar código" : "Crear código"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nombre</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Las Acacias - Moñitas"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            EAN (12 o 13 dígitos)
          </label>
          <Input
            maxLength={13}
            value={input}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "")
              setInput(onlyNumbers.slice(0, 13))
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={onSave}>
            {isEditing ? "Actualizar" : "Guardar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}