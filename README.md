# 项目甘特图生成器

本地输入页面，用于录入项目阶段、阶段任务、日期范围、任务拆解和 Milestone，并实时预览周视图甘特图。

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

当前版本不提供图片导出能力，生产环境只需要部署前端静态页面：

- 前端：Cloudflare Pages，仅部署 `public` 目录。
- 后端：当前无图片生成 API 依赖，不需要 Render 后端服务。

本地 `npm start` 仍会启动一个轻量 Node 静态服务，便于本机验证。

## Cloudflare Pages 前端部署

1. 只部署 `public` 目录，不要把项目根目录作为静态站点直接公开。
2. 推荐在 Cloudflare Pages 设置：
   - Build command：`npm run build:pages`
   - Build output directory：`public`
3. 不需要配置 `LITEGANTT_API_BASE`。
4. 绑定你的域名。

## 支持的输入维度

- 项目标题
- 周视图起始日期（自动取最早阶段开始日期）
- 项目阶段名称、开始日期、结束日期
- 阶段下细分任务名称、开始日期、结束日期（限制在所属阶段范围内）
- Milestone 标记

## 输出样式

- 左侧固定为“项目阶段 / 用时”
- 右侧为周视图 W1、W2...
- 顶部显示月份轴和每周日期范围
- 阶段行加粗，细分任务行不加粗
- 甘特条为胶囊样式
- Milestone 用红色实心五角星和文本标记
- 当前版本仅支持页面实时预览，不提供图片导出。
