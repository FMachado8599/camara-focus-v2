"use client"

import { useState } from "react"
import type { Post } from "@/lib/planis/types"
import { usePosts } from "@/context/post-context"
import { format } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, MessageSquare } from "lucide-react"

export function CommentsPanel({ post }: { post: Post }) {
  const { addComment } = usePosts()
  const [newComment, setNewComment] = useState("")
  const [author, setAuthor] = useState("")

  const handleSubmit = () => {
    if (!newComment.trim()) return
    addComment(post.id, author.trim() || "Team Member", newComment.trim())
    setNewComment("")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 pb-3 border-b border-border mb-3">
        <MessageSquare className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">
          Comments ({post.comments.length})
        </h3>
      </div>

      <ScrollArea className="flex-1 min-h-0 pr-2">
        {post.comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <MessageSquare className="w-8 h-8 mb-2 opacity-30" />
            <p className="text-sm">No comments yet</p>
            <p className="text-xs">Add internal notes below</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-muted/50 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">
                    @{comment.author}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {format(new Date(comment.timestamp), "MMM d, h:mm a")}
                  </span>
                </div>
                <p className="text-sm text-foreground/80">{comment.text}</p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Add comment */}
      <div className="pt-3 border-t border-border mt-auto flex flex-col gap-2">
        <Input
          placeholder="Your name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="h-8 text-xs"
        />
        <div className="flex gap-2">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 h-8 text-xs"
          />
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="h-8 w-8 p-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="sr-only">Send comment</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
