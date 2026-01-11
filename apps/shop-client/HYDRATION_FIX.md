# Hydration 错误修复说明

## 🐛 问题原因

Hydration 错误发生的原因是：
1. **服务端渲染(SSR)** 时没有 `localStorage`
2. **Zustand persist** 使用 localStorage 存储购物车数据
3. 服务端和客户端初始状态不一致导致渲染不匹配

## ✅ 修复方案

### 1. 更新 Zustand Store 配置

在 `src/store/cart.ts` 中：

```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCartStore = create<CartStore>()(
  persist(
    // ... state 定义
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // ✅ 关键：跳过自动 hydration
    }
  )
)
```

**关键点：** 
- 使用 `skipHydration: true` 避免自动 hydration
- 使用 `createJSONStorage(() => localStorage)` 显式指定存储

### 2. 创建 CartHydration 组件

创建 `src/components/CartHydration.tsx`：

```typescript
'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'

export default function CartHydration() {
  useEffect(() => {
    // 在客户端挂载后手动恢复 localStorage 数据
    useCartStore.persist.rehydrate()
  }, [])

  return null
}
```

**作用：**
- 仅在客户端执行
- 手动控制 hydration 时机
- 避免服务端渲染时访问 localStorage

### 3. 在 Layout 中添加 CartHydration

更新 `src/app/layout.tsx`：

```typescript
import CartHydration from '@/components/CartHydration'

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <CartHydration /> {/* ✅ 添加 hydration 组件 */}
        {children}
      </body>
    </html>
  )
}
```

### 4. 在 Header 中延迟显示购物车数量

更新 `src/components/Header.tsx`：

```typescript
export default function Header() {
  const [mounted, setMounted] = useState(false)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const totalItems = getTotalItems()

  useEffect(() => {
    setMounted(true) // ✅ 等待客户端挂载
  }, [])

  return (
    // ...
    {mounted && totalItems > 0 && ( // ✅ 只在客户端显示
      <span className="badge">{totalItems}</span>
    )}
  )
}
```

## 🔍 工作原理

### 渲染流程

```
1. 服务端渲染 (SSR)
   ↓
   - mounted = false
   - 购物车数量不显示
   - 避免访问 localStorage
   
2. 发送 HTML 到客户端
   ↓
   
3. 客户端 Hydration
   ↓
   - CartHydration 执行
   - 从 localStorage 恢复数据
   - mounted = true
   
4. 客户端重新渲染
   ↓
   - 显示购物车数量
   - 状态同步完成
```

## 📝 关键点总结

### ✅ DO（应该做的）

1. **使用 `skipHydration: true`**
   ```typescript
   persist(state, { skipHydration: true })
   ```

2. **手动控制 hydration**
   ```typescript
   useEffect(() => {
     store.persist.rehydrate()
   }, [])
   ```

3. **延迟显示依赖 localStorage 的内容**
   ```typescript
   const [mounted, setMounted] = useState(false)
   useEffect(() => setMounted(true), [])
   {mounted && <Component />}
   ```

4. **使用 'use client' 指令**
   ```typescript
   'use client' // 标记为客户端组件
   ```

### ❌ DON'T（不应该做的）

1. **不要在服务端组件中直接使用 localStorage**
   ```typescript
   // ❌ 错误
   const data = localStorage.getItem('key')
   ```

2. **不要在服务端渲染时访问 window/document**
   ```typescript
   // ❌ 错误
   if (window.innerWidth > 768) { ... }
   ```

3. **不要让服务端和客户端初始状态不同**
   ```typescript
   // ❌ 错误：服务端显示 0，客户端显示实际数量
   <span>{totalItems}</span>
   ```

## 🧪 测试验证

```bash
# 1. 清除浏览器缓存和 localStorage
localStorage.clear()

# 2. 重新加载页面
# 应该不会看到 hydration 错误

# 3. 添加商品到购物车
# 应该正常显示数量

# 4. 刷新页面
# 购物车数量应该保持
```

## 🔧 其他可能的 Hydration 问题

### 1. 日期/时间
```typescript
// ❌ 错误：服务端和客户端时间可能不同
<span>{new Date().toLocaleString()}</span>

// ✅ 正确
const [time, setTime] = useState('')
useEffect(() => {
  setTime(new Date().toLocaleString())
}, [])
```

### 2. 随机数
```typescript
// ❌ 错误：每次渲染结果不同
<span>{Math.random()}</span>

// ✅ 正确
const [id] = useState(() => Math.random())
```

### 3. 浏览器 API
```typescript
// ❌ 错误：服务端没有 navigator
const isMobile = /Mobile/.test(navigator.userAgent)

// ✅ 正确
const [isMobile, setIsMobile] = useState(false)
useEffect(() => {
  setIsMobile(/Mobile/.test(navigator.userAgent))
}, [])
```

## 📚 参考资料

- [Next.js Hydration 文档](https://nextjs.org/docs/messages/react-hydration-error)
- [Zustand Persist 文档](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
- [React Hydration 指南](https://react.dev/reference/react-dom/client/hydrateRoot)

## 💡 最佳实践

1. **分离客户端和服务端逻辑**
   - 使用 'use client' 标记客户端组件
   - 使用 useEffect 处理客户端特有逻辑

2. **延迟加载依赖 localStorage 的内容**
   - 使用 mounted 状态控制渲染
   - 避免闪烁，可以使用骨架屏

3. **正确配置 Zustand persist**
   - 使用 skipHydration
   - 手动控制 rehydrate 时机

4. **测试 SSR 渲染**
   - 禁用 JavaScript 测试
   - 检查初始 HTML 内容

---

✅ Hydration 错误已修复！页面现在可以正常渲染了。

