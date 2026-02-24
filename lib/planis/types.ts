export type PostType = "post" | "carousel" | "reel" | "story"
export type Platform = "instagram" | "tiktok"

export interface Comment {
  id: string
  author: string
  text: string
  timestamp: Date
}

export interface ReferenceLink {
  id: string
  label: string
  url: string
}

export interface Post {
  id: string
  type: PostType
  platforms: Platform[]
  publicationDate: Date
  location: string
  caption: string
  images: string[] // object URLs for uploaded images
  videoUrl: string // object URL for uploaded video (reel/story)
  coverImageUrl: string // cover image for reels
  comments: Comment[]
  referenceLinks: ReferenceLink[]
  assetLinks: string[]
}

export function createEmptyPost(): Post {
  return {
    id: crypto.randomUUID(),
    type: "post",
    platforms: ["instagram"],
    publicationDate: new Date(),
    location: "",
    caption: "",
    images: [],
    videoUrl: "",
    coverImageUrl: "",
    comments: [],
    referenceLinks: [],
    assetLinks: [],
  }
}
