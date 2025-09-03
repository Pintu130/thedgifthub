import { Heart, Gift, Shield, Truck, MessageSquare, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-background border-t mt-16">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">The D Gift Hub</h3>
            <p className="text-muted-foreground text-sm">
              Curating thoughtful gifts for every occasion. Making gifting special, one present at a time.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Gift Guides</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-foreground transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <MessageSquare className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>support@thedgifthub.com</span>
              </li>
              <li className="flex items-start">
                <span>Mon-Sat: 10:00 AM - 7:00 PM</span>
              </li>
              <li className="pt-4">
                <p className="text-xs text-muted-foreground">
                  Subscribe to our newsletter for the latest updates and offers
                </p>
                <div className="mt-2 flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-3 py-2 text-sm border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                  />
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md text-sm font-medium hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-muted mb-8">
          <div className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-primary" />
            <span className="text-sm">Thoughtful Gifts</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm">Secure Payments</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-primary" />
            <span className="text-sm">Fast Delivery</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-sm">Made with Love</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} The D Gift Hub. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <div className="flex items-center">
              <span className="mr-1">Payments:</span>
              <span className="font-medium">Stripe Only</span>
              <span className="mx-1">•</span>
              <span>No COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
