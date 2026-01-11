'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const totalItems = getTotalItems()

  // 等待客户端挂载后再显示购物车数量
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">V</span>
            </div>
            <span className="font-semibold text-lg">off.store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm">
            <Link href="/products?category=leica" className="hover:text-gray-600 transition">
              徕卡 Leica
            </Link>
            <Link href="/products?category=hasselblad" className="hover:text-gray-600 transition">
              哈苏 Hasselblad
            </Link>
            <Link href="/products?category=accessories" className="hover:text-gray-600 transition">
              配件
            </Link>
            <Link href="/products" className="hover:text-gray-600 transition">
              全部商品
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <ShoppingBag className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/login"
              className="hidden md:block px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-black transition"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/products?category=leica"
                className="text-sm hover:text-gray-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                徕卡 Leica
              </Link>
              <Link
                href="/products?category=hasselblad"
                className="text-sm hover:text-gray-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                哈苏 Hasselblad
              </Link>
              <Link
                href="/products?category=accessories"
                className="text-sm hover:text-gray-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                配件
              </Link>
              <Link
                href="/products"
                className="text-sm hover:text-gray-600 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                全部商品
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

