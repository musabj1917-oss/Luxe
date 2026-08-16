'use client'

import Link from 'next/link'
import { Button } from './ui/Button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative bg-boutique-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a035' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-6 animate-fade-in">
            Est. 2024 — Addis Ababa
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-gold-100 mb-6 leading-tight animate-fade-in">
            Elegance
            <span className="italic text-gold-300"> Redefined</span>
          </h1>
          <p className="text-boutique-300 text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed animate-fade-in">
            Curated fashion for the modern woman. Discover timeless pieces crafted with
            precision and passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link href="/shop">
              <Button size="lg" className="group">
                Shop Collection
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg" className="border-gold-400 text-gold-300 hover:bg-gold-400 hover:text-boutique-900">
                View Lookbook
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30" />
    </section>
  )
}
