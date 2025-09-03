
'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

type Offer = {
  id: string
  title: string
  description: string
  discount: string
  code: string
  buttonText: string
  products: {
    image: string
    alt: string
  }[]
}

export function OffersSlider() {
  const offers: Offer[] = [
    {
      id: '1',
      title: 'ECO-FRIENDLY PRODUCTS',
      description: 'GET UPTO',
      discount: '20%',
      code: 'GREEN20',
      buttonText: 'OPEN',
      products: [
        { image: '/oak-key-stand.png', alt: 'Oak Key Stand' },
        { image: '/aluminium-phone-stand.png', alt: 'Aluminium Phone Stand' },
        { image: '/leather-diary.png', alt: 'Leather Diary' }
      ]
    },
    {
      id: '2',
      title: 'DIARY & STATIONERY',
      description: 'GET UPTO',
      discount: '30%',
      code: 'WRITE30',
      buttonText: 'EXPLORE',
      products: [
        { image: '/leather-diary-detail.png', alt: 'Premium Leather Diary' },
        { image: '/engraved-pen-corporate-gift.png', alt: 'Engraved Pen' },
        { image: '/book-cover-detail.png', alt: 'Luxury Notebook' }
      ]
    },
    {
      id: '3',
      title: 'GIFT HAMPERS',
      description: 'STARTING FROM',
      discount: '₹999',
      code: 'GIFTS50',
      buttonText: 'BROWSE',
      products: [
        { image: '/birthday-gift-hamper.png', alt: 'Birthday Gift Hamper' },
        { image: '/assorted-chocolates-gift-box.png', alt: 'Chocolate Hamper' },
        { image: '/corporate-gift-box.png', alt: 'Corporate Gift Box' }
      ]
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const currentOffer = offers[currentSlide]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [offers.length])

  return (
    <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] overflow-hidden h-36 md:h-44 bg-[#a30446] flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/offer-pattern.png')] bg-cover opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between h-full">
          {/* Left: Offer Text */}
          <div className="text-white flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">{currentOffer.title}</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-extrabold">{currentOffer.description}</span>
              <span className="text-5xl md:text-6xl font-black">{currentOffer.discount}</span>
              <span className="text-2xl md:text-3xl font-bold">OFF</span>
            </div>
          </div>
          
          {/* Middle: Promo Code */}
          <div className="flex flex-col items-center justify-center my-4 md:my-0 md:mx-8">
            <span className="text-white text-sm font-semibold mb-1">LIMITED TIME OFFER</span>
            <span className="text-white text-3xl font-black tracking-wide mb-2">SHOP NOW</span>
            <Button 
              className="bg-white text-[#a30446] hover:bg-gray-100 font-bold py-2 px-6 rounded-full text-lg"
            >
              {currentOffer.buttonText}
            </Button>
          </div>
          
          {/* Right: Product Images */}
          <div className="hidden md:flex gap-6 items-center">
            {currentOffer.products.map((product, index) => (
              <div key={index} className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-1">
                <img 
                  src={product.image} 
                  alt={product.alt}
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Dots for multiple offers */}
      {offers.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
