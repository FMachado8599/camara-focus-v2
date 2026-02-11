"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxFieldProps<T> = {
  label?: string
  items: T[]
  value: string
  placeholder?: string
  getLabel: (item: T) => string
  getValue: (item: T) => string
  onChange: (value: string) => void
  onCreate?: (value: string) => void
  allowCreate?: boolean
  hint?:string
}

export function ComboboxField<T>({
  label,
  items,
  value,
  placeholder,
  getLabel,
  getValue,
  onChange,
  allowCreate,
  onCreate,
  hint,
}: ComboboxFieldProps<T>) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const selected = items.find(
    (item) => getValue(item) === value
  )

  const filtered = items.filter((item) =>
    getLabel(item)
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const existsExact = items.some(
    (item) =>
      getLabel(item).toLowerCase() ===
      search.toLowerCase()
  )

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm">{label}</label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="justify-between"
          >
            {selected
              ? getLabel(selected)
              : placeholder || "Seleccionar"}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Command>
            <CommandInput
              placeholder="Buscar..."
              value={search}
              onValueChange={setSearch}
            />

            <CommandList>
              {filtered.length === 0 && (
                <CommandEmpty>
                  No se encontraron resultados.
                </CommandEmpty>
              )}

              <CommandGroup>
                {filtered.map((item) => {
                  const itemValue = getValue(item)
                  const itemLabel = getLabel(item)

                  return (
                    <CommandItem
                      key={itemValue}
                      value={itemLabel}
                      onSelect={() => {
                        onChange(itemValue)
                        setOpen(false)
                        setSearch("")
                      }}
                    >
                      {itemLabel}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === itemValue
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  )
                })}
              </CommandGroup>

              {allowCreate &&
                search &&
                !existsExact && (
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        onCreate?.(search)
                        setOpen(false)
                        setSearch("")
                      }}
                    >
                      Crear "{search}"
                    </CommandItem>
                  </CommandGroup>
                )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
