export type Category = {
  slug: string
  name: string
  image?: string
}

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  price: number
  categorySlug: string
  images?: string[]
  createdAt?: number
}

export type Offer = {
  id: string
  title: string
  description?: string
  image: string
  cta?: string
  className?: string
}
