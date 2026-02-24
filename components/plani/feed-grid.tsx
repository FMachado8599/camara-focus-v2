"use client"

import type { Post } from "@/lib/planis/types"
import { cn } from "@/lib/utils"
import { Image, Film, LayoutGrid, CircleDot, Play } from "lucide-react"

function getPostThumbnail(post: Post): string | null {
  switch (post.type) {
    case "post":
      return post.images[0] || null
    case "carousel":
      return post.images[0] || null
    case "reel":
      return post.coverImageUrl || null
    case "story":
      return post.images[0] || null
    default:
      return null
  }
}

function getTypeIcon(type: Post["type"]) {
  switch (type) {
    case "post":
      return <Image className="w-3.5 h-3.5" />
    case "carousel":
      return <LayoutGrid className="w-3.5 h-3.5" />
    case "reel":
      return <Film className="w-3.5 h-3.5" />
    case "story":
      return <CircleDot className="w-3.5 h-3.5" />
  }
}

export function FeedGrid({
  posts,
  onPostClick,
}: {
  posts: Post[]
  onPostClick: (postId: string) => void
}) {
  if (posts.length === 0) {
    return null
  }

  // Separate stories from regular posts
  const stories = posts.filter((p) => p.type === "story")
  const regularPosts = posts.filter((p) => p.type !== "story")

  return (
    <div className="flex flex-col gap-6">
      {/* Stories row */}
      {stories.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {stories.map((story) => {
            const thumb = getPostThumbnail(story)
            return (
              <button
                key={story.id}
                onClick={() => onPostClick(story.id)}
                className="flex flex-col items-center gap-1.5 shrink-0 group"
              >
                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600">
                  <div className="w-full h-full rounded-full bg-background p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-muted aspect-[4/3]">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt="Story"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <CircleDot className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[64px]">
                  {story.caption ? story.caption.slice(0, 10) : "Story"}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Grid */}
      {regularPosts.length > 0 && (
        <div className="grid grid-cols-3 gap-1">
          {regularPosts.map((post) => {
            const thumb = getPostThumbnail(post)
            return (
              <button
                key={post.id}
                onClick={() => onPostClick(post.id)}
                className="aspect-square relative bg-muted overflow-hidden group"
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt={`Post ${post.type}`}
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-muted-foreground flex flex-col items-center gap-1">
                      {getTypeIcon(post.type)}
                      <span className="text-[10px] capitalize">{post.type}</span>
                    </div>
                  </div>
                )}
                {/* Type indicator overlay */}
                <div className="absolute top-1.5 right-1.5 text-white drop-shadow-md">
                  {post.type === "carousel" && <LayoutGrid className="w-4 h-4" />}
                  {post.type === "reel" && <Play className="w-4 h-4 fill-white" />}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
