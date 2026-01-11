import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CartHydration from '@/components/CartHydration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '电商平台 - 首页',
  description: '一个现代化的电商购物平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <CartHydration />
        {children}
      </body>
    </html>
  )
}


