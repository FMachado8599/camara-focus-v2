import os
import json
from AppKit import (
    NSAttributedString,
    NSFont,
    NSImage,
    NSColor,
    NSGraphicsContext,
    NSBitmapImageRep,
    NSPNGFileType,
)

print(">>> SCRIPT ARRANCÓ <<<")

SIZE = 500
FONT_SIZE = 500
OUTPUT_DIR = "apple_emojis_png"
JSON_FILE = "emoji_groups.json"

os.makedirs(OUTPUT_DIR, exist_ok=True)

font = NSFont.fontWithName_size_("AppleColorEmoji", FONT_SIZE)

def codepoints_to_emoji(code_str):
    return "".join(chr(int(cp, 16)) for cp in code_str.split("-"))

with open(JSON_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

for base_key, info in data.items():
    base = info["base"].lower()
    variations = [v.lower() for v in info.get("variations", [])]

    variants = [base] + variations

    for variant in variants:
        emoji = codepoints_to_emoji(variant)

        image = NSImage.alloc().initWithSize_((SIZE, SIZE))
        image.lockFocus()

        NSGraphicsContext.currentContext().setShouldAntialias_(True)
        NSColor.clearColor().set()

        attrs = {"NSFont": font}
        text = NSAttributedString.alloc().initWithString_attributes_(emoji, attrs)

        text_size = text.size()
        x = (SIZE - text_size.width) / 2
        y = (SIZE - text_size.height) / 2 + FONT_SIZE * 0.1

        text.drawAtPoint_((x, y))
        image.unlockFocus()

        tiff = image.TIFFRepresentation()
        bitmap = NSBitmapImageRep.imageRepWithData_(tiff)
        png = bitmap.representationUsingType_properties_(NSPNGFileType, None)

        out_path = os.path.join(OUTPUT_DIR, f"{variant}.png")
        png.writeToFile_atomically_(out_path, True)

        print(f"Exportado: {variant}")

print("✔ Listo. Emojis Apple renderizados.")