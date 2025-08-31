import type { Category, Product, Offer } from "./types"

export function getCategories(): Category[] {
  return [
    { slug: "corporate-gifts", name: "Corporate Gifts" },
    { slug: "phone-stand", name: "Phone Stand" },
    { slug: "diary", name: "Diary" },
    { slug: "books", name: "Books" },
    { slug: "key-stand", name: "Key Stand" },
  ]
}

export function getOffers(): Offer[] {
  return [
    {
      id: "o1",
      title: "Corporate Gifting Made Easy",
      image: "/corporate-gifting.png",
      cta: "Explore Corporate Gifts",
    },
    {
      id: "o2",
      title: "Functional Phone Stands",
      image: "/phone-stand.png",
      cta: "Shop Phone Stands",
    },
    {
      id: "o3",
      title: "Premium Diaries & Stationery",
      image: "/diary-and-stationery.png",
      cta: "Browse Diaries",
    },
  ]
}

const products: Product[] = [
  {
    id: "p1",
    slug: "aluminium-phone-stand",
    name: "Aluminium Phone Stand",
    description: "Sleek and sturdy stand for phones. Perfect for desks and video calls.",
    price: 29.99,
    categorySlug: "phone-stand",
    images: ["/aluminium-phone-stand.png", "/phone-stand-side.png", "/phone-stand-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "p2",
    slug: "leather-diary",
    name: "Leather Diary",
    description: "Premium leather-bound diary for notes, journaling, and planning.",
    price: 39.5,
    categorySlug: "diary",
    images: ["/leather-diary.png", "/leather-diary-inside.png", "/leather-diary-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "p3",
    slug: "gift-book-inspiration",
    name: "Gift Book: Inspiration",
    description: "Beautifully curated book full of inspiring stories and quotes.",
    price: 24.0,
    categorySlug: "books",
    images: ["/inspiration-book.png", "/book-spread.png", "/book-cover-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "p4",
    slug: "oak-key-stand",
    name: "Oak Key Stand",
    description: "Elegant oak stand to keep your keys organized.",
    price: 19.99,
    categorySlug: "key-stand",
    images: ["/oak-key-stand.png", "/key-stand-side.png", "/key-stand-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: "p5",
    slug: "corporate-gift-box",
    name: "Corporate Gift Box",
    description: "A curated set of premium items for corporate gifting.",
    price: 79.0,
    categorySlug: "corporate-gifts",
    images: ["/corporate-gift-box.png", "/gift-box-open.png", "/gift-box-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
]

export function getProducts(): Product[] {
  return products
}

export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4)
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug)
}
