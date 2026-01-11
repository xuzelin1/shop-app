'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, CreditCard, Smartphone, Wallet } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart, getTotalPrice, getTotalItems } = useCartStore()
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirm'>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Shipping Info
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    province: '',
    city: '',
    district: '',
    address: '',
    postalCode: '',
  })

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat' | 'card'>('alipay')

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  const shipping = totalPrice > 500 ? 0 : 50
  const finalTotal = totalPrice + shipping

  // 如果购物车为空，重定向
  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = () => {
    setStep('confirm')
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    
    // 模拟订单处理
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 生成订单号
    const orderNo = 'ORD' + Date.now()
    
    // 清空购物车
    clearCart()
    
    // 跳转到成功页面
    router.push(`/checkout/success?orderNo=${orderNo}&total=${finalTotal}`)
  }

  const paymentMethods = [
    { id: 'alipay', name: '支付宝', icon: <Wallet className="h-6 w-6" /> },
    { id: 'wechat', name: '微信支付', icon: <Smartphone className="h-6 w-6" /> },
    { id: 'card', name: '信用卡/借记卡', icon: <CreditCard className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/cart"
          className="inline-flex items-center text-sm font-semibold mb-8 hover:gap-2 transition-all"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                  step === 'shipping' ? 'bg-black text-white' : 'bg-green-500 text-white'
                }`}>
                  {step === 'shipping' ? '1' : <Check className="h-6 w-6" />}
                </div>
                <span className="text-sm mt-2 font-medium">收货信息</span>
              </div>

              <div className={`w-20 h-1 mx-2 ${step !== 'shipping' ? 'bg-green-500' : 'bg-gray-300'}`} />

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                  step === 'payment' ? 'bg-black text-white' : 
                  step === 'confirm' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step === 'confirm' ? <Check className="h-6 w-6" /> : '2'}
                </div>
                <span className="text-sm mt-2 font-medium">支付方式</span>
              </div>

              <div className={`w-20 h-1 mx-2 ${step === 'confirm' ? 'bg-green-500' : 'bg-gray-300'}`} />

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                  step === 'confirm' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  3
                </div>
                <span className="text-sm mt-2 font-medium">确认订单</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 'shipping' && (
              <div className="bg-white rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">收货信息</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">收货人姓名 *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black transition"
                        placeholder="请输入收货人姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">手机号码 *</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{11}"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black transition"
                        placeholder="请输入11位手机号"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">邮箱地址</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black transition"
                      placeholder="用于接收订单通知"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">省份 *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.province}
                        onChange={(e) => setShippingInfo({...shippingInfo, province: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black transition"
                        placeholder="如：广东省"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">城市 *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black transition"
                        placeholder="如：深圳市"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">区/县 *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.district}
                        onChange={(e) => setShippingInfo({...shippingInfo, district: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black transition"
                        placeholder="如：南山区"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">详细地址 *</label>
                    <textarea
                      required
                      rows={3}
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black transition resize-none"
                      placeholder="请输入详细地址，如街道、门牌号、小区、楼栋号等"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">邮政编码</label>
                    <input
                      type="text"
                      pattern="[0-9]{6}"
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black transition"
                      placeholder="6位邮政编码（可选）"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
                  >
                    下一步：选择支付方式
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 'payment' && (
              <div className="bg-white rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">支付方式</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition ${
                        paymentMethod === method.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="hidden"
                      />
                      <div className="flex items-center flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                          paymentMethod === method.id ? 'bg-black text-white' : 'bg-gray-100'
                        }`}>
                          {method.icon}
                        </div>
                        <span className="font-semibold text-lg">{method.name}</span>
                      </div>
                      {paymentMethod === method.id && (
                        <Check className="h-6 w-6 text-black" />
                      )}
                    </label>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep('shipping')}
                    className="flex-1 py-4 border-2 border-black rounded-full font-semibold hover:bg-gray-50 transition"
                  >
                    上一步
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    className="flex-1 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
                  >
                    下一步：确认订单
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Order Confirmation */}
            {step === 'confirm' && (
              <div className="space-y-6">
                {/* Shipping Info Review */}
                <div className="bg-white rounded-3xl p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">收货信息</h3>
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      修改
                    </button>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <p><span className="font-medium text-black">收货人：</span>{shippingInfo.fullName}</p>
                    <p><span className="font-medium text-black">电话：</span>{shippingInfo.phone}</p>
                    {shippingInfo.email && (
                      <p><span className="font-medium text-black">邮箱：</span>{shippingInfo.email}</p>
                    )}
                    <p>
                      <span className="font-medium text-black">地址：</span>
                      {shippingInfo.province} {shippingInfo.city} {shippingInfo.district} {shippingInfo.address}
                    </p>
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="bg-white rounded-3xl p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">支付方式</h3>
                    <button
                      onClick={() => setStep('payment')}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      修改
                    </button>
                  </div>
                  <p className="text-gray-600">
                    {paymentMethods.find(m => m.id === paymentMethod)?.name}
                  </p>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition disabled:bg-gray-400"
                >
                  {isProcessing ? '处理中...' : `提交订单 (¥${finalTotal.toLocaleString()})`}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold">订单摘要</h3>

              {/* Products */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={item.image || 'https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/9567/3/24326/89936/65379607Fef552ea8/0ccf4e4725b59d06.jpg.avif'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        ¥{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">商品小计</span>
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
              </div>

              <div className="flex justify-between items-center text-lg font-bold py-4 border-t border-gray-200">
                <span>订单总额</span>
                <span className="text-2xl text-red-600">¥{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

