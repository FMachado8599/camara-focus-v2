export function getEmojiPlaceholderUrl(codepoint: string) {
  const lower = codepoint.toLowerCase();
  return `https://firebasestorage.googleapis.com/v0/b/camara-focus.firebasestorage.app/o/emojis%2Fapple-placeholders%2F${lower}.webp?alt=media`;
}