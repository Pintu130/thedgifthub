export const categories = [
  { slug: "all", name: "All" },
  { slug: "birthday", name: "Birthday" },
  { slug: "anniversary", name: "Anniversary" },
  { slug: "personalized", name: "Personalized" },
  { slug: "flowers", name: "Flowers" },
  { slug: "chocolates", name: "Chocolates" },
  { slug: "toys", name: "Toys" },
  { slug: "corporate", name: "Corporate" },
]

export const products = [
  // Images use built-in placeholder generator
  {
    id: "g1",
    slug: "custom-photo-mug",
    name: "Custom Photo Mug",
    price: 299,
    image: "/custom-photo-mug-gift.png",
    category: "personalized",
    discountPct: 25,
  },
  {
    id: "g2",
    slug: "rose-bouquet",
    name: "Rose Bouquet (24 roses)",
    price: 799,
    image: "/rose-bouquet-24-roses.png",
    category: "flowers",
    discountPct: 10,
  },
  {
    id: "g3",
    slug: "assorted-chocolates-box",
    name: "Assorted Chocolates Box",
    price: 499,
    image: "/assorted-chocolates-gift-box.png",
    category: "chocolates",
  },
  {
    id: "g4",
    slug: "teddy-bear-large",
    name: "Teddy Bear (Large)",
    price: 1099,
    image: "/large-teddy-bear-gift.png",
    category: "toys",
    discountPct: 15,
  },
  {
    id: "g5",
    slug: "anniversary-frame",
    name: "Anniversary Frame",
    price: 899,
    image: "/anniversary-photo-frame-gift.png",
    category: "anniversary",
  },
  {
    id: "g6",
    slug: "birthday-hamper",
    name: "Birthday Gift Hamper",
    price: 1299,
    image: "/birthday-gift-hamper.png",
    category: "birthday",
    discountPct: 20,
  },
  {
    id: "g7",
    slug: "engraved-pen-set",
    name: "Engraved Pen Set",
    price: 699,
    image: "/engraved-pen-corporate-gift.png",
    category: "corporate",
  },
  {
    id: "g8",
    slug: "photo-cushion",
    name: "Photo Cushion",
    price: 649,
    image: "/personalized-photo-cushion-gift.png",
    category: "personalized",
  },
] as const

export type GiftProduct = (typeof products)[number]

export function getBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function listByCategory(slug: string, q?: string) {
  const base = slug === "all" ? products : products.filter((p) => p.category === slug)
  if (q) {
    const s = q.toLowerCase()
    return base.filter((p) => p.name.toLowerCase().includes(s))
  }
  return base
}
