const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

async function fixCodepoints() {
  const snapshot = await db.collection("emojis").get()

  let updated = 0

  for (const doc of snapshot.docs) {
    const data = doc.data()

    if (data.codepoint?.includes(" ")) {
      const fixed = data.codepoint.replace(/\s+/g, "-")

      await doc.ref.update({
        codepoint: fixed
      })

      console.log(`Fixed ${doc.id}`)
      updated++
    }
  }

  console.log("Done. Updated:", updated)
}

fixCodepoints()