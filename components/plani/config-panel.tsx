"use client"

import { useState, useCallback } from "react"
import type { Post, PostType, Platform } from "@/lib/planis/types"
import { usePosts } from "@/context/post-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Image,
  Film,
  LayoutGrid,
  CircleDot,
  Instagram,
  CalendarIcon,
  MapPin,
  Link2,
  FolderOpen,
  Trash2,
  Upload,
  X,
  Plus,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
    </svg>
  )
}

const postTypes: { value: PostType; label: string; icon: React.ReactNode }[] = [
  { value: "post", label: "Post", icon: <Image className="w-4 h-4" /> },
  { value: "carousel", label: "Carousel", icon: <LayoutGrid className="w-4 h-4" /> },
  { value: "reel", label: "Reel", icon: <Film className="w-4 h-4" /> },
  { value: "story", label: "Story", icon: <CircleDot className="w-4 h-4" /> },
]

const platforms: { value: Platform; label: string; icon: React.ReactNode }[] = [
  { value: "instagram", label: "Instagram", icon: <Instagram className="w-4 h-4" /> },
  { value: "tiktok", label: "TikTok", icon: <TikTokIcon className="w-4 h-4" /> },
]

export function ConfigPanel({
  post,
  onDelete,
}: {
  post: Post
  onDelete: () => void
}) {
  const { updatePost, addReferenceLink, removeReferenceLink, addAssetLink, removeAssetLink } = usePosts()
  const [newRefLabel, setNewRefLabel] = useState("")
  const [newRefUrl, setNewRefUrl] = useState("")
  const [newAssetLink, setNewAssetLink] = useState("")

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) return

      if (post.type === "post") {
        const file = files[0]
        if (file) {
          const url = URL.createObjectURL(file)
          updatePost(post.id, { images: [url] })
        }
      } else if (post.type === "carousel") {
        const newUrls = Array.from(files).map((f) => URL.createObjectURL(f))
        updatePost(post.id, { images: [...post.images, ...newUrls] })
      } else if (post.type === "reel") {
        const file = files[0]
        if (file) {
          if (file.type.startsWith("video/")) {
            updatePost(post.id, { videoUrl: URL.createObjectURL(file) })
          } else {
            updatePost(post.id, { coverImageUrl: URL.createObjectURL(file) })
          }
        }
      } else if (post.type === "story") {
        const file = files[0]
        if (file) {
          if (file.type.startsWith("video/")) {
            updatePost(post.id, { videoUrl: URL.createObjectURL(file) })
          } else {
            updatePost(post.id, { images: [URL.createObjectURL(file)] })
          }
        }
      }

      // Reset input so same file can be uploaded again
      e.target.value = ""
    },
    [post, updatePost]
  )

  const handleReelCoverUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        updatePost(post.id, { coverImageUrl: URL.createObjectURL(file) })
      }
      e.target.value = ""
    },
    [post.id, updatePost]
  )

  const togglePlatform = (platform: Platform) => {
    const current = post.platforms
    if (current.includes(platform)) {
      if (current.length > 1) {
        updatePost(post.id, {
          platforms: current.filter((p) => p !== platform),
        })
      }
    } else {
      updatePost(post.id, { platforms: [...current, platform] })
    }
  }

  const handleTypeChange = (type: PostType) => {
    // Reset media when changing type
    updatePost(post.id, {
      type,
      images: [],
      videoUrl: "",
      coverImageUrl: "",
    })
  }

  const getAcceptStr = () => {
    switch (post.type) {
      case "post":
        return "image/*"
      case "carousel":
        return "image/*"
      case "reel":
        return "video/*,image/*"
      case "story":
        return "image/*,video/*"
    }
  }

  const removeImage = (index: number) => {
    updatePost(post.id, {
      images: post.images.filter((_, i) => i !== index),
    })
  }

  return (
    <ScrollArea className="h-full pr-2">
      <div className="flex flex-col gap-5">
        {/* Post Type Selector */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
            Post Type
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {postTypes.map((pt) => (
              <button
                key={pt.value}
                onClick={() => handleTypeChange(pt.value)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border",
                  post.type === pt.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-accent"
                )}
              >
                {pt.icon}
                {pt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Selector */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
            Platforms
          </Label>
          <div className="flex gap-2">
            {platforms.map((pl) => (
              <button
                key={pl.value}
                onClick={() => togglePlatform(pl.value)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border flex-1",
                  post.platforms.includes(pl.value)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:bg-accent"
                )}
              >
                {pl.icon}
                {pl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Publication Date */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
            <CalendarIcon className="w-3 h-3 inline mr-1" />
            Publication Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-9 text-sm"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(post.publicationDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={post.publicationDate}
                onSelect={(date) => {
                  if (date) updatePost(post.id, { publicationDate: date })
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Location */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
            <MapPin className="w-3 h-3 inline mr-1" />
            Location
          </Label>
          <Input
            placeholder="e.g. New York, NY"
            value={post.location}
            onChange={(e) => updatePost(post.id, { location: e.target.value })}
            className="h-9 text-sm"
          />
        </div>

        {/* Caption */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
            Caption
          </Label>
          <Textarea
            placeholder="Write your caption..."
            value={post.caption}
            onChange={(e) => updatePost(post.id, { caption: e.target.value })}
            rows={4}
            className="text-sm resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {post.caption.length}/2200
          </p>
        </div>

        <Separator />

        {/* File Upload */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
            <Upload className="w-3 h-3 inline mr-1" />
            Media Upload
          </Label>

          {/* Show current images */}
          {post.images.length > 0 && (
            <div className="flex gap-2 mb-2 flex-wrap">
              {post.images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-16 h-16 rounded-md overflow-hidden border border-border group"
                >
                  <img
                    src={img}
                    alt={`Upload ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 w-4 h-4 bg-destructive text-destructive-foreground rounded-bl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {post.videoUrl && (
            <div className="mb-2 flex items-center gap-2 bg-muted rounded-md px-3 py-2">
              <Film className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground flex-1 truncate">
                Video uploaded
              </span>
              <button
                onClick={() => updatePost(post.id, { videoUrl: "" })}
                className="text-destructive hover:text-destructive/80"
                aria-label="Remove video"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <label className="flex items-center justify-center gap-2 px-3 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors">
            <Upload className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {post.type === "post" && "Upload image"}
              {post.type === "carousel" && "Upload images"}
              {post.type === "reel" && "Upload video or cover"}
              {post.type === "story" && "Upload image or video"}
            </span>
            <input
              type="file"
              accept={getAcceptStr()}
              multiple={post.type === "carousel"}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Reel cover image separate upload */}
          {post.type === "reel" && (
            <div className="mt-2">
              {post.coverImageUrl && (
                <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-2 mb-2">
                  <Image className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground flex-1">
                    Cover image set
                  </span>
                  <button
                    onClick={() => updatePost(post.id, { coverImageUrl: "" })}
                    className="text-destructive hover:text-destructive/80"
                    aria-label="Remove cover"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <label className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors">
                <Image className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Upload cover image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleReelCoverUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        <Separator />

        {/* Reference Links */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
            <Link2 className="w-3 h-3 inline mr-1" />
            Reference Links
          </Label>
          {post.referenceLinks.length > 0 && (
            <div className="flex flex-col gap-1 mb-2">
              {post.referenceLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-2 bg-muted rounded-md px-2 py-1.5"
                >
                  <Link2 className="w-3 h-3 text-muted-foreground shrink-0" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate flex-1"
                  >
                    {link.label || link.url}
                  </a>
                  <button
                    onClick={() => removeReferenceLink(post.id, link.id)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove link"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <Input
              placeholder="Label"
              value={newRefLabel}
              onChange={(e) => setNewRefLabel(e.target.value)}
              className="h-8 text-xs"
            />
            <div className="flex gap-1.5">
              <Input
                placeholder="URL"
                value={newRefUrl}
                onChange={(e) => setNewRefUrl(e.target.value)}
                className="h-8 text-xs flex-1"
              />
              <Button
                size="sm"
                variant="outline"
                className="h-8"
                onClick={() => {
                  if (newRefUrl.trim()) {
                    addReferenceLink(
                      post.id,
                      newRefLabel.trim() || newRefUrl.trim(),
                      newRefUrl.trim()
                    )
                    setNewRefLabel("")
                    setNewRefUrl("")
                  }
                }}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Asset Links */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
            <FolderOpen className="w-3 h-3 inline mr-1" />
            Asset Links
          </Label>
          {post.assetLinks.length > 0 && (
            <div className="flex flex-col gap-1 mb-2">
              {post.assetLinks.map((link, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-muted rounded-md px-2 py-1.5"
                >
                  <FolderOpen className="w-3 h-3 text-muted-foreground shrink-0" />
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate flex-1"
                  >
                    {link}
                  </a>
                  <button
                    onClick={() => removeAssetLink(post.id, i)}
                    className="text-muted-foreground hover:text-destructive"
                    aria-label="Remove asset link"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-1.5">
            <Input
              placeholder="Drive / asset link"
              value={newAssetLink}
              onChange={(e) => setNewAssetLink(e.target.value)}
              className="h-8 text-xs flex-1"
            />
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={() => {
                if (newAssetLink.trim()) {
                  addAssetLink(post.id, newAssetLink.trim())
                  setNewAssetLink("")
                }
              }}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Delete Post */}
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Post
        </Button>
      </div>
    </ScrollArea>
  )
}
