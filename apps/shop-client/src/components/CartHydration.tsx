'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'

/**
 * 购物车 Hydration 组件
 * 用于在客户端挂载后恢复 localStorage 中的购物车数据
 */
export default function CartHydration() {
  useEffect(() => {
    // 在客户端挂载后立即从 localStorage 恢复状态
    useCartStore.persist.rehydrate()
  }, [])

  return null
}

