//emojiSearch.js

import express from "express"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

const router = express.Router()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

router.get("/", async (req, res) => {

    // step 1: generar embedding
    const emb = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: q
    })
    const vector = emb.data[0].embedding

    // step 2: hybrid search en Supabase
    const { data: matches, error } = await supabase.rpc("match_emojis", {
    query_embedding: vector,
    query_text: q,      // <-- pasamos el query para keyword scoring
    match_count: 20
    })

    if (error) throw error

    // step 3: mapear ids a Firebase
    const results = await Promise.all(
    matches.map(async (m) => {
        const fbData = await getEmojiById(m.id)  // { emoji, label, tags }
        return {
        ...fbData,
        similarity: m.final_score || m.similarity
        }
    })
    )

    // step 4: devolver JSON
    res.json({ results })

})

export default router