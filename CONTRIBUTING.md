# 贡献指南

感谢您考虑为电商平台项目做出贡献！

## 如何贡献

### 报告 Bug

如果您发现了 bug，请创建一个 Issue，并包含以下信息：

- Bug 的详细描述
- 复现步骤
- 预期行为
- 实际行为
- 截图（如果适用）
- 环境信息（操作系统、Node.js 版本等）

### 提交功能请求

如果您有新功能的想法，请创建一个 Issue，说明：

- 功能的详细描述
- 使用场景
- 可能的实现方案

### Pull Request 流程

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 代码规范

- 遵循项目的 ESLint 和 Prettier 配置
- 编写清晰的提交信息
- 为新功能添加相应的测试（如果适用）
- 更新相关文档

### 提交信息格式

使用清晰的提交信息：

```
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建或辅助工具的变动
```

## 开发环境设置

1. 安装 Node.js >= 20.11.0
2. 安装 pnpm: `npm install -g pnpm`
3. 克隆仓库
4. 运行 `pnpm install`
5. 复制 `.env.example` 为 `.env` 并配置
6. 运行 `pnpm dev:all` 启动所有服务

## 问题？

如有任何问题，请随时在 Issue 中提问。

谢谢！ ❤️


