import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { getFeaturedProducts } from '@/data/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const featuredProducts = getFeaturedProducts(6)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-beige-100 via-beige-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center py-12 lg:py-20">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-black text-white text-sm rounded-full">
                  徕卡 & 哈苏 专业皮套
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                为经典相机
                <br />
                定制专属保护
              </h1>
              
              <p className="text-lg text-gray-600 max-w-md">
                精选意大利头层牛皮，手工缝制，为徕卡和哈苏相机提供完美贴合的保护套装。
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition group"
                >
                  浏览皮套
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products?category=leica"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black rounded-full font-semibold hover:bg-black hover:text-white transition"
                >
                  徕卡专区
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4 text-sm text-gray-600">
                <div>
                  <p className="text-2xl font-bold text-black">10+</p>
                  <p>适配型号</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-black">意大利</p>
                  <p>进口皮革</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-black">手工</p>
                  <p>精工缝制</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-beige-200/50 to-transparent rounded-[3rem] rotate-6"></div>
              <div className="relative h-full rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://cdn.hasselblad.com/f/77891/5120x1712/12ba4aa6a2/x2d-ii-100c-pc.jpg"
                  alt="徕卡相机皮套"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-gray-400 rotate-90" />
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-sm text-gray-600 uppercase tracking-wider">精选</span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-2">新品上架</h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center text-sm font-semibold hover:gap-2 transition-all"
            >
              查看全部
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {/* Products Slider */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Navigation Arrows for Mobile */}
            <div className="flex justify-center gap-4 mt-6 sm:hidden">
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <Link
            href="/products"
            className="flex sm:hidden items-center justify-center text-sm font-semibold mt-8 hover:gap-2 transition-all"
          >
            查看全部
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Catalogs Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-sm text-gray-600 uppercase tracking-wider">浏览</span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-2">品牌分类</h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center text-sm font-semibold hover:gap-2 transition-all"
            >
              查看全部
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Leica */}
            <div className="relative group rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer">
              <Image
                src="https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/9567/3/24326/89936/65379607Fef552ea8/0ccf4e4725b59d06.jpg.avif"
                alt="徕卡皮套"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-3xl font-bold mb-2">徕卡 Leica</h3>
                <p className="text-white/90 text-sm mb-4">M / Q / SL 系列皮套</p>
                <Link href="/products?category=leica">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Hasselblad */}
            <div className="relative group rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer">
              <Image
                src="https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/211494/16/48415/26610/6740484dF6b511f79/8f486c5598ece73f.jpg.avif"
                alt="哈苏皮套"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-3xl font-bold mb-2">哈苏 Hasselblad</h3>
                <p className="text-white/90 text-sm mb-4">X / 907X 系列皮套</p>
                <Link href="/products?category=hasselblad">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Accessories */}
            <div className="relative group rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer">
              <Image
                src="https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/356786/5/13676/34422/691ef201F9997f178/962661c8ef49baef.jpg.avif"
                alt="相机配件"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-3xl font-bold mb-2">配件</h3>
                <p className="text-white/90 text-sm mb-4">肩带 / 手腕带 等</p>
                <Link href="/products?category=accessories">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Arrivals */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              更多精选皮套
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              为您的徕卡或哈苏相机选择完美的保护套装
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.slice(3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Fashion Offers Banner */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-beige-100 to-beige-200 p-8 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-semibold">
                  专业服务
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold">
                  定制服务
                  <br />
                  专属您的相机
                </h2>
                <p className="text-gray-600">
                  我们提供专业的相机皮套定制服务，根据您的相机型号和个人喜好，打造独一无二的专属皮套。支持刻字、选色、材质定制。
                </p>
                <button className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition group">
                  了解定制
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="relative h-[400px]">
                <Image
                  src="https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/354820/12/15521/55535/691ecd52F269a931d/fe37baf8cefd3a47.jpg.avif"
                  alt="定制服务"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
