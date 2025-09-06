"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Star, Tag, IndianRupee, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CategoryFiltersProps {
  isMobile?: boolean
  onApply?: () => void
  onClear?: () => void
}

export function CategoryFilters({ isMobile = false, onApply, onClear }: CategoryFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [localPrice, setLocalPrice] = useState<number[]>(() => {
    const price = params.get("price")
    return price ? price.split('-').map(Number) : [0, 10000]
  })
  const [localRating, setLocalRating] = useState(params.get("rating") || "")
  const [localOffer, setLocalOffer] = useState(params.get("offer") === "1")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sync local state with URL params
  useEffect(() => {
    const price = params.get("price")
    if (price) {
      setLocalPrice(price.split('-').map(Number))
    } else {
      setLocalPrice([0, 10000])
    }
    setLocalRating(params.get("rating") || "")
    setLocalOffer(params.get("offer") === "1")
  }, [params])

  const applyFilters = useCallback(() => {
    const sp = new URLSearchParams()
    
    // Price
    if (localPrice[0] > 0 || localPrice[1] < 10000) {
      sp.set("price", `${localPrice[0]}-${localPrice[1]}`)
    }
    
    // Rating
    if (localRating) {
      sp.set("rating", localRating)
    }
    
    // Offer
    if (localOffer) {
      sp.set("offer", "1")
    }
    
    router.push(`${pathname}?${sp.toString()}`)
    onApply?.()
  }, [localPrice, localRating, localOffer, pathname, router, onApply])

  const clearFilters = () => {
    router.push(pathname)
    onClear?.()
  }

  const renderFilters = () => (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-primary hover:text-primary/80"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="space-y-4 rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
          <span>Price Range</span>
        </div>
        <div className="px-2">
          <Slider
            value={[localPrice[0], Math.min(localPrice[1], 10000)]}
            max={10000}
            step={100}
            minStepsBetweenThumbs={100}
            onValueChange={(value) => setLocalPrice([value[0], value[1]])}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{localPrice[0].toLocaleString()}</span>
            <span>₹{localPrice[1] > 10000 ? '10,000+' : localPrice[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3 rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Star className="h-4 w-4 text-muted-foreground" />
          <span>Customer Rating</span>
        </div>
        <div className="space-y-2">
          {[4, 3, 2].map((star) => (
            <div key={star} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`rating-${star}`}
                name="rating"
                checked={localRating === star.toString()}
                onChange={() => setLocalRating(star.toString())}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <Label htmlFor={`rating-${star}`} className="flex items-center text-sm font-normal">
                {Array(star).fill(0).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-1">&amp; up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Offers Filter */}
      <div className="space-y-3 rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span>Offers</span>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="offers" 
            checked={localOffer}
            onCheckedChange={(checked) => setLocalOffer(checked === true)}
          />
          <Label htmlFor="offers" className="text-sm font-normal">
            Special Offers Only
          </Label>
        </div>
      </div>

      {isMobile && isMounted && (
        <div className="sticky bottom-0 left-0 right-0 bg-background border-t p-4 -mx-4 -mb-4 flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={clearFilters}
          >
            Clear All
          </Button>
          <Button 
            className="flex-1"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </div>
      )}
    </>
  )

  // Desktop view
  if (!isMobile) {
    return (
      <aside className="w-72 space-y-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto pb-20">
        {renderFilters()}
      </aside>
    )
  }

  // Mobile view - Sheet component
  return (
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" className="md:hidden flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <line x1="3" x2="21" y1="6" y2="6" />
        <line x1="3" x2="21" y1="12" y2="12" />
        <line x1="3" x2="21" y1="18" y2="18" />
      </svg>
      Filters
    </Button>
  </SheetTrigger>

  <SheetContent
    side="right"
    className="w-[85vw] max-w-md h-screen flex flex-col p-0"
  >
    {/* Sticky Header */}
    <SheetHeader className="border-b p-4 shrink-0">
      <SheetTitle className="text-lg font-semibold">Filters</SheetTitle>
    </SheetHeader>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-6">{renderFilters()}</div>
    </div>
  </SheetContent>
</Sheet>

  )
}
