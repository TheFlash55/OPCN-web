# OPCN Web

OPCN Web 是一个基于 Next.js 的 One Person Company（OPC）Agent 网络演示项目，目标是把「个人服务供给」和「需求撮合」串成一个可运行闭环：创建 Agent、发布服务页、获取线索、并通过链上身份/证明增强信任。

## 项目概述

- 面向供给侧（服务提供者）：快速创建并发布 Agent 服务页（定位、报价、交付说明）。
- 面向需求侧（客户）：可在 Ask/Market 发现 Agent 并提交需求线索。
- 面向增长与信任：支持分享文案生成、线索回收、链上绑定、Credential 与 Proof Capsule 验证。

## 主要功能

- Agent Onboarding：四步创建服务（定位、Offer、交付、发布）。
- Market：Agent 列表浏览、搜索、标签过滤、排序。
- Ask：提交需求后自动推荐匹配 Agent。
- Leads：服务提供者查看自己收到的线索。
- Bounties：悬赏任务浏览与认领（演示流程）。
- Onchain Identity（Mock）：钱包连接、签名绑定 DID、Mint Credential、发布/验证 Capsule。

## 技术栈

- 前端框架：Next.js 15（App Router）、React 18、TypeScript
- UI：Tailwind CSS、Radix UI、Lucide Icons
- 状态管理：Zustand（含 localStorage 持久化）
- Web3：wagmi、viem、WalletConnect
- 数据层：Upstash Redis（未配置时自动回退到内存存储，便于本地演示）

## 安装与运行

### 1) 环境要求

- Node.js >= 18
- npm >= 9

### 2) 安装依赖

```bash
npm install
```

### 3) 配置环境变量（可选但推荐）

在项目根目录创建 `.env.local`：

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_CHAIN=sepolia

# 可选：配置后使用 Upstash Redis；不配则自动使用内存存储
# UPSTASH_REDIS_REST_URL=...
# UPSTASH_REDIS_REST_TOKEN=...
```

说明：
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`：WalletConnect 项目 ID（建议配置，避免默认 demo id 带来的连接不稳定）。
- `NEXT_PUBLIC_CHAIN`：可选，默认 `sepolia`，可设为 `amoy`。

### 4) 启动开发环境

```bash
npm run dev
```

默认访问：`http://localhost:3000`

### 5) 生产构建与启动

```bash
npm run build
npm run start
```

## 演示账号

项目内置演示用户（首次运行由 mock 数据自动初始化）：

- Email: `demo@opcn.ai`
- Password: `demo123`

开发环境可使用重置接口恢复初始数据：

- `GET /api/admin/reset`
- `POST /api/admin/reset`

注意：该接口仅在 `NODE_ENV=development` 下可用。

## 部署方式（Vercel）

推荐直接部署到 Vercel：

1. 导入 GitHub 仓库到 Vercel。
2. Framework 选择 Next.js（通常自动识别）。
3. 配置环境变量（至少建议配置 `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`）。
4. 点击 Deploy。

如需命令行部署：

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

## 许可信息

本项目采用 **MIT License** 开源发布，详细条款见根目录 [LICENSE](LICENSE)。
