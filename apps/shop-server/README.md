# 后端服务

电商平台的后端 API 服务，基于 Node.js + Express 开发。

## 功能特性

- 🔐 JWT 认证
- 📦 商品管理 API
- 📋 订单管理 API
- 👥 用户管理 API
- 🛡️ 权限中间件

## 开发指南

```bash
# 安装依赖
pnpm install

# 启动开发服务器（热重载）
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 环境变量

创建 `.env` 文件：

```
PORT=4000
NODE_ENV=development
JWT_SECRET=your-jwt-secret-key
MONGODB_URI=mongodb://localhost:27017/shop-app
```

## API 文档

详见主项目 README.md 中的 API 端点说明。

## 技术栈

- Node.js
- Express
- TypeScript
- JWT
- MongoDB + Mongoose
- bcryptjs


