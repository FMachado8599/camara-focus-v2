"use client"

import { cn } from "@/lib/utils"
import type { EmojiCategory } from "@/lib/emojis/emoji-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

interface CategoryListProps {
  categories: EmojiCategory[]
  activeCategory: string | null
  activeSubgroup: string | null
  onCategorySelect: (categoryId: string | null) => void
  onSubgroupSelect: (subgroup: string | null) => void
}

export function CategoryList({
  categories,
  activeCategory,
  activeSubgroup,
  onCategorySelect,
  onSubgroupSelect,
}: CategoryListProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(activeCategory)

  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      onCategorySelect(null)
      onSubgroupSelect(null)
      setExpandedCategory(null)
    } else {
      onCategorySelect(categoryId)
      onSubgroupSelect(null)
      setExpandedCategory(categoryId)
    }
  }

  const handleSubgroupClick = (subgroup: string) => {
    if (activeSubgroup === subgroup) {
      onSubgroupSelect(null)
    } else {
      onSubgroupSelect(subgroup)
    }
  }

  return (
    <ScrollArea className="h-full">
      <nav className="flex flex-col gap-0.5 p-1" aria-label="Emoji categories">
        <button
          onClick={() => {
            onCategorySelect(null)
            onSubgroupSelect(null)
            setExpandedCategory(null)
          }}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors text-left",
            activeCategory === null
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          <span className="text-base leading-none">{"✨"}</span>
          <span className="font-medium">All</span>
        </button>

        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors text-left",
                activeCategory === category.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <span className="text-base leading-none">{category.icon}</span>
              <span className="flex-1 font-medium truncate">{category.name}</span>
              <ChevronRight
                className={cn(
                  "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                  expandedCategory === category.id && "rotate-90"
                )}
              />
            </button>

            {expandedCategory === category.id && (
              <div className="ml-6 flex flex-col gap-0.5 py-0.5">
                {category.subgroups.map((subgroup) => (
                  <button
                    key={subgroup}
                    onClick={() => handleSubgroupClick(subgroup)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs text-left transition-colors",
                      activeSubgroup === subgroup
                        ? "text-foreground bg-accent/70"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                    )}
                  >
                    {subgroup}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </ScrollArea>
  )
}

