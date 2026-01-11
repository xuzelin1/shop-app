'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderNo = searchParams.get('orderNo')
  const total = searchParams.get('total')

  useEffect(() => {
    // 可以在这里发送订单确认邮件等
  }, [orderNo])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold mb-4">订单提交成功！</h1>
          <p className="text-xl text-gray-600 mb-8">
            感谢您的购买，我们将尽快为您发货
          </p>

          {/* Order Info */}
          <div className="bg-gray-50 rounded-3xl p-8 mb-8 text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">订单号</p>
                <p className="text-lg font-bold">{orderNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">订单金额</p>
                <p className="text-lg font-bold text-red-600">¥{total}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">订单状态</p>
                <p className="text-lg font-semibold text-green-600">待支付</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">下单时间</p>
                <p className="text-lg font-semibold">
                  {new Date().toLocaleString('zh-CN')}
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-3xl p-8 mb-8 text-left">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Package className="h-6 w-6 mr-2" />
              接下来
            </h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 text-sm">
                  1
                </span>
                <span>我们已收到您的订单，正在准备发货</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 text-sm">
                  2
                </span>
                <span>您将收到订单确认邮件和物流信息</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 text-sm">
                  3
                </span>
                <span>预计 3-5 个工作日送达</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition group"
            >
              继续购物
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black rounded-full font-semibold hover:bg-gray-50 transition"
            >
              返回首页
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              有问题？联系我们的客服团队：
              <a href="tel:400-xxx-xxxx" className="text-black font-semibold hover:underline ml-2">
                400-xxx-xxxx
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

