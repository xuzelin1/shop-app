import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-semibold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">找不到您要的页面</h2>
        <p className="text-xl text-gray-600 mb-8">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            返回首页
          </Link>
          <Link
            href="/products"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            浏览商品
          </Link>
        </div>
      </div>
    </div>
  )
}

