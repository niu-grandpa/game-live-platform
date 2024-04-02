# 仿 Twitch 的全栈SSR项目: Next.js 14, Livestreaming, React, Prisma, Stripe, Tailwind, MySQL

该项目基于 Next.js, Livestreaming, React, Prisma, Stripe, Tailwind, MySQL

特性:
- 📡 使用RTMP/WHIP协议进行视频流传输
- 🌐 生成入口（ingress）
- 🔗 将Next.js应用程序连接到OBS或其他喜爱的流媒体软件
- 🔐 认证机制
- 📸 上传缩略图
- 👀 实时查看观众数量
- 🚦 显示直播状态 
- 💬 使用Sokect实现的实时聊天功能
- 🎨 聊天中为每个观众分配独特颜色 
- 👥 关注系统
- 🚫 屏蔽系统
- 👢 实时从直播中踢出参与者的功能
- 🎛️ 为流媒体主或创建者提供的仪表盘
- 🐢 慢聊天模式
- 🔒 仅限关注者的聊天模式
- 📴 启用/禁用聊天功能
- 🔽 可折叠布局（隐藏侧边栏、聊天等，剧场模式等）
- 📚 侧边栏关注和推荐标签页
- 🏠 首页推荐直播，按实时直播优先排序
- 🔍 具有不同布局的搜索结果页面
- 🔄 使用Webhooks同步用户信息到数据库
- 📡 使用Webhooks同步直播状态信息到数据库
- 🤝 社区标签页
- 🎨 美观的设计
- ⚡ 极速的应用性能
- 📄 服务器端渲染（SSR）
- 🗺️ 分组的路由和布局
- 🗃️ MySQL
- 🚀 部署

### 前置条件

**Node 版本 18.17 或更高**

### 克隆仓库

```shell
git clone https://github.com/AntonioErdeljac/next14-twitch-clone.git
```

### 安装

```shell
npm i
```

### .env 环境文件


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLERK_WEBHOOK_SECRET=

DATABASE_URL=

LIVEKIT_API_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_WS_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

### 安装 Prisma

添加 MySQL 数据库 (本人使用的是在线部署的 SQLPub)

```shell
npx prisma generate
npx prisma db push

```

### 运行项目

```shell
npm run dev
```
