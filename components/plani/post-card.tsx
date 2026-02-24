"use client"

import type { Post } from "@/lib/planis/types"
import { usePosts } from "@/context/post-context"
import { CommentsPanel } from "./comments-panel"
import { MockupPreview } from "./mockup-preview"
import { ConfigPanel } from "./config-panel"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Instagram } from "lucide-react"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
    </svg>
  )
}

export function PostCard({ post }: { post: Post }) {
  const { deletePost } = usePosts()

  return (
    <Card id={`post-${post.id}`} className="overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="capitalize text-xs font-semibold"
          >
            {post.type}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {format(post.publicationDate, "MMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {post.platforms.map((p) => (
            <span key={p} className="text-muted-foreground">
              {p === "instagram" ? (
                <Instagram className="w-4 h-4" />
              ) : (
                <TikTokIcon className="w-4 h-4" />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] min-h-[500px]">
        {/* Column 1 - Comments */}
        <div className="border-b lg:border-b-0 lg:border-r border-border p-4 max-h-[500px] flex flex-col">
          <CommentsPanel post={post} />
        </div>

        {/* Column 2 - Mockup Preview */}
        <div className="border-b lg:border-b-0 lg:border-r border-border p-5 flex items-start justify-center bg-muted/10">
          <MockupPreview post={post} />
        </div>

        {/* Column 3 - Config */}
        <div className="p-4 max-h-[500px]">
          <ConfigPanel post={post} onDelete={() => deletePost(post.id)} />
        </div>
      </div>
    </Card>
  )
}
