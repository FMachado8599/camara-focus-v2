import json
from PIL import Image, ImageDraw, ImageFont
import os

FONT_PATH = "AppleColorEmoji.ttf"  # o NotoColorEmoji.ttf
SIZE = 256
OUTPUT_DIR = "emoji_png"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def codepoints_to_emoji(code_str):
    chars = ""
    for cp in code_str.split("-"):
        chars += chr(int(cp, 16))
    return chars

with open("emoji_groups.json", "r", encoding="utf-8") as f:
    data = json.load(f)

font = ImageFont.truetype(FONT_PATH, SIZE)

for base, info in data.items():
    all_variants = [info["codepoints"]] + info.get("skin_variants", [])

    for variant in all_variants:
        emoji_char = codepoints_to_emoji(variant)

        img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        draw.text((0, 0), emoji_char, font=font, embedded_color=True)

        img.save(f"{OUTPUT_DIR}/{variant}.png")

print("Listo.")