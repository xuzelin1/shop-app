'use client'

import Link from 'next/link'
import { XCircle, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CheckoutFailPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Fail Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>

          {/* Fail Message */}
          <h1 className="text-4xl font-bold mb-4">支付失败</h1>
          <p className="text-xl text-gray-600 mb-8">
            订单支付未完成，请重试或联系客服
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cart"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition group"
            >
              返回购物车
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
              遇到问题？联系我们的客服团队：
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

