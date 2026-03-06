//loadEmojis.js

import fs from "fs"
import dotenv from "dotenv"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const emojis = JSON.parse(
  fs.readFileSync(
    "./node_modules/emojibase-data/en/data.json",
    "utf8"
  )
)

const BATCH_SIZE = 200

function buildText(e) {

  const group = e.group ? String(e.group).replace(/-/g, " ") : ""
  const subgroup = e.subgroup ? String(e.subgroup).replace(/-/g, " ") : ""

  return [
    "emoji",
    e.label || "",
    ...(e.tags || []),
    group,
    subgroup
  ]
    .filter(Boolean)
    .join(" ")
}

async function run() {

  console.log("dataset size:", emojis.length)

  console.log("example embedding text:")
  console.log(buildText(emojis[0]))
  console.log(emojis[0])

  for (let i = 0; i < emojis.length; i += BATCH_SIZE) {

    const batch = emojis.slice(i, i + BATCH_SIZE)

    const texts = batch.map(buildText)

    console.log(`embedding batch ${i} → ${i + batch.length}`)

    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts
    })

    const rows = batch.map((e, idx) => ({
      id: e.hexcode,
      description: texts[idx],
      embedding: response.data[idx].embedding
    }))

    const { error } = await supabase
      .from("emojis_search")
      .insert(rows)

    if (error) {
      console.error("insert error:", error)
      return
    }

    console.log("inserted:", rows.length)
  }

  console.log("done")
}

run()