# 🚀 快速启动指南

欢迎使用电商平台！按照以下步骤快速启动项目。

## 📋 前置要求

确保您的系统已安装：

- **Node.js** >= 20.11.0 ([下载地址](https://nodejs.org/))
- **pnpm** >= 8.0.0

### 安装 pnpm

如果您还没有安装 pnpm，请运行：

```bash
npm install -g pnpm
```

## 🎯 快速开始（5分钟）

### 1️⃣ 安装依赖

在项目根目录运行：

```bash
pnpm install
```

这将自动安装所有子项目的依赖。

### 2️⃣ 配置环境变量

#### 后端服务配置

```bash
cd apps/shop-server
cp .env.example .env
```

编辑 `.env` 文件（可使用默认配置）：
```env
PORT=4000
NODE_ENV=development
JWT_SECRET=your-jwt-secret-key-change-in-production
MONGODB_URI=mongodb://localhost:27017/shop-app
```

> 注意：开发环境下可以暂时不配置 MongoDB，API 使用模拟数据。

### 3️⃣ 启动服务

#### 方式一：同时启动所有服务（推荐）

在项目根目录运行：

```bash
pnpm dev:all
```

这将同时启动：
- 🌐 前台用户端: http://localhost:3000
- 🔧 后台管理系统: http://localhost:3001  
- 🖥️ 后端服务: http://localhost:4000

#### 方式二：单独启动服务

```bash
# 启动前台用户端
pnpm dev:client

# 启动后台管理系统
pnpm dev:admin

# 启动后端服务
pnpm dev:server
```

## 🎮 开始使用

### 前台用户端

访问 http://localhost:3000

- 浏览商品
- 加入购物车
- 模拟下单

### 后台管理系统

访问 http://localhost:3001

**默认登录（开发环境）**：
- 用户名: 任意
- 密码: 任意

登录后可以：
- 📊 查看数据统计
- 📦 管理商品
- 📋 处理订单
- 👥 管理用户

### API 服务

访问 http://localhost:4000

查看 API 响应：
```bash
curl http://localhost:4000
```

## 🛠️ 常用命令

```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm dev:client    # 前台
pnpm dev:admin     # 后台
pnpm dev:server    # 后端
pnpm dev:all       # 全部

# 构建生产版本
pnpm build:client
pnpm build:admin
pnpm build:server
pnpm build:all

# 代码检查
pnpm --filter shop-client lint
pnpm --filter shop-admin lint
pnpm --filter shop-server lint
```

## ⚠️ 常见问题

### 端口被占用

如果端口被占用，可以修改：

- 前台：修改 `apps/shop-client/package.json` 中的端口
- 后台：修改 `apps/shop-admin/vite.config.ts` 中的端口
- 后端：修改 `apps/shop-server/.env` 中的 `PORT`

### pnpm 命令不存在

```bash
npm install -g pnpm
```

### 依赖安装失败

```bash
# 清理并重新安装
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

## 📚 下一步

- 阅读 [完整文档](README.md)
- 查看 [API 文档](README.md#-应用说明)
- 了解 [项目结构](README.md#-项目结构)
- 参与 [贡献](CONTRIBUTING.md)

## 💬 获取帮助

如遇到问题，请：

1. 查看 [常见问题](#-常见问题)
2. 查阅项目文档
3. 提交 Issue

---

祝您使用愉快！🎉


