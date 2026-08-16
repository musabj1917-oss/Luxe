export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured?: boolean
  badge?: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Silk Evening Dress',
    description: 'Elegant silk evening dress with delicate embroidery. Perfect for special occasions and formal events. Features a flowing silhouette and premium Italian silk fabric.',
    price: 8500,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Midnight Black', 'Champagne', 'Burgundy'],
    inStock: true,
    featured: true,
    badge: 'Best Seller',
  },
  {
    id: '2',
    name: 'Linen Summer Blouse',
    description: 'Breathable linen blouse with hand-stitched details. Ideal for warm days with a relaxed yet sophisticated look.',
    price: 3200,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1551163943-3f6a29e39426?w=800&q=80',
    sizes: ['S', 'M', 'L'],
    colors: ['Cream', 'Sage', 'Terracotta'],
    inStock: true,
  },
  {
    id: '3',
    name: 'Tailored Wool Coat',
    description: 'Premium wool coat with a tailored fit. Timeless design that transitions perfectly from day to night.',
    price: 12500,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Charcoal', 'Navy'],
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Handwoven Scarf',
    description: 'Artisan-crafted scarf using traditional Ethiopian weaving techniques. Soft, warm, and uniquely beautiful.',
    price: 1800,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
    sizes: ['One Size'],
    colors: ['Multi', 'Earth', 'Ocean'],
    inStock: true,
    badge: 'Artisan',
  },
  {
    id: '5',
    name: 'Pleated Midi Skirt',
    description: 'Elegant pleated midi skirt in flowing fabric. Versatile piece that pairs beautifully with any top.',
    price: 4500,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0ujf5?w=800&q=80',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Blush', 'Olive'],
    inStock: true,
  },
  {
    id: '6',
    name: 'Embroidered Kaftan',
    description: 'Luxurious kaftan with intricate hand embroidery. A statement piece that celebrates cultural heritage.',
    price: 9800,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
    sizes: ['S/M', 'L/XL'],
    colors: ['Gold', 'Emerald', 'Royal Blue'],
    inStock: true,
    featured: true,
    badge: 'New Arrival',
  },
  {
    id: '7',
    name: 'Leather Crossbody Bag',
    description: 'Genuine leather crossbody bag with gold-tone hardware. Compact yet spacious enough for essentials.',
    price: 5600,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    sizes: ['One Size'],
    colors: ['Tan', 'Black', 'Cognac'],
    inStock: true,
  },
  {
    id: '8',
    name: 'Cashmere Sweater',
    description: 'Ultra-soft cashmere sweater with a relaxed fit. The ultimate in everyday luxury.',
    price: 7200,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Heather Grey', 'Navy'],
    inStock: true,
  },
]

export const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories']
