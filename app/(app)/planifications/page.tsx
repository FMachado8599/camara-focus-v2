"use client"

import { PostProvider } from "@/context/post-context"
import { ContentPlanner } from "@/components/plani/content-planner"

export default function Page() {
  return (
    <PostProvider>
      <ContentPlanner />
    </PostProvider>
  )
}
