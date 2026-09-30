# firstPage

基于 Vue 3、TypeScript、Vite 和 Element Plus 的前端，配套后端为
[filetd-idea](https://github.com/hh5631/filetd-idea)。

## 前端统一入口

firstPage 已覆盖旧 filetd-vue 的全部业务功能，开发时只需运行 firstPage
和 filetd-idea，不再需要安装或启动 filetd-vue。

| 功能 | firstPage 中的位置 |
| --- | --- |
| 用户注册、登录 | `src/App.vue` 顶部用户按钮打开的弹窗 |
| 文件上传、列表、下载、删除 | `src/views/FileTD.vue`，路由 `/filetd` |
| 聊天消息收发、聊天记录 | `src/views/ChatRoom.vue`，路由 `/chat` |
| 在线用户显示 | `src/views/ChatRoom.vue` |
| 首页搜索、图片轮播、深浅色切换 | `src/views/Home.vue` 和 `src/App.vue` |

旧前端的 `/login` 和 `/register` 独立页面在这里改为弹窗；文件管理和聊天
分别使用 `/filetd` 和 `/chat` 页面。

## 安装和启动

在本仓库目录执行：

```sh
npm ci
npm run dev
```

Vite 默认端口为 `8097`，后端端口为 `8095`。API 地址定义在 `config.ts`；
上传地址和 WebSocket 地址也分别写在 `FileTD.vue` 和 `ChatRoom.vue` 中。
运行环境的地址调整需要覆盖这三处。

## 本地检查和构建

```sh
npm run type-check
npm run build-only
```

`build-only` 生成本地 `dist`。现有 `npm run build` 会在构建后通过 `scp`
部署到远程服务器，日常开发和本地验证请使用上述两个独立命令。

## Codex 云环境

云环境已准备仓库外的本地开发配置，保存在 `/workspace/.cloud-setup`，
用于本地数据库、Linux 文件保存路径和 Vite HTTP/WebSocket 代理。
这些辅助文件由环境配置安装脚本重建，不属于本仓库。

```sh
bash /workspace/.cloud-setup/start-db.sh
bash /workspace/.cloud-setup/start-frontends.sh
```

云环境中的 firstPage 使用端口 `8098`，将 `/api` 和 `/websocket` 转发到
本地后端 `8095`。后端需要先成功构建并启动；具体命令和就绪检查见
环境配置中的启动说明。前端构建和类型检查不依赖后端在线。

功能覆盖检查已通过模拟 API 和 WebSocket 验证注册、登录、上传、文件列表、
下载内容、删除、聊天记录、在线用户和消息收发；模拟检查不代表真实后端联调通过。
