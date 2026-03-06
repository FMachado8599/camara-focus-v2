//test-search.js

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const q = "happy";
const emb = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: q
});

console.log(emb.data[0].embedding.length); // 1536
console.log(emb.data[0].embedding.slice(0, 10)); // ver primeros valores