'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: 调用实际的登录/注册 API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (isLogin) {
        // 登录成功
        console.log('登录:', formData.email)
        alert('登录成功！')
        router.push('/')
      } else {
        // 注册成功
        console.log('注册:', formData)
        alert('注册成功！')
        setIsLogin(true)
      }
    } catch (error) {
      alert('操作失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Image/Brand */}
            <div className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://img10.360buyimg.com/pcpubliccms/s1440x1440_jfs/t1/9567/3/24326/89936/65379607Fef552ea8/0ccf4e4725b59d06.jpg.avif"
                  alt="登录背景"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                  <h2 className="text-white text-4xl font-bold mb-4">
                    探索经典<br />匠心之作
                  </h2>
                  <p className="text-white/90 text-lg">
                    徕卡与哈苏相机皮套<br />手工定制，品质传承
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Login/Register Form */}
            <div className="w-full max-w-md mx-auto">
              <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">
                    {isLogin ? '欢迎回来' : '创建账户'}
                  </h1>
                  <p className="text-gray-600">
                    {isLogin ? '登录您的账户以继续' : '注册成为我们的会员'}
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-full">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2.5 rounded-full font-semibold transition-all ${
                      isLogin
                        ? 'bg-black text-white shadow-md'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    登录
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2.5 rounded-full font-semibold transition-all ${
                      !isLogin
                        ? 'bg-black text-white shadow-md'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    注册
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name (Register only) */}
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        姓名
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="请输入您的姓名"
                          required={!isLogin}
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Phone (Register only) */}
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        手机号
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="请输入手机号"
                          required={!isLogin}
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      邮箱
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="请输入您的邮箱"
                        required
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      密码
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="请输入密码"
                        required
                        className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password (Register only) */}
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        确认密码
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="请再次输入密码"
                          required={!isLogin}
                          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-0 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Forgot Password (Login only) */}
                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-sm text-gray-600">记住我</span>
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-sm font-semibold text-black hover:underline"
                      >
                        忘记密码？
                      </Link>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
                  >
                    {isLoading
                      ? '处理中...'
                      : isLogin
                      ? '登录'
                      : '注册'}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">或使用</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-medium">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl hover:border-black transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <span className="font-medium">GitHub</span>
                  </button>
                </div>

                {/* Footer Links */}
                <p className="mt-8 text-center text-sm text-gray-600">
                  {isLogin ? (
                    <>
                      还没有账户？
                      <button
                        onClick={() => setIsLogin(false)}
                        className="ml-1 font-semibold text-black hover:underline"
                      >
                        立即注册
                      </button>
                    </>
                  ) : (
                    <>
                      已有账户？
                      <button
                        onClick={() => setIsLogin(true)}
                        className="ml-1 font-semibold text-black hover:underline"
                      >
                        立即登录
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

