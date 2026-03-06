//search.test.js

import "dotenv/config"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const query = "happy face"

async function run() {

  console.log("query:", query)

  // 1 generar embedding
  const emb = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query
  })

  const vector = emb.data[0].embedding

  // 2 buscar similitud
  const { data, error } = await supabase.rpc(
    "match_emojis",
    {
      query_embedding: vector,
      match_count: 10
    }
  )

  if (error) {
    console.error("search error:", error)
    return
  }

  console.log("results:")
  console.log(data)
}

run()