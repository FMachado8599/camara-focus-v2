"use client"

import { ImageUp, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { uploadLogo } from "@/lib/uploadLogo"

interface ImageUploadProps {
  value?: string
  onChange: (value?: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(value ?? null)
    const [isDragging, setIsDragging] = useState(false)
    
    useEffect(() => {
        setPreview(value ?? null)
    }, [value])
    
    useEffect(() => {
      return () => {
        if (preview?.startsWith("blob:")) {
          URL.revokeObjectURL(preview)
        }
      }
    }, [preview])

    const handleFile = async (file: File) => {
      const localPreview = URL.createObjectURL(file)
      setPreview(localPreview)

      try {
        const url = await uploadLogo(file)
        onChange(url) // guardamos URL real de Firebase
      } catch (err) {
        console.error("Error subiendo logo", err)
      }
    }
    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(true)
    }

    const handleDragLeave = () => {
    setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
    }



  return (
    <div className="flex flex-col gap-3">
      {!preview && (
            <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 transition",
                isDragging
                ? "border-primary bg-primary/5"
                : "text-muted-foreground hover:border-primary"
            )}
            >

          <ImageUp size={32} />
          <span className="text-sm">
            Arrastrá un logo o clickeá para subir
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
        </label>
      )}

      {preview && (
        <div className="relative flex items-center justify-center rounded-lg border p-4">
          <img
            src={preview}
            alt="Logo preview"
            className="max-h-24 object-contain"
          />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute right-2 top-2 rounded bg-background p-1 hover:bg-muted"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
