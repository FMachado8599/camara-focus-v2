"use client"

import { useMemo, useCallback } from "react"
import { usePosts } from "@/context/post-context"
import { AppHeader } from "./app-header"
import { FeedGrid } from "./feed-grid"
import { PostCard } from "./post-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, LayoutGrid } from "lucide-react"

export function ContentPlanner() {
  const { posts, addPost, selectedMonth, selectedYear } = usePosts()

  // Sort posts chronologically
  const sortedPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) =>
        new Date(a.publicationDate).getTime() -
        new Date(b.publicationDate).getTime()
    )
  }, [posts])

  const handlePostClick = useCallback((postId: string) => {
    const element = document.getElementById(`post-${postId}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const handleAddPost = useCallback(() => {
    const newPostId = addPost()
    // Wait for render then scroll
    setTimeout(() => {
      const element = document.getElementById(`post-${newPostId}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }, [addPost])

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-8">
        {/* Feed Simulation */}
        {sortedPosts.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Feed Preview
              </h2>
            </div>
            <Card className="p-4 max-w-md">
              <FeedGrid posts={sortedPosts} onPostClick={handlePostClick} />
            </Card>
          </section>
        )}

        {/* Add New Post Button */}
        <div>
          <Button onClick={handleAddPost} className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Post
          </Button>
        </div>

        {/* Post Cards */}
        {sortedPosts.length > 0 ? (
          <section className="flex flex-col gap-6">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </section>
        ) : (
          <Card className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <LayoutGrid className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm font-medium">No posts yet</p>
            <p className="text-xs mt-1">
              Click &quot;Add New Post&quot; to get started
            </p>
          </Card>
        )}
      </main>
    </div>
  )
}
