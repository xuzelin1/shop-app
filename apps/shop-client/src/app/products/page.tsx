'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { getAllProducts } from '@/data/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  const products = getAllProducts()
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedSort, setSelectedSort] = useState('新品')
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['全部', '徕卡 M', '徕卡 Q', '徕卡 SL', '哈苏 X', '哈苏 907X', '配件']

  const filteredProducts = selectedCategory === '全部' 
    ? products 
    : products.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase().replace(' ', '')))

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">相机皮套全系列</h1>
          <p className="text-gray-600">为徕卡、哈苏相机提供专业保护</p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:border-black transition"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm font-medium">分类</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showFilters && (
                <div className="absolute top-full mt-2 left-0 w-48 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setShowFilters(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition ${
                        selectedCategory === category ? 'bg-gray-100 font-semibold' : ''
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Pills - Desktop */}
            <div className="hidden lg:flex items-center gap-3 flex-1 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'border border-gray-300 hover:border-black'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium appearance-none pr-10 hover:border-black transition cursor-pointer"
              >
                <option>新品</option>
                <option>价格：低到高</option>
                <option>价格：高到低</option>
                <option>最受欢迎</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
            </div>

            {/* Results Count */}
            <span className="hidden md:block text-sm text-gray-600">
              {filteredProducts.length} 件商品
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-4">此分类暂无商品</p>
            <button
              onClick={() => setSelectedCategory('全部')}
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              查看全部商品
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-black rounded-full font-semibold hover:bg-black hover:text-white transition">
              加载更多
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
