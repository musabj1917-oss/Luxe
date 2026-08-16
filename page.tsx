'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { products, categories } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { SlidersHorizontal } from 'lucide-react'

export default function ShopPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'

  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState<'all' | 'under5k' | '5kto10k' | 'over10k'>('all')

  const filteredProducts = useMemo(() => {
    let filtered = activeCategory === 'All' 
      ? products 
      : products.filter((p) => p.category === activeCategory)

    if (priceRange === 'under5k') {
      filtered = filtered.filter((p) => p.price < 5000)
    } else if (priceRange === '5kto10k') {
      filtered = filtered.filter((p) => p.price >= 5000 && p.price <= 10000)
    } else if (priceRange === 'over10k') {
      filtered = filtered.filter((p) => p.price > 10000)
    }

    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [activeCategory, sortBy, priceRange])

  return (
    <div className="min-h-screen bg-boutique-50">
      {/* Header */}
      <div className="bg-boutique-900 text-gold-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-400 mb-3">
            Discover
          </p>
          <h1 className="text-3xl lg:text-5xl font-serif font-light">
            Our Collection
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-boutique-900 text-gold-100'
                    : 'bg-white text-boutique-600 hover:bg-boutique-100 border border-boutique-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Price */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-boutique-500">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter:</span>
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as any)}
              className="px-3 py-2 bg-white border border-boutique-200 text-sm text-boutique-700 focus:outline-none focus:border-boutique-400"
            >
              <option value="all">All Prices</option>
              <option value="under5k">Under ETB 5,000</option>
              <option value="5kto10k">ETB 5,000 - 10,000</option>
              <option value="over10k">Over ETB 10,000</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border border-boutique-200 text-sm text-boutique-700 focus:outline-none focus:border-boutique-400"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-boutique-400 mb-6">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-boutique-400 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('All')
                setPriceRange('all')
                setSortBy('featured')
              }}
              className="mt-4 text-gold-600 hover:text-gold-700 text-sm underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
