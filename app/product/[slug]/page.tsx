"use client"
import Script from "next/script"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { ShoppingCart, Bolt, MapPin, BadgePercent, Star } from "lucide-react"

import { useAppDispatch } from "@/store/hooks"
import { addItem } from "@/store/slices/cart-slice"
import { getProductBySlug } from "@/lib/data"
import { Reviews, type Review } from "@/components/reviews"
import { ProductGallery } from "@/components/product-gallery"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [pincode, setPincode] = useState("")
  const [eta, setEta] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const product = getProductBySlug(params.slug)

  // derive basic rating/review data for UI
  const rating = 4.6
  const reviewCount = 132

  const mrp = useMemo(() => (product ? Math.round(product.price * 1.35 * 100) / 100 : 0), [product])
  const offPct = useMemo(() => (product ? Math.round(((mrp - product.price) / mrp) * 100) : 0), [mrp, product])

  const addToCart = () => {
    if (!product) return
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "/gift-product.png",
        qty: 1,
      }),
    )
  }

  const buyNow = () => {
    addToCart()
    router.push("/cart")
  }

  const checkPincode = () => {
    const clean = pincode.trim()
    if (/^\d{6}$/.test(clean)) {
      setEta("Delivery by " + new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString())
    } else {
      setEta("Enter valid 6-digit pincode")
    }
  }

  const reviews: Review[] = [
    {
      id: "r1",
      author: "Aarav",
      rating: 4.5,
      date: "2 weeks ago",
      text: "Quality is great, packaging was neat. Good for gifting.",
    },
    { id: "r2", author: "Isha", rating: 5, date: "1 month ago", text: "Exactly as described. Loved the finish!" },
    { id: "r3", author: "Vikram", rating: 4, date: "2 months ago", text: "Worth the price. Fast delivery." },
  ]

  if (!product) {
    return <div className="px-4 md:px-8 py-16">Product not found.</div>
  }

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images?.length ? product.images : ["/gift-product.png"],
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: "The D Gift Hub" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `/${product.slug}`,
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: rating, reviewCount },
  }

  return (
    <>
      {/* JSON-LD for SEO */}
      <Script
        id="product-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      <div className="px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* LEFT: Gallery */}
        <div>
          <ProductGallery images={product.images || []} alt={product.name} />
        </div>

        {/* RIGHT: Info */}
        <div className="space-y-4">
          {/* Offer pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Limited time: 10% OFF + Free gift wrap
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold text-pretty">{product.name}</h1>

          {/* Rating + link to reviews */}
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5">
              <Star className="h-4 w-4 fill-current text-yellow-500" /> {rating.toFixed(1)}
            </span>
            <a href="#reviews" className="text-primary hover:underline">
              {reviewCount} Reviews
            </a>
          </div>

          {/* Price + discount */}
          <div className="flex items-end gap-3">
            <p className="text-primary text-2xl font-semibold">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground line-through">${mrp.toFixed(2)}</p>
            <p className="text-green-600 text-sm font-medium">{offPct}% off</p>
          </div>

          {/* Short description */}
          <p className="text-muted-foreground">{product.description}</p>

          {/* Offers */}
          <section className="space-y-2">
            <h2 className="text-sm font-semibold">Available offers</h2>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <BadgePercent className="h-4 w-4 text-primary mt-0.5" />
                <span>Bank Offer: 5% cashback on select cards</span>
              </li>
              <li className="flex items-start gap-2">
                <BadgePercent className="h-4 w-4 text-primary mt-0.5" />
                <span>Up to ₹150 Instant Cashback via UPI (min order ₹199)</span>
              </li>
              <li className="flex items-start gap-2">
                <BadgePercent className="h-4 w-4 text-primary mt-0.5" />
                <span>Free gift wrap included</span>
              </li>
            </ul>
          </section>

          {/* Delivery / Pincode */}
          <section className="rounded-md border bg-card p-3 space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Delivery</h3>
            </div>
            <div className="flex items-center gap-2">
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter pincode"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Enter delivery pincode"
              />
              <button
                onClick={checkPincode}
                className="h-10 shrink-0 rounded-md border px-3 text-sm"
                aria-label="Check delivery"
              >
                Check
              </button>
            </div>
            {eta && <p className="text-xs text-muted-foreground">{eta}</p>}
          </section>

          {/* Highlights */}
          <section className="mt-2">
            <h2 className="font-medium mb-2">Highlights</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Effective Pixels: 1080 MP</li>
              <li>Sensor Type: CMOS</li>
              <li>Resolution: 1080</li>
              <li>Packaging: Gift-ready</li>
            </ul>
          </section>

          {/* Seller / Policies */}
          <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <li className="rounded-md border bg-card px-3 py-2">
              Seller: <span className="font-medium">onlinebazzarindia</span>{" "}
              <span className="ml-1 inline-flex items-center gap-1 rounded bg-emerald-600 px-1.5 py-0.5 text-xs text-white">
                <Star className="h-3 w-3 fill-current" /> 3.6
              </span>
            </li>
            <li className="rounded-md border bg-card px-3 py-2">7 Days Replacement Policy</li>
            <li className="rounded-md border bg-card px-3 py-2">Warranty: 6 months</li>
            <li className="rounded-md border bg-card px-3 py-2">Cash on Delivery available</li>
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3 pt-2">
            <button
              onClick={addToCart}
              className="inline-flex items-center rounded-md bg-amber-500 px-4 py-2 font-medium text-black hover:bg-amber-600"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </button>
            <button
              onClick={buyNow}
              className="inline-flex items-center rounded-md bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
            >
              <Bolt className="mr-2 h-4 w-4" /> Buy Now
            </button>
          </div>

          {/* Reviews */}
          <div id="reviews" className="pt-6">
            <h2 className="font-medium mb-2">Reviews</h2>
            <Reviews reviews={reviews} />
          </div>
        </div>
      </div>

      {/* Fixed bottom bar on mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <button
            aria-label="Add to cart"
            className="h-12 w-12 rounded-md bg-amber-500 text-black flex items-center justify-center shadow hover:bg-amber-600"
            onClick={addToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button
            className="h-12 flex-1 rounded-md bg-orange-500 text-white font-medium shadow hover:bg-orange-600"
            onClick={buyNow}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Bolt className="h-5 w-5" /> Buy Now
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
