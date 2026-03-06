// /api/emoji-search/route.ts

import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { db } from "@/services/firebase";
import { doc, getDoc, collection } from "firebase/firestore";
import { getEmojiPlaceholderUrl } from "@/lib/emojis/placeholders";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getEmojiByCodepoint(codepoint: string) {
  const docRef = doc(collection(db, "emojis"), codepoint);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return { codepoint, emoji: "❓", label: "unknown", tags: [] };
  const data = docSnap.data();
  return {
    codepoint,
    emoji: data?.emoji || "❓",
    label: data?.name || "unknown",
    tags: data?.keywords || [],
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  if (!q) return new Response(JSON.stringify({ results: [] }), { status: 200 });

  // 1️⃣ generar embedding
  const embRes = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: q,
  });
  const vector = embRes.data[0].embedding;

  // 2️⃣ llamar RPC híbrida en Supabase
  const { data: matches, error } = await supabase.rpc("match_emojis", {
    query_embedding: vector,
    query_text: q,
    match_count: 20,
  });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  // 3️⃣ mapear codepoints a Firebase y construir URLs
  const results = await Promise.all(
    matches.map(async (m: any) => {
      const fbData = await getEmojiByCodepoint(m.id); // id = codepoint
      return {
        ...fbData,
        similarity: m.final_score,
        placeholderUrl: getEmojiPlaceholderUrl(m.id),
        pngUrl: `https://firebasestorage.googleapis.com/v0/b/camara-focus.firebasestorage.app/o/emojis%2Fapple%2F${m.id.toLowerCase()}.png?alt=media`,
      };
    })
  );

  return new Response(JSON.stringify({ results }), { status: 200 });
}

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url)
//   const q = searchParams.get("q")
//   if (!q) return new Response(JSON.stringify({ results: [] }), { status: 200 })

//   // 1️⃣ generar embedding
//   const embRes = await openai.embeddings.create({
//     model: "text-embedding-3-small",
//     input: q
//   })
//   const vector = embRes.data[0].embedding

//   // 2️⃣ llamar RPC híbrida
//   const { data: matches, error } = await supabase.rpc("match_emojis", {
//     query_embedding: vector,
//     query_text: q,
//     match_count: 20
//   })

//   if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

//   // 3️⃣ mapear IDs a Firebase
//   const results = await Promise.all(
//     matches.map(async (m: any) => {
//       const fbData = await getEmojiById(m.id)
//       return {
//         ...fbData,
//         similarity: m.final_score
//       }
//     })
//   )

//   // 4️⃣ devolver JSON
//   return new Response(JSON.stringify({ results }), { status: 200 })
// }
