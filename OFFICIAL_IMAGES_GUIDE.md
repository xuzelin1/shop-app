# 使用官方图片的说明

## 📸 图片 URL 配置指南

本文件包含了从徕卡和哈苏官方网站获取产品图片的 URL 配置说明。

## ⚠️ 重要提示

**使用官方品牌图片前，请确保已获得相应授权！**

## 🔗 官方图片 URL 格式

### 徕卡官方图片 URL 结构

```
https://leica-camera.com/sites/default/files/styles/product_detail_image/public/[年份-月份]/[产品型号]-[颜色]-[角度]-RGB.jpg
```

**示例**：
```
https://leica-camera.com/sites/default/files/styles/product_detail_image/public/2022-01/M11-black-chrome-front-RGB.jpg
```

### 哈苏官方图片 URL 结构

```
https://www.hasselblad.com/globalassets/products/[产品系列]/[产品型号]-[角度].jpg
```

**示例**：
```
https://www.hasselblad.com/globalassets/products/x2d/x2d-100c-front.jpg
```

## 🛠️ 如何获取真实的官方图片 URL

### 方法 1: 浏览器开发者工具

1. 访问官方产品页面（如：https://leica-camera.com/en-int/photography/cameras/m/m11-black）
2. 打开浏览器开发者工具（F12）
3. 切换到"Network"标签
4. 刷新页面
5. 筛选"Img"类型
6. 查找产品图片的完整 URL
7. 复制 URL 地址

### 方法 2: 右键查看图片

1. 在官网产品页面
2. 右键点击产品图片
3. 选择"在新标签页中打开图片"或"复制图片地址"
4. 获取完整的图片 URL

### 方法 3: 检查元素

1. 右键点击产品图片
2. 选择"检查"或"审查元素"
3. 查看 `<img>` 标签的 `src` 属性
4. 复制完整的 URL

## 📝 更新图片 URL 的步骤

### 1. 收集所有需要的产品图片 URL

为每个相机型号准备至少 3 张图片：
- 正面图
- 侧面图
- 细节图/背面图

### 2. 更新 `OFFICIAL_IMAGES` 对象

在 `src/data/products.ts` 文件中，找到 `OFFICIAL_IMAGES` 对象，替换示例 URL：

```typescript
const OFFICIAL_IMAGES = {
  leica: {
    m11: [
      '这里填入真实的 M11 正面图 URL',
      '这里填入真实的 M11 侧面图 URL',
      '这里填入真实的 M11 细节图 URL',
    ],
    // ... 其他型号
  },
  hasselblad: {
    x2d: [
      '这里填入真实的 X2D 正面图 URL',
      '这里填入真实的 X2D 侧面图 URL',
      '这里填入真实的 X2D 细节图 URL',
    ],
    // ... 其他型号
  },
}
```

### 3. 更新 Next.js 图片配置

确保 `next.config.js` 包含官方域名：

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'leica-camera.com',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'www.hasselblad.com',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      pathname: '/**',
    },
  ],
}
```

## 🎯 当前配置说明

代码中已包含：
1. **官方图片 URL 占位符** - 需要替换为真实 URL
2. **备用图片系统** - 如果官方图片不可用，自动使用 Unsplash 图片
3. **辅助函数** - `getImage()` 函数自动处理图片加载

## ⚡ 测试图片加载

更新 URL 后，执行以下步骤测试：

```bash
# 重启开发服务器
npm run dev

# 访问页面检查图片
http://localhost:3000
```

## 📋 产品型号清单

### 徕卡相机型号
- M11 (2022)
- M10-P (2018)
- Q3 (2023)
- Q2 / Q2 Monochrom (2019)
- SL3 (2023)
- SL2 / SL2-S (2019-2020)

### 哈苏相机型号
- X2D 100C (2022)
- X1D II 50C (2019)
- 907X CFV 100C (2021)

## 🔍 常见问题

### Q: 图片显示 403 错误？
**A**: 某些网站有防盗链保护。可能需要：
- 使用官方 CDN 的公开 URL
- 获得 API 访问权限
- 下载图片到本地服务器

### Q: 图片加载很慢？
**A**: 
- 确保使用了适当的图片尺寸
- 添加质量参数（如果支持）
- 考虑使用 CDN 加速

### Q: 图片 URL 会变化吗？
**A**: 
- 官方可能会更新 URL 结构
- 建议定期检查和更新
- 保留备用图片系统

## 📞 技术支持

如需获取官方图片使用授权，请联系：

**徕卡官方**:
- 网站: https://leica-camera.com/
- 邮箱: 查看官网联系方式

**哈苏官方**:
- 网站: https://www.hasselblad.com/
- 邮箱: 查看官网联系方式

## ✅ 完成清单

- [ ] 收集所有产品的官方图片 URL
- [ ] 更新 `OFFICIAL_IMAGES` 对象
- [ ] 更新 `next.config.js` 域名配置
- [ ] 测试所有图片加载正常
- [ ] 确认授权文件妥善保存
- [ ] 备份图片 URL 列表

## 💡 最佳实践

1. **保留备用方案** - 始终保持备用图片系统
2. **定期检查** - 每季度检查图片 URL 有效性
3. **文档化** - 记录每个图片的来源和授权信息
4. **本地备份** - 考虑将重要图片下载到本地
5. **性能优化** - 使用适当的图片尺寸和格式

---

更新日期: 2026-01-10

