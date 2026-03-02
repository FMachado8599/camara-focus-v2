//types.ts

export type Emoji = {
  id: string
  char: string
  name: string
  keywords: string[]
  category: string
  codepoint: string
  subgroup: string
  embedding?: number[]
  emoji: string
}

export interface EmojiCategory {
  id: string
  name: string
  icon: string
  subgroups: string[]
}

export const categories: EmojiCategory[] = [
  {
    id: "people_and_body",
    name: "Smileys & People",
    icon: "\u{1F600}",
    subgroups: ["Faces", "Hands", "Expressions"],
  },
  {
    id: "animals_and_nature",
    name: "Animals & Nature",
    icon: "\u{1F43E}",
    subgroups: ["Mammals", "Birds", "Plants"],
  },
  {
    id: "food_and_drink",
    name: "Food & Drink",
    icon: "\u{1F354}",
    subgroups: ["Fruits", "Meals", "Drinks"],
  },
  {
    id: "activities",
    name: "Activities",
    icon: "\u26BD",
    subgroups: ["Sports", "Arts", "Games"],
  },
  {
    id: "travel_and_places",
    name: "Travel & Places",
    icon: "\u2708\uFE0F",
    subgroups: ["Transport", "Places", "Weather"],
  },
  {
    id: "objects",
    name: "Objects",
    icon: "\u{1F4A1}",
    subgroups: ["Tech", "Music", "Tools"],
  },
  {
    id: "symbols",
    name: "Symbols",
    icon: "\u2764\uFE0F",
    subgroups: ["Hearts", "Arrows", "Signs"],
  },
  {
    id: "flags",
    name: "Flags",
    icon: "\u{1F3F3}\uFE0F",
    subgroups: ["Countries", "Regional"],
  },
]