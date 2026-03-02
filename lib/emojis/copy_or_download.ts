import { ref, getBlob } from "firebase/storage";
import { storage } from "@/services/firebase";

type CopyResult = {
  mode: "clipboard" | "download";
};

/* =========================
   Utils
========================= */

function normalizeCodepointForAssets(codepoint: string): string {
  return codepoint
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .split("-")
    .map(part => part.replace(/^0+/, "") || "0")
    .join("-");
}

/* =========================
   Feature detection real
========================= */

function canCopyImages() {
  return (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.write === "function" &&
    typeof window.ClipboardItem !== "undefined"
  );
}

/* =========================
   Fallback descarga
========================= */

export function downloadBlob(blob: Blob, filename: string = "emoji.png"): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* =========================
   Copy OR Download
========================= */

export async function copyOrDownloadEmoji(
  codepoint: string
): Promise<CopyResult> {
  const normalized = normalizeCodepointForAssets(codepoint);
  const path = `emojis/apple/${normalized}.png`;

  const blob = await getBlob(ref(storage, path));

  // Si no se puede copiar → descarga
  if (!canCopyImages()) {
    downloadBlob(blob, `${normalized}.png`);
    return { mode: "download" };
  }

  try {
    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type]: blob }),
    ]);

    return { mode: "clipboard" };
  } catch (err) {
    // Si falla el clipboard (Safari raro, permisos, etc)
    downloadBlob(blob, `${normalized}.png`);
    return { mode: "download" };
  }
}