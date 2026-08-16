import Link from 'next/link'
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-boutique-950 text-boutique-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-gold-200 tracking-[0.15em] mb-4">
              LUMIÈRE
            </h3>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Curating timeless elegance since 2024. Every piece tells a story of craftsmanship and passion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-boutique-400 hover:text-gold-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-boutique-400 hover:text-gold-300 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-300 mb-6">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-sm hover:text-gold-200 transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Dresses" className="text-sm hover:text-gold-200 transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Accessories" className="text-sm hover:text-gold-200 transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm hover:text-gold-200 transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-300 mb-6">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0" />
                <span className="text-sm">
                  Bole Road, Near Millennium Hall<br />
                  Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-sm">+251 911 234 567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-sm">hello@lumiere-boutique.et</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-boutique-800 text-center">
          <p className="text-xs text-boutique-500">
            © 2026 Lumière Boutique. All rights reserved. Crafted with elegance.
          </p>
        </div>
      </div>
    </footer>
  )
}
