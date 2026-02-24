"use client"

import { useState } from "react"
import type { Post } from "@/lib/planis/types"
import { format } from "date-fns"
import { Instagram, MapPin, ChevronLeft, ChevronRight, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
    </svg>
  )
}

// Instagram Post Mockup (matching the HTML mockup provided)
function PostMockup({ post }: { post: Post }) {
  const imageUrl = post.images[0]

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden max-w-sm mx-auto">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-card flex items-center justify-center">
              <span className="text-xs font-semibold text-foreground">
                {post.caption ? post.caption[0]?.toUpperCase() : "P"}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">username</span>
            {post.location && (
              <span className="text-xs text-muted-foreground">{post.location}</span>
            )}
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-foreground" />
      </div>

      {/* Post Image */}
      <div className="aspect-[4/5] bg-muted relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Post content"
            className="w-full h-full object-cover "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-sm">No image uploaded</span>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center p-3">
        <div className="flex gap-4">
          <Heart className="w-6 h-6 text-foreground" />
          <MessageCircle className="w-6 h-6 text-foreground" />
          <Send className="w-6 h-6 text-foreground" />
        </div>
        <Bookmark className="w-6 h-6 text-foreground" />
      </div>

      {/* Likes */}
      <div className="px-3 pb-1">
        <p className="text-sm font-semibold text-foreground">1,234 likes</p>
      </div>

      {/* Caption */}
      {post.caption && (
        <div className="px-3 pb-2">
          <p className="text-sm text-foreground">
            <span className="font-semibold">username </span>
            {post.caption.length > 100
              ? post.caption.slice(0, 100) + "..."
              : post.caption}
          </p>
        </div>
      )}

      {/* Date */}
      <div className="px-3 pb-3">
        <p className="text-xs text-muted-foreground uppercase">
          {format(post.publicationDate, "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  )
}

// Carousel Mockup
function CarouselMockup({ post }: { post: Post }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = post.images

  const goNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1)
  }
  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-card flex items-center justify-center">
              <span className="text-xs font-semibold text-foreground">
                {post.caption ? post.caption[0]?.toUpperCase() : "C"}
              </span>
            </div>
          </div>
          <span className="text-sm font-semibold text-foreground">username</span>
        </div>
        <MoreHorizontal className="w-5 h-5 text-foreground" />
      </div>

      {/* Carousel Images */}
      <div className="aspect-[4/5] bg-muted relative overflow-hidden">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {currentIndex > 0 && (
              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center shadow-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
            )}
            {currentIndex < images.length - 1 && (
              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center shadow-sm"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>
            )}
            {/* Counter badge */}
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-foreground/70 text-background text-xs">
                {currentIndex + 1}/{images.length}
              </Badge>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-sm">No images uploaded</span>
          </div>
        )}
      </div>

      {/* Actions + dots */}
      <div className="flex justify-between items-center p-3">
        <div className="flex gap-4">
          <Heart className="w-6 h-6 text-foreground" />
          <MessageCircle className="w-6 h-6 text-foreground" />
          <Send className="w-6 h-6 text-foreground" />
        </div>
        {/* Dots indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === currentIndex ? "bg-blue-500" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <Bookmark className="w-6 h-6 text-foreground" />
      </div>

      {post.caption && (
        <div className="px-3 pb-2">
          <p className="text-sm text-foreground">
            <span className="font-semibold">username </span>
            {post.caption.length > 80
              ? post.caption.slice(0, 80) + "..."
              : post.caption}
          </p>
        </div>
      )}

      <div className="px-3 pb-3">
        <p className="text-xs text-muted-foreground uppercase">
          {format(post.publicationDate, "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  )
}

// Reel Mockup
function ReelMockup({ post }: { post: Post }) {
  return (
    <div className="bg-foreground rounded-2xl overflow-hidden max-w-[240px] mx-auto relative" style={{ aspectRatio: "9/16" }}>
      {post.coverImageUrl || post.videoUrl ? (
        <>
          {post.videoUrl ? (
            <video
              src={post.videoUrl}
              className="w-full h-full object-cover"
              controls
              playsInline
            />
          ) : (
            <img
              src={post.coverImageUrl}
              alt="Reel cover"
              className="w-full h-full object-cover"
            />
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <Play className="w-8 h-8 mx-auto mb-2" />
            <span className="text-xs">No video</span>
          </div>
        </div>
      )}

      {/* Reel overlay UI */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-[10px] text-white font-semibold">U</span>
          </div>
          <span className="text-xs text-white font-semibold">username</span>
        </div>
        {post.caption && (
          <p className="text-[10px] text-white/90 line-clamp-2">{post.caption}</p>
        )}
        {post.location && (
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-white/70" />
            <span className="text-[10px] text-white/70">{post.location}</span>
          </div>
        )}
      </div>

      {/* Side actions */}
      <div className="absolute right-2 bottom-20 flex flex-col gap-4">
        <Heart className="w-5 h-5 text-white" />
        <MessageCircle className="w-5 h-5 text-white" />
        <Send className="w-5 h-5 text-white" />
      </div>

      {/* Date badge */}
      <div className="absolute top-2 left-2">
        <Badge variant="secondary" className="bg-black/50 text-white text-[10px] border-0">
          {format(post.publicationDate, "MMM d")}
        </Badge>
      </div>
    </div>
  )
}

// Story Mockup
function StoryMockup({ post }: { post: Post }) {
  const mediaUrl = post.images[0] || post.videoUrl

  return (
    <div className="bg-foreground rounded-2xl overflow-hidden max-w-[240px] mx-auto relative" style={{ aspectRatio: "9/16" }}>
      {mediaUrl ? (
        post.videoUrl ? (
          <video
            src={post.videoUrl}
            className="w-full h-full object-cover"
            controls
            playsInline
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Story content"
            className="w-full h-full object-cover"
          />
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <span className="text-sm text-muted-foreground">No media</span>
        </div>
      )}

      {/* Story progress bar */}
      <div className="absolute top-2 left-2 right-2">
        <div className="w-full h-0.5 bg-white/30 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-white rounded-full" />
        </div>
      </div>

      {/* Story header */}
      <div className="absolute top-4 left-3 right-3 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/50">
          <span className="text-[10px] text-white font-semibold">U</span>
        </div>
        <span className="text-xs text-white font-semibold">username</span>
        <span className="text-[10px] text-white/60">
          {format(post.publicationDate, "MMM d")}
        </span>
      </div>

      {/* Bottom caption overlay */}
      {post.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
          <p className="text-[10px] text-white/90 text-center line-clamp-2">
            {post.caption}
          </p>
        </div>
      )}
    </div>
  )
}

// Main MockupPreview component
export function MockupPreview({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Platform + date info */}
      <div className="flex items-center gap-2 flex-wrap">
        {post.platforms.map((platform) => (
          <Badge key={platform} variant="outline" className="gap-1 text-xs">
            {platform === "instagram" ? (
              <Instagram className="w-3 h-3" />
            ) : (
              <TikTokIcon className="w-3 h-3" />
            )}
            {platform}
          </Badge>
        ))}
        {post.location && (
          <Badge variant="outline" className="gap-1 text-xs">
            <MapPin className="w-3 h-3" />
            {post.location}
          </Badge>
        )}
      </div>

      {/* Render mockup based on type */}
      <div className="relative">
        {post.type === "post" && <PostMockup post={post} />}
        {post.type === "carousel" && <CarouselMockup post={post} />}
        {post.type === "reel" && <ReelMockup post={post} />}
        {post.type === "story" && <StoryMockup post={post} />}
      </div>
    </div>
  )
}
