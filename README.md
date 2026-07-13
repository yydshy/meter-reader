# ⚡ 抄表助手

> 智能抄表管理工具 · 支持 GitHub Gist 跨设备云同步

[![Deploy to GitHub Pages](https://github.com/yydshy/meter-reader/actions/workflows/deploy.yml/badge.svg)](https://github.com/yydshy/meter-reader/actions)
[![PWA](https://img.shields.io/badge/PWA-Installable-9b59b6)](https://web.dev/learn/pwa)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red.svg)]()

单文件、零依赖的抄表助手。支持 28 户预配置、楼层分组、用电量自动计算、历史记录、数据导出及 GitHub Gist 云同步。**已升级为可安装的 PWA——添加到主屏幕，像原生 App 一样全屏离线使用。**

🌐 线上地址：**https://yydshy.github.io/meter-reader/**

---

## ✨ 核心特性

### 📊 抄表录入
- **楼层分组** — 1~6 楼可视化分组，支持折叠展开
- **用电量自动计算** — 输入读数自动计算当月用电，支持电表翻表（9999→0）
- **首次抄表标记** — 无历史数据时自动提示
- **高用电量预警** — 超过阈值标黄提醒

### 🕘 历史记录
- **月度汇总** — 按月份查看所有住户读数与用电量
- **合计统计** — 每月总用电量自动汇总
- **数据持久化** — 基于 localStorage，刷新不丢失

### ☁️ GitHub Gist 云同步
- **跨设备同步** — 手机、平板、电脑数据实时同步
- **私密存储** — 数据存储在私人 Gist 中，安全可控
- **一键上传/下载** — 手动控制同步时机

### 🔧 数据管理
- **分享链接** — 生成只读分享链接，老人点开即看
- **导出 CSV** — Excel 可直接打开
- **导出 JSON** — 完整数据备份
- **导入恢复** — 从 JSON 备份恢复数据

---

## 🚀 快速开始

### 方式一：直接打开

1. 下载 `index.html`
2. 用浏览器打开即可使用

### 方式二：GitHub Pages 在线体验

1. Fork 本仓库
2. 进入仓库 **Settings → Pages**
3. Source 选择 **GitHub Actions**
4. 访问 `https://your-username.github.io/meter-reader/`

---

## 📱 添加到主屏幕（PWA · 像 App 一样用）

| 平台 | 操作 |
| --- | --- |
| Android · Chrome | 打开网页 → 点顶部「添加到主屏幕」引导条 → 添加 |
| iPhone · Safari | 打开网页 → 底部「分享」→「添加到主屏幕」 |

添加后即为全屏独立应用：无地址栏、断网可开、桌面有图标。

> ⚠️ Service Worker 仅在 `https` 或 `localhost` 下生效；直接双击 `file://` 打开功能正常，但不会注册离线缓存。若曾安装旧版图标，请先删掉主屏图标再重新添加以加载新图标。

---

## 🔄 GitHub Gist 同步配置

### 1. 创建 GitHub Token

1. 前往 [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. 点击 **Generate new token (classic)**
3. 勾选 **`gist`** 权限
4. 生成并复制 Token

### 2. 连接抄表助手

1. 打开抄表助手，进入 **设置** 标签
2. 在 **GitHub 云同步** 区域粘贴 Token（只需勾 **gist** 权限，不要勾 repo；Token 仅保存在本机浏览器，不会上传到任何服务器）
3. 点击 **连接** 验证——**系统会自动找到云端备份并将数据合并到本地**（无需再手动点下载）
4. **启动自动同步**：只要已保存过 Token，之后每次打开/刷新页面都会**静默**连接云端并合并数据，有新数据时才轻提示；无需任何手动操作（带 20 秒节流，避免频繁刷新狂打 API）
5. **本地改动自动回传**：在任意设备抄表/改数后，约 3 秒会自动合并上传到云端，**多设备之间几乎零手动同步**

### 3. 跨设备同步

- **连接即同步**：在任意设备粘贴同一个 Token 并点击 **连接**，系统会自动定位云端备份 Gist 并**立即合并拉取**数据，本地已抄但云端没有的月份不会被抹掉
- **自动回传**：本地任何改动都会防抖自动合并上传，不会覆盖其它设备已上传的记录（即便两台设备各抄了不同月份，后上传的一方会先拉再写，双方数据都保留）
- **下载（备用）**：若自动同步失败，仍可手动点击 **📥 下载** 执行合并
- **冲突提示**：手动下载合并时，若同一户同一月份本地与云端数值不同，会弹出冲突清单让你「全部用本地 / 全部用云端」二选一；静默同步默认采用云端值并在状态里提示冲突数
- **状态常驻**：顶栏右侧云图标实时反映同步状态（绿=已同步 / 转圈=同步中 / 红=失败），点击可看上次同步时间、本地/云端条数与冲突数

### 4. 数据安全兜底

- **本地备份**：设置页「备份全部数据（JSON）」可导出文件，「从备份恢复」可导入——这是 Gist 之外的最后一道保险，建议定期导出一份
- **最小权限**：GitHub Token 只需 `gist` scope，切勿授予 `repo` 等更高权限

> 首次上传会自动创建一个 **私密 Gist**，后续上传会更新同一个 Gist。换设备/清缓存后，只要 Token 相同就能自动定位同一份备份。

---

## 🎨 设计亮点

| 特性 | 说明 |
|------|------|
| **暗色主题** | 深碳灰底色 + 暖橙强调色，夜间使用不刺眼 |
| **卡片式布局** | 圆角 + 微阴影 + 悬浮动效，层次清晰 |
| **微交互** | 输入聚焦高亮、按钮悬浮、楼层折叠动画 |
| **响应式** | 针对手机优化，底部 Tab 导航 |
| **老年模式** | 一键放大字体，方便长辈使用 |

---

## 🏗️ 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 / CSS3 / Vanilla JS | 单文件应用，零构建 |
| GitHub Gist API | 跨设备数据同步 |
| localStorage | 本地数据持久化 |
| Service Worker + Manifest | PWA 离线缓存与可安装 |
| GitHub Actions | 自动部署到 Pages |

---

## 📁 项目结构

```
meter-reader/
├── index.html              # 主应用（单文件）
├── manifest.webmanifest    # PWA 安装清单
├── sw.js                   # Service Worker（离线缓存）
├── icons/                  # 192 / 512 / Apple Touch 图标
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
├── README.md               # 项目说明
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages 自动部署
```

---

## 🐛 常见问题

### Q: 选择月份后分享数据为空？

**原因**：页面默认选中的可能是当前月份（如 2026-06），而初始数据只有 2026-03，当前月份没有抄表数据。

**解决**：在顶部下拉框中手动选择有数据的月份（如 2026年3月），再点击分享。

### Q: 如何清空某个月的数据？

进入 **设置 → 清空当月数据**，确认后即可清空当前选中月份的所有读数。

### Q: 数据会丢失吗？

数据默认保存在浏览器 localStorage 中，清除浏览器数据会丢失。建议：
1. 定期导出 JSON 备份
2. 配置 GitHub Gist 同步

---

## 📄 许可证

MIT License

---

Made with ❤️
