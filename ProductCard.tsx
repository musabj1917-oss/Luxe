'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Check } from 'lucide-react'
import { Product } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCart } from './CartProvider'
import { Button } from './ui/Button'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [selectedSize] = useState(product.sizes[0])
  const [selectedColor] = useState(product.colors[0])

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-boutique-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-boutique-900 text-gold-200 text-[10px] uppercase tracking-wider px-3 py-1">
            {product.badge}
          </span>
        )}
        {product.featured && !product.badge && (
          <span className="absolute top-3 left-3 bg-gold-500 text-boutique-900 text-[10px] uppercase tracking-wider px-3 py-1 font-semibold">
            Featured
          </span>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-boutique-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            {added ? (
              <>
                <Check className="w-3 h-3 mr-1" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 mr-1" /> Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-boutique-400 mb-1">
          {product.category}
        </p>
        <Link href={`/shop?product=${product.id}`}>
          <h3 className="font-serif text-lg text-boutique-900 mb-1 group-hover:text-gold-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-boutique-500 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-boutique-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-boutique-400">
            {product.sizes.length} sizes
          </span>
        </div>
      </div>
    </div>
  )
}
