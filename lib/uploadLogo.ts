import { storage } from "@/services/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"

export async function uploadLogo(file: File) {
  const fileName = `logos/${crypto.randomUUID()}-${file.name}`

  const storageRef = ref(storage, fileName)

  await uploadBytes(storageRef, file)

  const downloadUrl = await getDownloadURL(storageRef)

  return downloadUrl
}
