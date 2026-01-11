# 图片加载问题修复文档

## 问题描述
用户报告相机商品图片无法加载。

## 问题分析

### 1. Next.js 配置问题
- **原因**：使用了已弃用的 `domains` 配置
- **影响**：Next.js 14 不再支持 `images.domains`，需要使用 `remotePatterns`

### 2. 图片 URL 问题
- **原因**：部分 Unsplash 图片 ID 可能无效或被删除
- **影响**：导致图片无法正常显示

## 解决方案

### 1. 更新 Next.js 图片配置

**文件**: `/apps/shop-client/next.config.js`

**修改前**:
```javascript
images: {
  domains: ['localhost', 'images.unsplash.com'],
}
```

**修改后**:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '',
      pathname: '/**',
    },
  ],
}
```

### 2. 优化图片 URL

**更新内容**:
- 替换所有无效的 Unsplash 图片 ID
- 添加图片质量参数 `q=80` 以优化加载速度
- 统一使用稳定可靠的图片资源

**更新的图片 ID 映射**:
| 旧图片 ID | 新图片 ID | 说明 |
|----------|----------|------|
| photo-1606933248010-ef7d959143b9 | photo-1502920917128-1aa500764cbd | 徕卡相机 |
| photo-1495121553079-4c61bcce1894 | photo-1606859511950-1076ccc67621 | 相机特写 |
| photo-1558618666-fcd25c85cd64 | photo-1590736969955-71cc94901144 | 皮革材质 |
| photo-1606933566189-68c5b61b5684 | photo-1606400082777-ef05f3c5cde2 | 哈苏相机 |

**URL 格式**:
```
旧格式: https://images.unsplash.com/photo-xxxxx?w=800
新格式: https://images.unsplash.com/photo-xxxxx?q=80&w=800
```

添加 `q=80` 参数可以:
- 优化图片质量
- 减少加载时间
- 提升用户体验

### 3. 更新的文件列表

1. **next.config.js** - 图片域名配置
2. **src/data/products.ts** - 商品数据中的所有图片 URL
3. **src/app/page.tsx** - 首页中的图片 URL
   - Hero 区域主图
   - 品牌分类卡片图片（徕卡、哈苏、配件）
   - 定制服务区域图片

## 验证步骤

1. ✅ 重启开发服务器
2. ✅ 访问 http://localhost:3000 查看首页
3. ✅ 检查商品列表页图片加载
4. ✅ 检查商品详情页图片显示

## 当前使用的图片资源

### 主要商品图片
- **徕卡相机**: photo-1502920917128-1aa500764cbd
- **相机特写**: photo-1606859511950-1076ccc67621  
- **哈苏相机**: photo-1606400082777-ef05f3c5cde2
- **皮革材质**: photo-1590736969955-71cc94901144
- **相机配件**: photo-1526170375885-4d8ecf77b99f
- **复古相机**: photo-1516035069371-29a1b244cc32

### 图片尺寸规范
- **商品主图**: 800x1000 (aspect-ratio 4:5)
- **商品缩略图**: 600x600 (正方形)
- **分类卡片**: 600x800 (aspect-ratio 3:4)
- **特性展示**: 600x600 (正方形)

## Next.js Image 组件最佳实践

### 1. 使用 remotePatterns
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      pathname: '/**',
    }
  ]
}
```

### 2. 图片优化参数
- `q`: 质量 (0-100)，建议 75-85
- `w`: 宽度，根据需要设置
- `h`: 高度（可选）
- `fit`: 适配模式 (crop, fill, etc.)

### 3. 优先加载
```jsx
<Image
  src="..."
  alt="..."
  priority // 关键图片使用 priority
  fill
  className="object-cover"
/>
```

## 性能优化建议

### 1. 图片懒加载
- 默认启用懒加载
- 首屏关键图片使用 `priority` 属性

### 2. 图片格式
- Next.js 自动转换为 WebP 格式
- 支持 AVIF 格式（更小体积）

### 3. 缓存策略
- 使用 CDN 缓存
- 设置合理的缓存时间

### 4. 响应式图片
```jsx
<Image
  src="..."
  alt="..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  fill
/>
```

## 常见问题

### Q1: 图片仍然加载失败？
**解决方法**:
1. 检查网络连接
2. 清除浏览器缓存
3. 确认 Unsplash 图片 ID 有效
4. 检查 Next.js 配置是否正确

### Q2: 图片加载很慢？
**解决方法**:
1. 添加质量参数降低图片大小
2. 使用合适的图片尺寸
3. 启用 CDN 加速
4. 使用 WebP 格式

### Q3: 开发环境图片正常，生产环境失败？
**解决方法**:
1. 检查 `next.config.js` 是否正确部署
2. 确认环境变量配置
3. 检查域名白名单
4. 验证 CDN 配置

## 后续优化建议

### 1. 使用自有图片服务器
- 避免依赖第三方图片服务
- 更好的控制和稳定性
- 可以使用 CDN 加速

### 2. 图片压缩
- 使用 TinyPNG 等工具压缩
- 保持质量的同时减小体积
- 批量处理图片资源

### 3. 真实产品图片
- 拍摄真实的相机皮套产品图
- 展示多个角度和细节
- 提供高质量的产品展示

### 4. 图片占位符
```jsx
<Image
  src="..."
  alt="..."
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  fill
/>
```

## 总结

通过以下修复，图片加载问题已完全解决：

1. ✅ 更新 Next.js 图片配置为 `remotePatterns`
2. ✅ 替换所有无效的图片 URL
3. ✅ 添加图片质量优化参数
4. ✅ 重启开发服务器使配置生效

现在所有商品图片应该可以正常加载显示。如果遇到个别图片仍然加载失败，可能是 Unsplash 的临时问题，建议后续使用自有图片服务器来确保稳定性。

