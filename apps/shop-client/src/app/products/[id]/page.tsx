'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Heart, Share2, Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { getProductById, getFeaturedProducts } from '@/data/products'
import { useCartStore } from '@/store/cart'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ImageMagnifier from '@/components/ImageMagnifier'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const relatedProducts = getFeaturedProducts(4)
  const addItem = useCartStore((state) => state.addItem)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  if (!product) {
    notFound()
  }

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1)
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    setIsAdding(true)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    })
    
    // 显示添加成功提示
    setTimeout(() => {
      setIsAdding(false)
      alert('已成功加入购物车！')
    }, 300)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-black transition">首页</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/products" className="hover:text-black transition">全部商品</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href={`/products?category=${product.category}`} className="hover:text-black transition">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-black font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image with Magnifier */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100">
              <ImageMagnifier
                src={product.images[selectedImage]}
                alt={product.name}
                zoomLevel={2.5}
                magnifierSize={200}
              />
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 pointer-events-none">
                {product.brand && (
                  <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                    {product.brand}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-2xl overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-black' : 'ring-1 ring-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-6">
              {/* Title & Category */}
              <div>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full mb-3">
                  {product.category}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600">{product.slogan}</p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold">¥{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ¥{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              {/* Colors */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">颜色</span>
                  <span className="text-sm text-gray-600">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-full text-sm font-medium transition ${
                        selectedColor === color
                          ? 'bg-black text-white'
                          : 'border-2 border-gray-300 hover:border-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Info */}
              {product.model && (
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">适配型号</span>
                    <span className="font-semibold">{product.model}</span>
                  </div>
                  {product.material && (
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">材质</span>
                      <span className="font-semibold">{product.material}</span>
                    </div>
                  )}
                  {product.caseType && (
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">类型</span>
                      <span className="font-semibold">{product.caseType}</span>
                    </div>
                  )}
                  {product.weight && (
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">重量</span>
                      <span className="font-semibold">{product.weight}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div>
                <span className="font-semibold block mb-3">数量</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-black transition"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-black transition"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {isAdding ? '添加中...' : '加入购物车'}
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`py-3 border-2 rounded-full font-semibold transition flex items-center justify-center gap-2 ${
                      isFavorite
                        ? 'border-red-500 text-red-500'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                    收藏
                  </button>
                  <button className="py-3 border-2 border-gray-300 rounded-full font-semibold hover:border-black transition flex items-center justify-center gap-2">
                    <Share2 className="h-5 w-5" />
                    分享
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>订单满 ¥500 免运费</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>30 天无理由退换</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>正品保证</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">产品规格</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {product.specs.map((spec, index) => (
              <div key={index} className="flex items-start gap-3 p-6 bg-gray-50 rounded-2xl">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{spec}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">产品亮点</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <div key={index} className="group">
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-4">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">您可能还喜欢</h2>
            <Link href="/products" className="text-sm font-semibold hover:underline">
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
