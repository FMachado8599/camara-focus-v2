"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Post, Comment, ReferenceLink, PostType, Platform } from "./types"
import { createEmptyPost } from "@/lib/planis/types"

interface PostContextValue {
  posts: Post[]
  brandName: string
  setBrandName: (name: string) => void
  selectedMonth: number
  setSelectedMonth: (month: number) => void
  selectedYear: number
  setSelectedYear: (year: number) => void
  addPost: () => string
  deletePost: (id: string) => void
  updatePost: (id: string, updates: Partial<Post>) => void
  addComment: (postId: string, author: string, text: string) => void
  addReferenceLink: (postId: string, label: string, url: string) => void
  removeReferenceLink: (postId: string, linkId: string) => void
  addAssetLink: (postId: string, link: string) => void
  removeAssetLink: (postId: string, index: number) => void
}

const PostContext = createContext<PostContextValue | null>(null)

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [brandName, setBrandName] = useState("My Brand")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const addPost = useCallback(() => {
    const newPost = createEmptyPost()
    newPost.publicationDate = new Date(selectedYear, selectedMonth, 1)
    setPosts((prev) => [...prev, newPost])
    return newPost.id
  }, [selectedMonth, selectedYear])

  const deletePost = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const updatePost = useCallback((id: string, updates: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }, [])

  const addComment = useCallback(
    (postId: string, author: string, text: string) => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  { id: crypto.randomUUID(), author, text, timestamp: new Date() },
                ],
              }
            : p
        )
      )
    },
    []
  )

  const addReferenceLink = useCallback(
    (postId: string, label: string, url: string) => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                referenceLinks: [
                  ...p.referenceLinks,
                  { id: crypto.randomUUID(), label, url },
                ],
              }
            : p
        )
      )
    },
    []
  )

  const removeReferenceLink = useCallback(
    (postId: string, linkId: string) => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                referenceLinks: p.referenceLinks.filter((l) => l.id !== linkId),
              }
            : p
        )
      )
    },
    []
  )

  const addAssetLink = useCallback((postId: string, link: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, assetLinks: [...p.assetLinks, link] }
          : p
      )
    )
  }, [])

  const removeAssetLink = useCallback((postId: string, index: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, assetLinks: p.assetLinks.filter((_, i) => i !== index) }
          : p
      )
    )
  }, [])

  return (
    <PostContext.Provider
      value={{
        posts,
        brandName,
        setBrandName,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        addPost,
        deletePost,
        updatePost,
        addComment,
        addReferenceLink,
        removeReferenceLink,
        addAssetLink,
        removeAssetLink,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export function usePosts() {
  const context = useContext(PostContext)
  if (!context) throw new Error("usePosts must be used within PostProvider")
  return context
}
