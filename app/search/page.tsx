import { ProductGrid } from "@/components/product-grid"
import { getProducts } from "@/lib/data"

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams?.q || "").toLowerCase()
  const list = getProducts().filter((p) => {
    const text = `${p.name} ${p.description} ${p.categorySlug}`.toLowerCase()
    return q ? text.includes(q) : true
  })
  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold text-balance">{q ? `Search results for “${q}”` : "All gifts"}</h1>
      <ProductGrid products={list} />
    </main>
  )
}
