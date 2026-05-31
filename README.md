# 项目甘特图生成器

本地输入页面，用于录入项目阶段、阶段任务、日期范围和 Milestone，并生成周视图 Excel 或图片甘特图。

## 启动

``` bash
npm install
npm start
```

启动后访问：

```text
http://127.0.0.1:4173
```

## 部署架构

建议采用：

- 前端：Cloudflare Pages，仅部署 `public` 目录
- 后端 API：Render Docker Web Service，部署项目根目录

核心 Excel / 图片生成逻辑保留在后端，不放入 Cloudflare Pages 前端。

## Render 后端部署

1. 将本目录推送到一个私有 Git 仓库。
2. 在 Render 新建 Blueprint 或 Web Service，使用本目录的 `render.yaml` / `Dockerfile`。
3. 设置环境变量：
   - `ALLOWED_ORIGINS=https://你的前端域名`
   - `UPSTASH_REDIS_REST_URL=你的 Upstash REST URL`
   - `UPSTASH_REDIS_REST_TOKEN=你的 Upstash REST Token`
4. 部署完成后，记录 Render 服务地址，例如：
   - `https://litegantt-api.onrender.com`

后端接口：

- `POST /api/generate`：生成 Excel 或 PNG
- `POST /api/import`：导入本工具生成的 Excel

## Cloudflare Pages 前端部署

1. 只部署 `public` 目录，不要把项目根目录作为静态站点直接公开。
2. 推荐在 Cloudflare Pages 设置：
   - Build command：`npm run build:pages`
   - Build output directory：`public`
   - Environment variable：`LITEGANTT_API_BASE=https://你的-render-api地址`

构建时会自动写入 `public/config.js`：

``` js
window.LITEGANTT_API_BASE = 'https://你的-render-api地址';
```

3. 绑定你的域名。
4. 回到 Render，把 Cloudflare Pages 域名加入 `ALLOWED_ORIGINS`。

## 支持的输入维度

- 项目标题
- 周视图起始日期（自动取最早阶段开始日期）
- 项目阶段名称、开始日期、结束日期
- 阶段下细分任务名称、开始日期、结束日期（限制在所属阶段范围内）
- Milestone 标记

## 导出密钥

导出 Excel 或 PNG 时，前端会要求用户输入导出密钥。后端会到 Upstash Redis 校验密钥是否存在；密钥在有效期内可重复使用，到期后自动失效。

本地开发环境如果没有配置 Upstash，可以继续导出；Render 上 `NODE_ENV=production` 时会强制校验密钥。

生成密钥：

```bash
UPSTASH_REDIS_REST_URL="你的 Upstash REST URL" \
UPSTASH_REDIS_REST_TOKEN="你的 Upstash REST Token" \
npm run keys:create -- 20
```

上面的命令会生成 20 个导出密钥。密钥只会显示在命令输出里，请自行保存后发给需要导出的用户。

可选：如果希望密钥 30 天后自动过期，可以增加：

```bash
EXPORT_KEY_TTL_DAYS=30 npm run keys:create -- 20
```

## 输出样式

- 左侧固定为“项目阶段 / 用时”
- 右侧为周视图 W1、W2...
- 顶部显示月份轴和每周日期范围
- 阶段行加粗，细分任务行不加粗
- 甘特条为胶囊样式
- Milestone 用红色实心五角星和文本标记
- 支持导出 Excel `.xlsx` 和图片 `.png`
