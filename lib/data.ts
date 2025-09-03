import type { Category, Product, Offer } from "./types"

export function getCategories(): Category[] {
  return [
    { 
      slug: "corporate-gifts", 
      name: "Corporate Gifts",
      image: "/corporate-gift-box.png"
    },
    { 
      slug: "leather-bags", 
      name: "Leather Bags",
      image: "/leather-diary.png"
    },
    { 
      slug: "coffee-mugs", 
      name: "Coffee Mugs",
      image: "/custom-photo-mug-gift.png"
    },
    { 
      slug: "steel-water-bottles", 
      name: "Steel Water Bottles",
      image: "/gift-box-detail.png"
    },
    { 
      slug: "table-decoration-items", 
      name: "Table Decor",
      image: "/placeholder.svg?height=96&width=96&query=gift%20category"
    },
    { 
      slug: "wallet", 
      name: "Wallets",
      image: "/placeholder.svg?height=96&width=96&query=gift%20category"
    },
    { 
      slug: "gift-sets", 
      name: "Gift Sets",
      image: "/gift-box-open.png"
    },
    { 
      slug: "diaries", 
      name: "Diaries",
      image: "/diary-and-stationery.png"
    },
  ]
}

export function getOffers(): Offer[] {
  return [
    {
      id: "o1",
      title: "Corporate Gifting Made Easy",
      description: "Impress your clients and employees with our premium corporate gifts. Customized solutions for every business need and budget.",
      image: "/corporate-gift-box.png",
      cta: "Explore Corporate Gifts",
      className: "bg-gradient-to-r from-blue-600/70 to-blue-800/70"
    },
    {
      id: "o2",
      title: "Functional Phone Stands",
      description: "Enhance productivity with our ergonomic phone stands. Perfect for work, video calls, and hands-free viewing.",
      image: "/aluminium-phone-stand.png",
      cta: "Shop Phone Stands",
      className: "bg-gradient-to-r from-amber-600/70 to-amber-800/70"
    },
    {
      id: "o3",
      title: "Premium Diaries & Stationery",
      description: "Elegant and functional diaries to keep you organized in style. Perfect for professionals and students alike.",
      image: "/leather-diary.png",
      cta: "Browse Diaries",
      className: "bg-gradient-to-r from-emerald-600/70 to-emerald-800/70"
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
  {
    id: "p6",
    slug: "corporate-gift-box",
    name: "Corporate Gift Box",
    description: "A curated set of premium items for corporate gifting.",
    price: 79.0,
    categorySlug: "corporate-gifts",
    images: ["/corporate-gift-box.png", "/gift-box-open.png", "/gift-box-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "p7",
    slug: "corporate-gift-box",
    name: "Corporate Gift Box",
    description: "A curated set of premium items for corporate gifting.",
    price: 79.0,
    categorySlug: "corporate-gifts",
    images: ["/corporate-gift-box.png", "/gift-box-open.png", "/gift-box-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "p8",
    slug: "corporate-gift-box",
    name: "Corporate Gift Box",
    description: "A curated set of premium items for corporate gifting.",
    price: 79.0,
    categorySlug: "corporate-gifts",
    images: ["/corporate-gift-box.png", "/gift-box-open.png", "/gift-box-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "p9",
    slug: "corporate-gift-box",
    name: "Corporate Gift Box",
    description: "A curated set of premium items for corporate gifting.",
    price: 79.0,
    categorySlug: "corporate-gifts",
    images: ["/corporate-gift-box.png", "/gift-box-open.png", "/gift-box-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "p10",
    slug: "corporate-gift-box",
    name: "Corporate Gift Box",
    description: "A curated set of premium items for corporate gifting.",
    price: 79.0,
    categorySlug: "corporate-gifts",
    images: ["/corporate-gift-box.png", "/gift-box-open.png", "/gift-box-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "p11",
    slug: "corporate-gift-box",
    name: "Corporate Gift Box",
    description: "A curated set of premium items for corporate gifting.",
    price: 79.0,
    categorySlug: "corporate-gifts",
    images: ["/corporate-gift-box.png", "/gift-box-open.png", "/gift-box-detail.png"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "p12",
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
