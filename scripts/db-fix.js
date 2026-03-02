const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()

function normalizeCategory(category) {
  return category
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\s+/g, "_")
}

async function migrateEmojis() {
  const snapshot = await db.collection("emojis").get()

  let updatedCount = 0
  let missingCodepoint = 0

  for (const document of snapshot.docs) {
    const data = document.data()

    if (!data.codepoint) {
      console.warn(`⚠️ Missing codepoint in doc: ${document.id}`)
      missingCodepoint++
    }

    const normalizedCategory = normalizeCategory(data.category)

    if (normalizedCategory !== data.category) {
      await db.collection("emojis").doc(document.id).update({
        category: normalizedCategory
      })

      console.log(`✅ Updated category in ${document.id}`)
      updatedCount++
    }
  }

  console.log("Migration finished.")
  console.log(`Updated categories: ${updatedCount}`)
  console.log(`Missing codepoints: ${missingCodepoint}`)
}

migrateEmojis()