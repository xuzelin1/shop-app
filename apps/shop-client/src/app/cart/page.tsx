'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getFeaturedProducts } from '@/data/products'

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore()

  const recommendedProducts = getFeaturedProducts(4)
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  const shipping = totalPrice > 500 ? 0 : 50
  const finalTotal = totalPrice + shipping

  const handleQuantityChange = (id: string, type: 'increase' | 'decrease', currentQty: number) => {
    if (type === 'increase') {
      updateQuantity(id, currentQty + 1)
    } else if (currentQty > 1) {
      updateQuantity(id, currentQty - 1)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-md">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition group"
            >
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </main>

        {/* Recommended Products */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">You may like these</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white rounded-3xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-lg font-bold">¥{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">购物车</h1>
          <p className="text-sm sm:text-base text-gray-600">
            {totalItems} 件商品
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Clear Cart Button */}
            <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold">购物车商品</h2>
              <button
                onClick={() => {
                  if (confirm('确定要清空购物车吗？')) {
                    clearCart()
                  }
                }}
                className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
              >
                清空
              </button>
            </div>

            {/* Cart Item List */}
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-lg transition"
              >
                <div className="flex gap-3 sm:gap-6">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={item.image || 'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/9567/3/24326/89936/65379607Fef552ea8/0ccf4e4725b59d06.jpg.avif'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-2">
                        <Link
                          href={`/products/${item.id}`}
                          className="font-semibold text-sm sm:text-lg hover:underline line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-gray-600 text-xs sm:text-sm mt-1">
                          单价: ¥{item.price.toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition flex-shrink-0"
                      >
                        <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </button>
                    </div>

                    {/* Quantity Controls and Subtotal */}
                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, 'decrease', item.quantity)}
                          className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <span className="text-base sm:text-lg font-semibold w-8 sm:w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 'increase', item.quantity)}
                          className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-black transition"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-xs sm:text-sm text-gray-600">小计</p>
                        <p className="text-base sm:text-xl font-bold">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="inline-flex items-center text-sm font-semibold hover:gap-2 transition-all mt-2"
            >
              ← 继续购物
            </Link>
          </div>

          {/* Order Summary - Sticky on desktop, fixed bottom on mobile */}
          <div className="lg:col-span-1">
            {/* Desktop Summary */}
            <div className="hidden lg:block sticky top-24 bg-gray-50 rounded-3xl p-8 space-y-6">
              <h2 className="text-xl font-bold">订单摘要</h2>

              {/* Price Breakdown */}
              <div className="space-y-4 py-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">小计 ({totalItems} 件)</span>
                  <span className="font-semibold">¥{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">运费</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">免运费</span>
                    ) : (
                      `¥${shipping}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">
                    再购 ¥{(500 - totalPrice).toLocaleString()} 即可免运费
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-lg font-bold py-4 border-b border-gray-200">
                <span>总计</span>
                <span className="text-2xl">¥{finalTotal.toLocaleString()}</span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                去结算
                <ArrowRight className="h-5 w-5" />
              </Link>

              {/* Promo Code */}
              <div className="pt-4 border-t border-gray-200">
                <details className="group">
                  <summary className="cursor-pointer text-sm font-semibold flex justify-between items-center">
                    <span>有优惠码？</span>
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="输入优惠码"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black transition"
                    />
                    <button className="px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition">
                      应用
                    </button>
                  </div>
                </details>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>安全结算</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30天无理由退换</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>正品保证</span>
                </div>
              </div>
            </div>

            {/* Mobile Summary - Fixed Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-600">总计</p>
                  <p className="text-xl font-bold">¥{finalTotal.toLocaleString()}</p>
                </div>
                <Link
                  href="/checkout"
                  className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition flex items-center gap-2"
                >
                  去结算
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-500 text-center">
                  再购 ¥{(500 - totalPrice).toLocaleString()} 即可免运费
                </p>
              )}
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <section className="mt-12 sm:mt-20 pb-20 lg:pb-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">您可能还喜欢</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {recommendedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.preventDefault()
                      // Add to wishlist logic
                    }}
                  >
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1">{product.slogan}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold">¥{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        ¥{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

