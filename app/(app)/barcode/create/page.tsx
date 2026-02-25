"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { resolveEAN } from "@/lib/barcode/validate"

import { useBarcode } from "../hooks/useBarcode"
import BarcodeConfig from "./components/BarcodeConfig"
import BarcodePreview from "./components/BarcodePreview"

export default function BarcodeCreatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const { getById, create, update, loading } = useBarcode()

  const [name, setName] = useState("")
  const [input, setInput] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!id) return

    async function load(barcodeId: string) {
      const data = await getById(barcodeId)
      setName(data.name)
      setInput(data.value)
      setIsEditing(true)
    }

    load(id)
  }, [id])

  async function handleSave() {
    const result = resolveEAN(input)

    if (!result.valid || !result.value) {
      alert(result.error)
      return
    }

    if (isEditing && id) {
      await update(id, {
        name,
        value: result.value,
      })
    } else {
      await create({
        name,
        value: result.value,
      })
    }

    router.push("/barcode/list")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      <BarcodePreview value={input} />

      <BarcodeConfig
        name={name}
        setName={setName}
        input={input}
        setInput={setInput}
        onSave={handleSave}
        isEditing={isEditing}
        loading={loading}
      />
    </div>
  )
}