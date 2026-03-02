import json

print("Script arrancó")

URL = "./emoji-test.txt"
OUTPUT_JSON = "emoji_groups.json"

SKIN_TONES = {"1F3FB", "1F3FC", "1F3FD", "1F3FE", "1F3FF"}

groups = {}

with open("emoji-test.txt", "r", encoding="utf-8") as f:
    lines = f.read().splitlines()

for line in lines:
    if not line or line.startswith("#"):
        continue

    if "; fully-qualified" not in line:
        continue

    parts = line.split(";")[0].strip()
    codepoints = parts.split()

    # Emoji visual
    emoji_char = line.split("#")[1].strip().split(" ")[0]

    # Remover modificadores de piel para definir base
    base_codepoints = [cp for cp in codepoints if cp not in SKIN_TONES]
    base_key = "-".join(base_codepoints)

    full_key = "-".join(codepoints)

    if base_key not in groups:
        groups[base_key] = {
            "base": base_key,
            "variations": []
        }

    # Si es variación real (tiene skin tone)
    if set(codepoints) != set(base_codepoints):
        groups[base_key]["variations"].append(full_key)

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(groups, f, indent=2)

print(f"✔ Generados {len(groups)} grupos de emojis.")