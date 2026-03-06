import fs from "fs"
import { createClient } from "@supabase/supabase-js"
import 'dotenv/config'

// crear cliente
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// cargar dataset
const emojis = JSON.parse(
  fs.readFileSync(
    "./node_modules/emojibase-data/en/data.json",
    "utf8"
  )
)

// agarrar uno solo para probar
const e = emojis[0]

const text = [
  e.annotation,
  ...(e.tags || []),
  "emoji"
].join(" ")

const { data, error } = await supabase
  .from("emojis_search")
  .insert({
    id: e.hexcode,
    description: text,
    embedding: vector
  })
  
console.log("insert result:", data, error)

console.log("dataset size:", emojis.length)

console.log("URL:", process.env.SUPABASE_URL)
console.log("KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY)