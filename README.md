# OPCN Web

OPCN Web 是一个基于 Next.js 的 One Person Company（OPC）Agent 网络演示项目，目标是把「个人服务供给」和「需求撮合」串成一个可运行闭环：创建 Agent、发布服务页、获取线索、并通过链上身份/证明增强信任。

## 项目概述

- **面向供给侧（服务提供者）**：快速创建并发布 Agent 服务页（定位、报价、交付说明）。
- **面向需求侧（客户）**：可在 Ask/Market 发现 Agent 并提交需求线索。
- **面向增长与信任**：支持分享文案生成、线索回收、链上绑定、Credential 与 Proof Capsule 验证。

## 技术栈

- **前端框架**：Next.js 15（App Router）、React 18、TypeScript
- **UI**：Tailwind CSS、Radix UI、Lucide Icons
- **状态管理**：Zustand（含 localStorage 持久化）
- **Web3**：wagmi、viem、WalletConnect
- **数据层**：Upstash Redis（未配置时自动回退到内存存储，便于本地演示）

---

## 功能模块详解

### 1. 首页模块 (`app/page.tsx` + `components/home/`)

首页是项目的入口，展示平台价值主张和主要功能。

**包含组件：**

- **Hero** (`components/home/Hero.tsx`): 首屏展示区域，包含：
  - 渐变背景动画效果
  - 中英文双语标题与副标题
  - 邮箱订阅入口
  - 主CTA按钮（免费开始 / 查看案例）
  - 信任背书（"已服务 50+ OPC"）

- **TrustLogos** (`components/home/TrustLogos.tsx`): 展示合作品牌/客户Logo

- **Stats** (`components/home/Stats.tsx`): 关键数据展示（Agent数量、线索数、服务评分等）

- **Features** (`components/home/Features.tsx`): 六大核心能力展示：
  - 智能数据采集（竞品监控、政策追踪、舆情分析）
  - 深度数据分析（清洗、结构化、标注）
  - 商业洞察报告（趋势分析、竞品对比）
  - 合规数据实践（遵循《数据安全法》）
  - 极速交付（3-5天上线）
  - 实时预警（5分钟响应市场变化）

- **Workflow** (`components/home/Workflow.tsx`): 服务流程可视化（需求沟通 → 方案定制 → 数据采集 → 分析报告 → 持续优化）

- **Testimonials** (`components/home/Testimonials.tsx`): 客户评价与成功案例展示

- **EmailCTA** (`components/EmailCTA.tsx`): 邮件订阅与行动号召组件

---

### 2. Agent 创建与发布模块 (`app/onboarding/` + `store/onboarding.ts`)

四步向导式流程，帮助服务提供者创建和发布 Agent。

**核心流程：**

1. **定位 (Position)**: 设置 Agent 显示名称、副标题、服务标签
2. **报价 (Offer)**: 配置三档服务套餐（Starter/Pro/Premium）：
   - 价格设置（默认 ¥199 / ¥599 / ¥1299）
   - 交付物清单
   - 交付周期
3. **交付 (Delivery)**: 编写交付说明和服务承诺
4. **发布 (Publish)**: 生成唯一 slug，发布到 Agent 广场

**状态管理：**

- 使用 Zustand + persist 中间件，数据持久化到 localStorage
- 支持草稿自动保存，防止数据丢失
- 默认套餐配置可自定义修改

---

### 3. Agent 广场模块 (`app/market/` + `app/agent/[slug]/`)

Agent 展示与发现中心。

**Market 页面功能：**

- Agent 列表展示（卡片式布局）
- 搜索功能（按名称/副标题/tag 搜索）
- 标签过滤（动态提取所有 Agent 的标签）
- 排序选项：推荐、最新、评分、热度
- 价格区间显示（显示最低套餐价格）
- 评分与通话次数展示

**Agent 详情页功能** (`app/agent/[slug]/page.tsx`)：

- Agent 完整信息展示（名称、副标题、标签、评分）
- 三档服务套餐对比展示
- **线索提交表单**：客户可填写需求信息
  - 姓名、联系方式（必填）
  - 预算范围、紧急程度
  - 需求描述
- **链上身份展示**：显示绑定的 DID 和 Credential
- **Capsule 验证**：展示可验证的交付证明
- **所有者操作**：Agent 所有者可以发布新的 Proof Capsule

---

### 4. 需求提交模块 (`app/ask/`)

面向需求侧，让客户发布需求并获得 Agent 推荐。

**功能特性：**

- 需求表单：标题、描述、预算、期望交付物、标签、联系方式
- **智能推荐**：提交后根据标签匹配推荐相关 Agent
- 匹配算法：基于标签重合度评分 + 综合评分排序
- 推荐结果展示：Top 3 匹配的 Agent
- 快捷跳转：一键前往 Agent 广场查看更多选择

---

### 5. 线索管理模块 (`app/leads/` + `app/api/leads/`)

服务提供者查看和管理收到的客户需求线索。

**功能特性：**

- 线索列表展示（按时间倒序）
- 状态过滤：全部 / 新线索 / 处理中 / 已关闭
- 线索详情：客户姓名、联系方式、预算、紧急程度、需求描述
- **关联 Agent**：显示该线索来自哪个 Agent 页面
- 登录态校验：需登录后才能查看
- 实时统计：线索数量统计接口 `/api/leads/count`

**线索状态流转：**

- `new` → `processing` → `closed`

---

### 6. 悬赏任务模块 (`app/bounties/`)

任务发布与认领平台。

**功能特性：**

- 悬赏列表展示（标题、奖励金额、标签、状态）
- 任务详情弹窗：完整描述、奖励、认领状态
- **任务认领**：登录用户可认领开放状态的任务
- 状态管理：开放(open) / 已认领(claimed) / 已关闭(closed)
- 内置示例任务：
  - 搭建 AI 咨询服务落地页（¥1200）
  - 制作三套投放文案（¥600）
  - 线索表单与通知流程优化（¥900）

---

### 7. 链上身份模块 (`app/onchain/` + `components/OnchainIdentityPanel.tsx`)

Web3 身份绑定与验证系统，增强平台信任度。

**核心功能：**

#### 7.1 钱包连接

- 支持 Injected Wallet（MetaMask 等）
- 支持 WalletConnect（手机钱包扫码）
- 基于 wagmi 实现，支持多链切换

#### 7.2 Agent 身份绑定

- 生成 Claim JSON（包含 Agent 完整信息快照）
- SHA256 哈希生成
- 钱包签名绑定（生成 proof）
- 绑定状态：bound / verified
- DID 格式：`did:opcn:eip155:{chainId}:{address}#{agentSlug}`

#### 7.3 OPC Credential Mint

- 绑定后可铸造 OPC 身份凭证（SBT 形式）
- 凭证包含：tokenId、铸造时间、状态
- 一个地址只能拥有一个 Credential

#### 7.4 Proof Capsule 系统

支持三种类型的可验证证明：

- **OfferProof**: 服务承诺证明
- **DeliveryProof**: 交付完成证明
- **IdentityProof**: 身份认证证明

每个 Capsule 包含：

- result（证明内容）
- proofHash（内容哈希）
- 创建时间戳
- 验证状态：unverified / ok / failed

#### 7.5 验证分享

- 链上验证通过的 Agent 可获得 `verified=1` 标记
- 分享链接带验证标记，增强可信度

---

### 8. 数据服务展示模块 (`app/services/`)

详细介绍平台提供的数据服务能力。

**内容结构：**

- **数据采集服务**：
  - 竞品监控（价格、促销、上新）
  - 政策追踪（政府公告、行业政策）
  - 舆情分析（社交媒体、新闻评论）
  - 技术方案说明（合规爬虫、API集成、反爬应对）

- **数据处理服务**：
  - 数据清洗（去噪、去重、标准化）
  - 结构化处理（格式转换、数据库建模）
  - 数据标注（分类、实体识别、情感分析）

- **数据洞察服务**：
  - 报告生成（周报/月报、趋势分析）
  - 趋势分析（时间序列、预测模型）
  - 决策建议（定价、投放策略）

- **合规与安全**：
  - 数据来源合规说明
  - 匿名化处理
  - 法律法规遵循
  - 安全存储措施

---

### 9. 关于我们模块 (`app/about/`)

团队与技术实力展示。

**内容结构：**

- 专业背景（8年+ 数据工程经验）
- 技术栈展示：
  - 数据采集：Scrapy、Playwright、Selenium
  - 数据处理：Pandas、NumPy、Spark
  - 数据存储：PostgreSQL、ClickHouse、MongoDB
  - 可视化：Streamlit、Plotly、Superset
  - 云 & DevOps：AWS/GCP/阿里云、Docker、K8s
- 选择我们的理由：专注 OPC、端到端服务、灵活交付、技术赋能

---

### 10. 案例展示模块 (`app/cases/`)

成功客户案例展示。

**功能：**

- 案例卡片展示
- 行业分类浏览
- 效果数据展示（效率提升百分比等）
- 客户评价引用

---

### 11. 联系我们模块 (`app/contact/`)

联系方式与表单。

**功能：**

- 联系表单（姓名、邮箱、公司、需求描述）
- 多渠道联系方式展示
- 地图位置展示（如有）
- 常见问题 FAQ

---

### 12. 用户认证模块 (`app/signin/` + `app/signup/` + `app/api/auth/`)

完整的用户注册登录系统。

**功能特性：**

- 邮箱+密码注册
- JWT Token 身份认证
- 登录态持久化（localStorage）
- 受保护路由访问控制
- 演示账号：
  - Email: `demo@opcn.ai`
  - Password: `demo123`

**API 端点：**

- `POST /api/auth/signup` - 用户注册
- `POST /api/auth/signin` - 用户登录
- `GET /api/me` - 获取当前用户信息

---

### 13. 客源启动台模块 (`components/AcquisitionPanel.tsx`)

服务提供者的增长工具面板。

**功能特性：**

- **三步获客流程可视化**：
  1. 创建 Agent
  2. 发布获客页
  3. 一键投放

- **分享文案生成**：
  - 小红书文案
  - 朋友圈文案
  - 私聊直达话术

- **线索统计**：实时显示收到的线索数量
- **邀请码系统**：BETA-XXXX 格式邀请码
- **链上身份集成**：显示绑定状态和凭证信息
- **快捷操作**：
  - 查看线索
  - 去链上控制台
  - 复制分享链接

---

### 14. 国际化模块 (`lib/i18n.ts`)

中英双语支持。

**支持范围：**

- 导航菜单
- 页面标题
- 首页 Hero 区域
- Acquisition 面板
- 服务页面内容
- 关于页面内容

**切换方式：**

- 导航栏语言切换按钮
- 状态持久化到 localStorage
- 默认根据浏览器语言自动检测

---

### 15. 主题切换模块 (`components/theme-toggle.tsx`)

深色/浅色模式支持。

**实现方式：**

- next-themes 库
- 跟随系统偏好或手动切换
- 状态持久化
- 无闪烁切换（suppressHydrationWarning）

---

### 16. 数据层 (`lib/mock-db.ts` + `lib/redis.ts`)

统一的数据存储抽象层。

**特性：**

- **自动降级**：配置了 Upstash Redis 时使用 Redis，否则使用内存存储
- **数据模型**：
  - User（用户）
  - Agent（Agent 服务）
  - Lead（线索）
  - AskRequest（需求请求）
  - Bounty（悬赏任务）
  - Sessions（登录会话）

- **种子数据**：首次运行时自动初始化演示数据
- **API 封装**：
  - 用户认证相关（signup/signin/getUserByToken）
  - Agent CRUD（upsertAgent/listAgents/getAgent）
  - 线索管理（createLead/listLeadsByOwner）
  - 悬赏管理（listBounties/claimBounty）

---

### 17. 事件追踪模块 (`lib/track.ts`)

用户行为埋点统计。

**追踪事件：**

- `agent_view` - 查看 Agent 详情页
- `agent_published` - 发布 Agent
- `agent_draft_started` - 开始创建 Agent 草稿
- `ask_created` - 创建需求
- `bounty_viewed` - 查看悬赏详情
- `bounty_claimed` - 认领悬赏

**实现方式：**

- console.log 输出（演示环境）
- 可扩展为发送到分析平台（Google Analytics、Mixpanel 等）

---

### 18. UI 组件库 (`components/ui/`)

基于 Radix UI 的封装组件。

**包含组件：**

- Button - 按钮（多种变体：default/outline/ghost/link）
- Card - 卡片容器
- Input - 输入框
- Dialog - 对话框
- Tabs - 标签页
- DropdownMenu - 下拉菜单
- Badge - 徽章标签
- Toast - 消息提示

**设计系统：**

- 基于 Tailwind CSS
- 支持 CSS 变量主题定制
- 深色模式适配
- 响应式设计

---

## 目录结构

```
├── app/                          # Next.js App Router 页面
│   ├── page.tsx                  # 首页
│   ├── layout.tsx                # 根布局
│   ├── about/page.tsx            # 关于我们
│   ├── ask/page.tsx              # 需求提交
│   ├── agent/[slug]/page.tsx     # Agent 详情页
│   ├── bounties/page.tsx         # 悬赏任务
│   ├── cases/page.tsx            # 案例展示
│   ├── contact/page.tsx          # 联系我们
│   ├── leads/page.tsx            # 线索管理
│   ├── market/page.tsx           # Agent 广场
│   ├── onboarding/page.tsx       # Agent 创建向导
│   ├── onchain/page.tsx          # 链上身份控制台
│   ├── services/page.tsx         # 数据服务介绍
│   ├── signin/page.tsx           # 登录页
│   ├── signup/page.tsx           # 注册页
│   └── api/                      # API 路由
│       ├── agents/               # Agent CRUD
│       ├── ask/                  # 需求提交
│       ├── auth/                 # 认证相关
│       ├── bounties/             # 悬赏任务
│       ├── capsules/             # Proof Capsule
│       ├── leads/                # 线索管理
│       ├── onchain/              # 链上身份
│       └── ...
├── components/                   # React 组件
│   ├── home/                     # 首页区块组件
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Stats.tsx
│   │   ├── Workflow.tsx
│   │   ├── TrustLogos.tsx
│   │   └── Testimonials.tsx
│   ├── ui/                       # UI 基础组件
│   ├── AcquisitionPanel.tsx      # 客源启动台
│   ├── OnchainIdentityPanel.tsx  # 链上身份面板
│   ├── EmailCTA.tsx              # 邮件订阅
│   ├── navbar.tsx                # 导航栏
│   ├── wallet-menu.tsx           # 钱包菜单
│   ├── language-toggle.tsx       # 语言切换
│   ├── theme-toggle.tsx          # 主题切换
│   ├── dynamic-background.tsx    # 动态背景
│   └── providers.tsx             # 全局 Provider
├── lib/                          # 工具函数和配置
│   ├── i18n.ts                   # 国际化
│   ├── mock-db.ts                # 数据库封装
│   ├── redis.ts                  # Redis 客户端
│   ├── track.ts                  # 事件追踪
│   ├── hash.ts                   # 哈希工具
│   ├── utils.ts                  # 通用工具
│   ├── chain/config.ts           # 链配置
│   └── wallet/config.ts          # 钱包配置
├── store/                        # Zustand 状态管理
│   ├── onboarding.ts             # Agent 创建状态
│   ├── acquisition.ts            # 获客状态
│   ├── onchain.ts                # 链上状态
│   └── ui.ts                     # UI 状态
├── types/                        # TypeScript 类型定义
│   ├── index.ts                  # 核心类型
│   ├── onchain.ts                # 链上相关类型
│   └── capsule.ts                # Capsule 类型
└── styles/                       # 全局样式
    └── globals.css
```

---

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

---

## 演示账号

项目内置演示用户（首次运行由 mock 数据自动初始化）：

- Email: `demo@opcn.ai`
- Password: `demo123`

开发环境可使用重置接口恢复初始数据：

- `GET /api/admin/reset`
- `POST /api/admin/reset`

注意：该接口仅在 `NODE_ENV=development` 下可用。

---

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
```

---

## 核心工作流程

### 服务提供者流程

```
注册/登录 → 创建 Agent（4步向导）→ 发布服务页 → 分享推广 → 接收线索 → 链上绑定（可选）
```

### 需求方流程

```
浏览 Market / 提交 Ask 需求 → 查看推荐 Agent → 访问 Agent 详情页 → 提交线索表单 → 等待联系
```

### 链上验证流程

```
连接钱包 → 生成 Claim → 签名绑定 → Mint Credential → 发布 Proof Capsule → 获得验证标记
```

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！

### 代码规范

- 使用 TypeScript 严格模式
- 组件使用函数式编程 + Hooks
- API 路由统一返回 `{ data }` 或 `{ message, status }` 格式
- 状态管理优先使用 Zustand，避免 props drilling

### 提交规范

- `feat:` 新功能
- `fix:` 修复
- `docs:` 文档
- `style:` 代码格式
- `refactor:` 重构
- `test:` 测试

---

## License

MIT License
