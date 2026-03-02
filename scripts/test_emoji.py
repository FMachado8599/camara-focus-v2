from PIL import Image, ImageDraw, ImageFont

SIZE = 137
FONT_PATH = "/System/Library/Fonts/Apple Color Emoji.ttc"

emoji = "👍🏻"

img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

font = ImageFont.truetype(FONT_PATH, SIZE)

draw.text((0, 0), emoji, font=font, embedded_color=True)

img.save("test.png")

print("Listo.")