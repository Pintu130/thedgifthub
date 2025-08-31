import { HeroSlider } from "@/components/hero-slider"
import { CategoryGrid } from "@/components/category-grid"
import { getFeaturedProducts, getOffers, getCategories, getProducts } from "@/lib/data"
import FeaturedWithSearch from "@/components/featured-with-search"
import { ProductGrid } from "@/components/product-grid"

export default function HomePage() {
  const offers = getOffers()
  const categories = getCategories()
  const featured = getFeaturedProducts()
  const all = getProducts()

  const trending = all.slice(0, 4)
  const corporate = all.filter((p) => p.categorySlug === "corporate-gifts").slice(0, 4)

  return (
    <div className="space-y-10 md:space-y-12 max-w-6xl mx-auto">
      <HeroSlider offers={offers} />
      <section className="px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-pretty mb-6">Shop by Category</h2>
        <CategoryGrid categories={categories} />
      </section>
      <FeaturedWithSearch products={featured} />

      <section className="px-4 md:px-8">
        <h2 className="mb-4 text-xl font-semibold">Trending Gifts</h2>
        <ProductGrid products={trending} />
      </section>

      <section className="px-4 md:px-8">
        <h2 className="mb-4 text-xl font-semibold">Top Corporate Picks</h2>
        <ProductGrid products={corporate} />
      </section>
    </div>
  )
}
