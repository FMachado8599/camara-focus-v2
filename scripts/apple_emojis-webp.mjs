import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "./apple_emojis_png";
const OUTPUT_DIR = "./apple_emojis_webp";

const SIZE = 100;
const QUALITY = 65; // ideal para emojis
const formatKB = (bytes) => (bytes / 1024).toFixed(1);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs.readdirSync(INPUT_DIR).filter(f => f.endsWith(".png"));

for (const file of files) {
  const inputPath = path.join(INPUT_DIR, file);
  const baseName = file.replace(".png", "");
  const outputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);

  try {
    const originalSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .resize(SIZE, SIZE, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .webp({
        quality: QUALITY,
        effort: 6,
      })
      .toFile(outputPath);

    const webpSize = fs.statSync(outputPath).size;

    console.log(`✔ ${file}
    PNG:  ${formatKB(originalSize)} KB
    WEBP: ${formatKB(webpSize)} KB
    `);

  } catch (err) {
    console.error(`❌ Error con ${file}`, err.message);
  }
}

console.log("🎉 Listo. Solo WebP 100x100 generados.");