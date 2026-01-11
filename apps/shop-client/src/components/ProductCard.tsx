'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus, Heart } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  layout?: 'grid' | 'slider'
}

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const addItem = useCartStore((state) => state.addItem)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={product.images[imageIndex]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {discount > 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
              -{discount}%
            </span>
          )}
          {product.brand && (
            <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
              {product.brand}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault()
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images[0],
              })
              alert('已加入购物车！')
            }}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Image Navigation Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault()
                  setImageIndex(idx)
                }}
                className={`w-2 h-2 rounded-full transition ${
                  idx === imageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-semibold text-base line-clamp-2">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-600 line-clamp-1 mt-1">
              {product.model ? `适配 ${product.model}` : product.category}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">¥{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ¥{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.material && (
              <p className="text-xs text-gray-500 mt-1">{product.material}</p>
            )}
          </div>

          {/* Color Count */}
          {product.colors && product.colors.length > 0 && (
            <span className="text-xs text-gray-500">
              {product.colors.length} 色
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

